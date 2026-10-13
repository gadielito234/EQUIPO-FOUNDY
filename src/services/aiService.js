import { supabase } from './supabase.js';

function normalizeText(value) {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return '';
}

function getRuntimeEnv() {
  return typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
}

export function buildLocalFallbackReply(message, context = {}) {
  const lowerMessage = message.toLowerCase();
  const projectName = normalizeText(context.nombre) || 'tu proyecto';
  const amount = normalizeText(context.monto) || 'no especificado';
  const gain = normalizeText(context.ganancia_esperada) || 'no especificado';
  const returnMonths = normalizeText(context.retorno_meses) || 'no especificado';

  if (lowerMessage.includes('tortilla') || lowerMessage.includes('tortitas') || lowerMessage.includes('tacos') || lowerMessage.includes('quesadilla')) {
    return `Para vender tortillas en el centro histórico, conviene enfocarte en tres cosas: 1) definir tu cliente ideal (turistas, oficinistas o transeúntes), 2) ofrecer una diferencia clara por sabor, relleno o calidad del producto, y 3) cuidar el precio y el margen. Prueba un precio competitivo, valida la demanda en horas pico y enfoca la promoción en visibilidad, rapidez y sabor para mejorar las ventas.`;
  }

  if (lowerMessage.includes('gaseosa') || lowerMessage.includes('refresco') || lowerMessage.includes('bebida') || lowerMessage.includes('bolsa')) {
    return `Para vender gaseosa en bolsa en el centro histórico, conviene enfocarte en tres cosas: 1) definir tu cliente ideal (turistas, oficinistas o transeúntes), 2) ofrecer una diferencia clara por sabor, temperatura o conveniencia, y 3) cuidar el precio y el margen. Prueba un precio competitivo, valida la demanda en horas pico y enfoca la promoción en visibilidad, rapidez y frescura para mejorar las ventas.`;
  }

  if (lowerMessage.includes('descripción') || lowerMessage.includes('describir') || lowerMessage.includes('idea') || lowerMessage.includes('mejorar')) {
    return `Tu idea tiene potencial, pero la propuesta necesita ser más concreta. Explica el problema que resuelves, identifica a tu cliente, describe tu valor y muestra cómo generas ingresos. Para "${projectName}", añade quién es la persona, qué necesidad cubre y por qué tu solución es distinta.`;
  }

  if (lowerMessage.includes('riesgo') || lowerMessage.includes('fortaleza') || lowerMessage.includes('debilidad')) {
    return `Para "${projectName}", una fortaleza clara es tener una idea enfocada en una necesidad concreta. Los riesgos más comunes son la poca diferenciación, una estimación financiera poco realista y un público objetivo poco definido. Conviene dejarlo claro en la presentación y mostrar por qué resuelve un problema real.`;
  }

  if (lowerMessage.includes('ganancia') || lowerMessage.includes('monto') || lowerMessage.includes('financ') || lowerMessage.includes('rentabilidad') || lowerMessage.includes('tiene sentido')) {
    return `Con la información actual, tu meta de financiamiento es ${amount}, la ganancia estimada es ${gain} y el retorno estimado es ${returnMonths} meses. Esto puede ser razonable si tu proyecto tiene un modelo de ingresos claro, un cliente definido y una proyección de ventas realista. Antes de lanzar una cifra, valida el costo, la demanda y el tiempo de venta.`;
  }

  if (lowerMessage.includes('nombre') || lowerMessage.includes('llamar') || lowerMessage.includes('marca')) {
    return `Un buen nombre para "${projectName}" debe ser claro, memorable y fácil de pronunciar. Busca algo que transmita valor, confianza y proximidad con tu cliente. Puedo ayudarte con opciones más premium, locales, modernas o institucionales.`;
  }

  return `La IA no está conectada todavía en este proyecto, así que te estoy dando una respuesta local. Para activarla debes configurar VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY en tu archivo .env y desplegar la función Edge chat-ai de Supabase con la clave de Gemini. Mientras tanto, para "${projectName}", lo más importante es definir claramente el problema que resuelves, a quién le vendes, qué hace diferente tu oferta y cómo lo vas a vender de forma realista. Si quieres, puedo ayudarte a pulir la propuesta, definir un precio o diseñar una estrategia más efectiva para tu idea.`;
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
    throw new Error('Ingresa una pregunta para el asistente.');
  }

  const runtimeEnv = getRuntimeEnv();
  const hasSupabaseConfig = Boolean(runtimeEnv.VITE_SUPABASE_URL && runtimeEnv.VITE_SUPABASE_PUBLISHABLE_KEY);
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
