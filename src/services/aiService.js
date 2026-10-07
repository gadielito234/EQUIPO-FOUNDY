import { supabase } from './supabase';

function normalizeText(value) {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return '';
}

function buildLocalFallbackReply(message, context = {}) {
  const lowerMessage = message.toLowerCase();
  const projectName = normalizeText(context.nombre) || 'tu proyecto';
  const amount = normalizeText(context.monto) || 'no indicado';
  const gain = normalizeText(context.ganancia_esperada) || 'no indicada';
  const returnMonths = normalizeText(context.retorno_meses) || 'no indicado';

  if (lowerMessage.includes('descripcion') || lowerMessage.includes('mejorar') || lowerMessage.includes('idea')) {
    return `Tu idea tiene buen potencial, pero conviene reforzar la descripcion para que se entienda rapido. Te recomiendo: 1) explicar el problema que resuelves, 2) mostrar quien es tu cliente, 3) describir la propuesta de valor y 4) dejar claro como ganas dinero. En el caso de "${projectName}", la descripcion actual puede mejorar si agregas contexto sobre el usuario, la necesidad y el impacto real.`;
  }

  if (lowerMessage.includes('riesgo') || lowerMessage.includes('riesgos') || lowerMessage.includes('fortalezas')) {
    return `Para "${projectName}", una fortaleza clara es que tienes un enfoque con una necesidad concreta. Los riesgos principales suelen ser: falta de diferenciacion, estimaciones financieras poco realistas y no definir bien a quien va dirigido. Si quieres, te ayudo a convertir eso en una version mas solida, con oportunidades y riesgos explicados de manera clara.`;
  }

  if (lowerMessage.includes('ganancia') || lowerMessage.includes('monto') || lowerMessage.includes('coherente') || lowerMessage.includes('financ')) {
    return `Con los datos actuales, tu objetivo de inversion es ${amount} y la ganancia esperada es ${gain}. El plazo estimado es ${returnMonths}. Eso puede ser coherente si tu proyecto tiene un modelo claro de monetizacion, un cliente objetivo definido y una ruta de crecimiento razonable. Te sugeriria validar si el retorno se sostiene con un plan de ventas realista y no solo con una proyeccion optimista.`;
  }

  if (lowerMessage.includes('nombre') || lowerMessage.includes('llamar')) {
    return `Un buen nombre para "${projectName}" debe ser facil de recordar, relacionado con tu propuesta y con buena sonoridad. Prueba opciones mas simples como nombres que transmitan valor, confianza y claridad. Si quieres, puedo ayudarte a crear 10 nombres con diferentes estilos: premium, local, innovador o mas institucional.`;
  }

  return `Gracias por tu consulta sobre "${projectName}". Aunque la IA conectada en Supabase/Gemini aun no este configurada, esta guia local te da una primera direccion: define bien el problema, explica el cliente, refuerza la propuesta de valor y valida tus cifras con una proyeccion realista. Si activas la clave de Gemini y despliegas la funcion chat-ai, el asistente va a responder con un analisis mas profundo.`;
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
      return 'No se encontro la funcion de IA. Despliega chat-ai en tu proyecto de Supabase.';
    }
  }

  return error?.message || 'No se pudo contactar al asistente.';
}

export async function askGemini(message, context = {}, history = []) {
  const trimmedMessage = message?.trim();
  if (!trimmedMessage) {
    throw new Error('Escribe una consulta para el asistente.');
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
        ? `${functionError} Ejecuta primero: supabase functions deploy chat-ai y luego supabase secrets set GEMINI_API_KEY=tu_clave_de_gemini.`
        : functionError.includes('No se encontro la funcion de IA')
          ? `${functionError} Debes desplegar la Edge Function chat-ai en Supabase.`
          : functionError.includes('Supabase no configurado')
            ? `${functionError} Configura VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY en tu archivo .env.`
            : functionError;

      console.warn('Fallback local activado por problema de IA:', actionableMessage);
      return buildLocalFallbackReply(trimmedMessage, context);
    }

    if (typeof data?.error === 'string' && data.error.trim()) {
      const configurableError = data.error.includes('GEMINI_API_KEY')
        ? `${data.error} Ejecuta: supabase functions deploy chat-ai y luego supabase secrets set GEMINI_API_KEY=tu_clave_de_gemini.`
        : data.error.includes('No se encontro la funcion de IA')
          ? `${data.error} Debes desplegar la Edge Function chat-ai en Supabase.`
          : data.error;

      console.warn('Fallback local activado por error de Edge Function:', configurableError);
      return buildLocalFallbackReply(trimmedMessage, context);
    }

    if (typeof data?.reply !== 'string' || !data.reply.trim()) {
      console.warn('Fallback local activado por respuesta vacia del asistente.');
      return buildLocalFallbackReply(trimmedMessage, context);
    }

    return data.reply.trim();
  } catch (requestError) {
    console.warn('Fallback local activado por excepcion de IA:', requestError);
    return buildLocalFallbackReply(trimmedMessage, context);
  }
}
