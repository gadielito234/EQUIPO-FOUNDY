import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Bell, CheckCheck, Clock3, ExternalLink, LoaderCircle, Sparkles } from 'lucide-react';
import {
  fetchNotifications,
  markAsRead,
  subscribeToNotifications,
  unsubscribeChannel,
} from '../../services/notifications.js';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
];

export default function Notifications({ user, usuarioData, role, onBack }) {
  const currentUser = user ?? usuarioData ?? null;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [markingId, setMarkingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const userId = currentUser?.id ?? currentUser?.dui;
  const isInvestor = role === 'Inversionista' || currentUser?.tipo_usuario === 'Inversionista';

  useEffect(() => {
    let mounted = true;
    let channel;

    const loadNotifications = async () => {
      setLoading(true);
      setError('');
      try {
        if (!userId) throw new Error('The user identifier could not be found.');
        const data = await fetchNotifications(userId);
        if (mounted) setNotifications(data);
      } catch (loadError) {
        if (mounted) setError(loadError.message || 'Notifications could not be loaded.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const addNotification = (notification) => {
      setNotifications((current) => [notification, ...current.filter((item) => item.id !== notification.id)]);
    };

    const updateNotification = (notification) => {
      setNotifications((current) => current.map((item) => (item.id === notification.id ? { ...item, ...notification } : item)));
    };

    loadNotifications();
    if (userId) {
      channel = subscribeToNotifications(userId, { onInsert: addNotification, onUpdate: updateNotification });
    }

    return () => {
      mounted = false;
      unsubscribeChannel(channel);
    };
  }, [userId]);

  const summary = useMemo(() => {
    const unread = notifications.filter((item) => !item.is_read).length;
    return { total: notifications.length, unread, read: notifications.length - unread };
  }, [notifications]);

  const visibleNotifications = useMemo(() => {
    if (filter === 'unread') return notifications.filter((item) => !item.is_read);
    if (filter === 'read') return notifications.filter((item) => item.is_read);
    return notifications;
  }, [filter, notifications]);

  const handleMarkAsRead = async (id) => {
    setMarkingId(id);
    setError('');
    try {
      await markAsRead(id);
      setNotifications((current) => current.map((item) => (item.id === id ? { ...item, is_read: true } : item)));
    } catch (markError) {
      setError(markError.message || 'The notification could not be marked as read.');
    } finally {
      setMarkingId(null);
    }
  };

  const formatTime = (value) => {
    if (!value) return 'Just now';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Just now';
    return date.toLocaleString('en-US', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <main className="min-h-screen bg-[#f4f6f7] text-[#31474a]">
      <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 lg:px-12">
        {onBack && (
          <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-xs font-semibold text-[#006b73] transition hover:text-[#004e56]">
            <ArrowLeft size={16} /> Back to home
          </button>
        )}

        <header className="mt-8 rounded-[28px] border border-[#dfe5e5] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(17,52,60,0.04)] sm:px-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#1b7f61]">{isInvestor ? 'Investor' : 'User'} activity center</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#004e56] sm:text-[2rem]">Notifications</h1>
              <p className="mt-1 text-xs leading-5 text-[#687577] sm:text-sm">Stay up to date with your investment activity.</p>
            </div>
            <div className="flex items-center gap-3 self-start rounded-full bg-[#dfeeed] px-3 py-2 text-[#006b73] shadow-inner sm:self-auto">
              <Bell size={18} className="fill-current" /><span className="text-xs font-semibold">{summary.unread} new</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ['Total', summary.total, 'bg-[#f6fbfa] text-[#0d464d]'],
              ['Unread', summary.unread, 'bg-[#eef9f4] text-[#1b7f61]'],
              ['Read', summary.read, 'bg-[#f3f7f8] text-[#31474a]'],
            ].map(([label, value, colors]) => (
              <div key={label} className={`rounded-2xl border border-[#dfe7e5] p-4 ${colors}`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-75">{label}</p>
                <p className="mt-2 text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </header>

        {error && <p role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">{error}</p>}

        {loading && (
          <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-[#dfe5e5] bg-white py-16 text-sm text-[#687577] shadow-[0_10px_30px_rgba(17,52,60,0.02)]">
            <LoaderCircle size={16} className="animate-spin" /> Loading notifications...
          </div>
        )}

        {!loading && !notifications.length && (
          <div className="mt-8 rounded-[28px] border border-dashed border-[#cbd8d6] bg-white p-10 text-center shadow-[0_10px_30px_rgba(17,52,60,0.02)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf8f4] text-[#1b7f61]"><Sparkles size={24} /></div>
            <h2 className="mt-5 text-lg font-semibold text-[#1d3f42]">Everything is in order</h2>
            <p className="mt-2 text-sm text-[#687577]">You do not have any notifications yet.</p>
          </div>
        )}

        {!loading && notifications.length > 0 && (
          <section className="mt-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {filterOptions.map((option) => (
                <button key={option.value} type="button" onClick={() => setFilter(option.value)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${filter === option.value ? 'border-[#006b73] bg-[#006b73] text-white shadow-sm' : 'border-[#dfe5e5] bg-white text-[#4f5d5f] hover:border-[#b9d9d5] hover:text-[#004e56]'}`}>
                  {option.label}
                </button>
              ))}
            </div>

            {visibleNotifications.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-[#cbd8d6] bg-white p-10 text-center text-sm text-[#687577]">There are no notifications in this filter.</div>
            ) : (
              <div className="divide-y divide-[#e1e6e6] overflow-hidden rounded-[24px] border border-[#e0e7e7] bg-white shadow-[0_12px_30px_rgba(17,52,60,0.03)]" aria-label="Lista de notificaciones">
                {visibleNotifications.map((notification) => (
                  <article key={notification.id} className={`flex gap-4 p-4 sm:p-5 ${notification.is_read ? 'bg-white' : 'bg-[#f1f8f6]'}`}>
                    <div className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full ${notification.is_read ? 'bg-[#edf2f2] text-[#5a6c6d]' : 'bg-[#dfeeed] text-[#006b73]'}`}>
                        {notification.is_read ? <CheckCheck size={16} /> : <Bell size={16} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0"><h2 className="text-sm font-semibold text-[#1d3f42]">{notification.title}</h2>{!notification.is_read && <span className="mt-1 inline-flex items-center rounded-full bg-[#dff5ee] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#1b7f61]">New</span>}</div>
                        <div className="flex items-center gap-2 text-[10px] text-[#899395]"><Clock3 size={11} /><time dateTime={notification.created_at}>{formatTime(notification.created_at)}</time></div>
                      </div>
                      {notification.body && <p className="mt-2 text-xs leading-5 text-[#5f7274]">{notification.body}</p>}
                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        {notification.link && <a href={notification.link} className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#006b73] transition hover:underline" target="_blank" rel="noreferrer">View details <ExternalLink size={12} /></a>}
                        {!notification.is_read && <button type="button" onClick={() => handleMarkAsRead(notification.id)} disabled={markingId === notification.id} className="text-[10px] font-semibold text-[#1b7f61] transition hover:underline disabled:opacity-50">{markingId === notification.id ? 'Saving...' : 'Mark as read'}</button>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}