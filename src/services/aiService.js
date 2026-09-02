import { supabase } from './supabase';

export async function askGemini(message, context = {}) {
  const trimmedMessage = message?.trim();
  if (!trimmedMessage) {
    throw new Error('Escribe una consulta para el asistente.');
  }

  const { data, error } = await supabase.functions.invoke('chat-ai', {
    body: {
      message: trimmedMessage,
      context,
    },
  });

  if (error) {
    throw new Error(error.message || 'No se pudo contactar al asistente.');
  }

  if (!data?.reply) {
    throw new Error('El asistente no devolvio una respuesta valida.');
  }

  return data.reply;
}
