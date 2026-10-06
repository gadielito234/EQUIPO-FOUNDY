import { supabase } from './supabase';

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

  const { data, error } = await supabase.functions.invoke('chat-ai', {
    body: {
      message: trimmedMessage,
      context,
      history: history.slice(-12),
    },
  });

  if (error) {
    throw new Error(await readFunctionError(error));
  }

  if (typeof data?.error === 'string' && data.error.trim()) {
    throw new Error(data.error);
  }

  if (typeof data?.reply !== 'string' || !data.reply.trim()) {
    throw new Error('El asistente no devolvio una respuesta valida. Intenta de nuevo.');
  }

  return data.reply.trim();
}
