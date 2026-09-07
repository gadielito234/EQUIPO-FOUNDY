import { supabase } from './supabase.js';

export async function fetchNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('id, user_id, title, body, link, created_at, is_read')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

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

export function subscribeToNotifications(userId, handlers = {}) {
  if (typeof supabase.channel !== 'function') return null;

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

export function unsubscribeChannel(channel) {
  if (channel) return supabase.removeChannel(channel);
  return Promise.resolve();
}
