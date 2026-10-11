import { supabase } from './supabase';

function normalizeText(value) {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return '';
}

function buildLocalFallbackReply(message, context = {}) {
  const lowerMessage = message.toLowerCase();
  const projectName = normalizeText(context.nombre) || 'your project';
  const amount = normalizeText(context.monto) || 'not specified';
  const gain = normalizeText(context.ganancia_esperada) || 'not specified';
  const returnMonths = normalizeText(context.retorno_meses) || 'not specified';

  if (lowerMessage.includes('description') || lowerMessage.includes('improve') || lowerMessage.includes('idea')) {
    return `Your idea has potential, but the description could be clearer and more compelling. Try to: 1) explain the problem you solve, 2) identify your customer, 3) describe your value proposition, and 4) clarify how you make money. For "${projectName}", add context about the user, their need, and the project's real-world impact.`;
  }

  if (lowerMessage.includes('risk') || lowerMessage.includes('strength')) {
    return `For "${projectName}", a clear strength is its focus on a specific need. Common risks include limited differentiation, unrealistic financial estimates, and an unclear target audience. I can help you turn this into a stronger overview with clearly explained opportunities and risks.`;
  }

  if (lowerMessage.includes('profit') || lowerMessage.includes('funding') || lowerMessage.includes('goal') || lowerMessage.includes('financial') || lowerMessage.includes('make sense')) {
    return `Based on the current details, your funding goal is ${amount}, estimated profit is ${gain}, and the estimated return period is ${returnMonths}. These figures may be reasonable if your project has a clear revenue model, a defined target customer, and a credible growth plan. Validate the expected return against realistic sales assumptions rather than an optimistic projection alone.`;
  }

  if (lowerMessage.includes('name') || lowerMessage.includes('call')) {
    return `A good name for "${projectName}" should be memorable, relevant to your offer, and easy to say. Consider simple names that convey value, trust, and clarity. I can also suggest ten options in different styles: premium, local, innovative, or institutional.`;
  }

  return `Thanks for asking about "${projectName}". While the connected Supabase/Gemini AI is not configured, here is a starting point: define the problem, explain who your customer is, strengthen your value proposition, and validate your figures with a realistic forecast. Once Gemini is configured and the chat-ai function is deployed, the assistant can provide a deeper analysis.`;
}

async function readFunctionError(error) {
  const response = error?.context;
  if (response instanceof Response) {
    try {
      const payload = await response.clone().json();
      if (typeof payload?.error === 'string' && payload.error.trim()) return payload.error;
    } catch {
      // Use the SDK message when the function did not return a JSON error.
    }

    if (response.status === 404) {
      return 'The AI function was not found. Deploy chat-ai to your Supabase project.';
    }
  }

  return error?.message || 'The assistant could not be reached.';
}

export async function askGemini(message, context = {}, history = []) {
  const trimmedMessage = message?.trim();
  if (!trimmedMessage) {
    throw new Error('Enter a question for the assistant.');
  }

  const hasSupabaseConfig = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
  const hasSupabaseClient = Boolean(supabase?.functions?.invoke);

  if (!hasSupabaseConfig || !hasSupabaseClient) {
    return buildLocalFallbackReply(trimmedMessage, context);
  }

  try {
    const { data, error } = await supabase.functions.invoke('chat-ai', {
      body: {
        message: trimmedMessage,
        context,
        history: history.slice(-12),
      },
    });

    if (error) {
      const functionError = await readFunctionError(error);
      const actionableMessage = functionError.includes('GEMINI_API_KEY')
        ? `${functionError} First run: supabase functions deploy chat-ai, then supabase secrets set GEMINI_API_KEY=your_gemini_key.`
        : functionError.includes('The AI function was not found')
          ? `${functionError} Deploy the chat-ai Edge Function to Supabase.`
          : functionError.includes('Supabase is not configured')
            ? `${functionError} Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.`
            : functionError;

      console.warn('Local AI fallback activated after an AI error:', actionableMessage);
      return buildLocalFallbackReply(trimmedMessage, context);
    }

    if (typeof data?.error === 'string' && data.error.trim()) {
      const configurableError = data.error.includes('GEMINI_API_KEY')
        ? `${data.error} Run: supabase functions deploy chat-ai, then supabase secrets set GEMINI_API_KEY=your_gemini_key.`
        : data.error.includes('The AI function was not found')
          ? `${data.error} Deploy the chat-ai Edge Function to Supabase.`
          : data.error;

      console.warn('Local AI fallback activated after an Edge Function error:', configurableError);
      return buildLocalFallbackReply(trimmedMessage, context);
    }

    if (typeof data?.reply !== 'string' || !data.reply.trim()) {
      console.warn('Local AI fallback activated after an empty assistant response.');
      return buildLocalFallbackReply(trimmedMessage, context);
    }

    return data.reply.trim();
  } catch (requestError) {
    console.warn('Local AI fallback activated after an AI exception:', requestError);
    return buildLocalFallbackReply(trimmedMessage, context);
  }
}
