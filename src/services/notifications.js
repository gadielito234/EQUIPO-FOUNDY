import { supabase } from './supabase.js';

// Centraliza la lectura y actualización de notificaciones del usuario actual.
export async function fetchNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('id, user_id, title, body, link, created_at, is_read')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Marca una notificación como leída y deja que RLS valide el acceso a la fila.
export async function markAsRead(id) {
  const { data, error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
    .select('id, user_id, title, body, link, created_at, is_read')
    .single();

  if (error) throw error;
  return data;
}

// Escucha INSERT y UPDATE únicamente para las filas del usuario autenticado.
export function subscribeToNotifications(userId, handlers = {}) {
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
      (payload) => handlers.onInsert?.(payload.new),
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
      (payload) => handlers.onUpdate?.(payload.new),
    );

  channel.subscribe();
  return channel;
}

// Retira el canal realtime cuando la pantalla deja de estar montada.
export function unsubscribeChannel(channel) {
  if (channel) return supabase.removeChannel(channel);
  return Promise.resolve();
}