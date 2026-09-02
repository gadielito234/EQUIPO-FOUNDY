import { useEffect, useState } from 'react';
import { ArrowLeft, Bell, ExternalLink, LoaderCircle } from 'lucide-react';
import {
  fetchNotifications,
  markAsRead,
  subscribeToNotifications,
  unsubscribeChannel,
} from '../../services/notifications.js';

// Presenta las notificaciones del emprendedor y mantiene la lista sincronizada.
function Notifications({ user, onBack }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [markingId, setMarkingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    let channel;

    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications(user.id);
        if (mounted) setNotifications(data);
      } catch (loadError) {
        if (mounted) setError(loadError.message || 'No se pudieron cargar las notificaciones.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const addNotification = (notification) => {
      setNotifications((current) => [notification, ...current.filter((item) => item.id !== notification.id)]);
    };

    const updateNotification = (notification) => {
      setNotifications((current) => current.map((item) => item.id === notification.id ? { ...item, ...notification } : item));
    };

    loadNotifications();
    channel = subscribeToNotifications(user.id, { onInsert: addNotification, onUpdate: updateNotification });

    return () => {
      mounted = false;
      unsubscribeChannel(channel);
    };
  }, [user.id]);

  const handleMarkAsRead = async (id) => {
    setMarkingId(id);
    try {
      await markAsRead(id);
      setNotifications((current) => current.map((item) => item.id === id ? { ...item, is_read: true } : item));
    } catch (markError) {
      setError(markError.message || 'No se pudo marcar la notificación.');
    } finally {
      setMarkingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6f7] text-[#31474a]">
      <div className="mx-auto max-w-4xl px-5 py-7 sm:px-8 lg:px-12">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-xs font-semibold text-[#006b73] hover:text-[#004e56]">
          <ArrowLeft size={16} /> Volver al inicio
        </button>
        <header className="mt-8 flex items-start justify-between gap-4 border-b border-[#dfe5e5] pb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#1b7f61]">Centro de actividad</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#004e56]">Notificaciones</h1>
            <p className="mt-1 text-xs leading-5 text-[#687577]">Mantente al día con la actividad de tus proyectos.</p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#dfeeed] text-[#006b73]"><Bell size={18} /></span>
        </header>

        {error && <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">{error}</p>}
        {loading && <div className="flex items-center justify-center gap-2 py-16 text-xs text-[#687577]"><LoaderCircle size={16} className="animate-spin" /> Cargando notificaciones...</div>}
        {!loading && !notifications.length && <div className="mt-8 rounded-lg border border-dashed border-[#cbd8d6] bg-white p-10 text-center text-sm text-[#687577]">No tienes notificaciones todavía.</div>}
        {!loading && notifications.length > 0 && (
          <section className="mt-6 divide-y divide-[#e1e6e6] overflow-hidden rounded-lg border border-[#e0e7e7] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)]" aria-label="Lista de notificaciones">
            {notifications.map((notification) => (
              <article key={notification.id} className={`flex gap-4 p-5 ${notification.is_read ? 'bg-white' : 'bg-[#f1f8f6]'}`}>
                <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#dfeeed] text-[#006b73]"><Bell size={16} /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-sm font-semibold text-[#1d3f42]">{notification.title}</h2>
                    <time className="text-[10px] text-[#899395]" dateTime={notification.created_at}>{new Date(notification.created_at).toLocaleString()}</time>
                  </div>
                  {notification.body && <p className="mt-2 text-xs leading-5 text-[#5f7274]">{notification.body}</p>}
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    {notification.link && <a href={notification.link} className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#006b73] hover:underline">Ver detalle <ExternalLink size={12} /></a>}
                    {!notification.is_read && <button type="button" onClick={() => handleMarkAsRead(notification.id)} disabled={markingId === notification.id} className="text-[10px] font-semibold text-[#1b7f61] hover:underline disabled:opacity-50">{markingId === notification.id ? 'Guardando...' : 'Marcar como leída'}</button>}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Notifications;