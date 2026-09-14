import { useState } from 'react';

const defaultUser = { name: 'Usuario', avatar: null };

const getStoredUser = () => {
  if (typeof window === 'undefined') {
    return defaultUser;
  }

  try {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser?.name) {
      return {
        ...defaultUser,
        ...savedUser,
      };
    }
  } catch (error) {
    console.warn('Unable to parse user from localStorage:', error);
  }

  return defaultUser;
};

const updates = [];

function FoundyCardPage({ usuarioData }) {
  const [storedUser] = useState(getStoredUser);
  const user = {
    ...storedUser,
    name: usuarioData?.usuario || storedUser.name,
    avatar: usuarioData?.avatar || storedUser.avatar,
  };
  const userName = user?.name || defaultUser.name;
  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-12">
      <section className="flex items-center justify-between gap-4 rounded-xl bg-[#dfeeed] px-6 py-5">
        <div>
          <span className="text-[0.7rem] font-bold tracking-[0.16em] text-[#1b7f61]">MEMBER DASHBOARD</span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Manage your Foundy Card and exclusive investment portfolio.</h1>
        </div>
        <button type="button" className="shrink-0 rounded-lg bg-[#1d5c4d] px-4 py-3 text-sm font-bold text-white hover:bg-[#15483d]">
          + Invest Now
        </button>
      </section>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <section className="flex min-w-0 flex-col gap-5">
          <article className="min-h-53.75 rounded-2xl bg-linear-to-br from-[#06494d] via-[#0d4c52] to-[#1a6d71] p-6 text-white shadow-[0_14px_24px_rgba(13,44,50,0.12)]">
            <div className="flex items-center justify-between">
              <span className="font-bold tracking-[0.18em]">FOUNDY</span>
              <span className="text-xl" aria-label="Card type">
                •••
              </span>
            </div>

            <div className="mt-10 text-xs uppercase tracking-[0.18em] text-white/65">Investor ID</div>
            <div className="mt-2 text-lg tracking-[0.2em]">No disponible</div>

            <div className="mt-7 flex items-end justify-between">
              <div>
                <span className="block text-[0.65rem] uppercase tracking-widest text-white/60">Card Holder</span>
                <strong className="text-sm">{userName}</strong>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-xs font-bold">{initials}</div>
            </div>
          </article>

          <article className="rounded-xl border border-[#0b252b]/10 bg-white p-5 shadow-[0_14px_24px_rgba(13,44,50,0.06)]">
            <div className="flex items-center justify-between font-semibold">
              <span>Portfolio Summary</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#6d7b88]">No data</span>
            </div>

            <div className="mt-5">
              <div className="text-xs text-[#6d7b88]">Total Value</div>
              <div className="mt-1 text-3xl font-bold text-[#0f2d39]">No data</div>
            </div>
          </article>

          <article className="rounded-xl border border-[#0b252b]/10 bg-white p-5 shadow-[0_14px_24px_rgba(13,44,50,0.06)]">
            <div className="flex items-center justify-between font-semibold">
              <span>ROI Performance</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#6d7b88]">YTD</span>
            </div>

            <div className="mt-6 flex h-40 items-end justify-between gap-3" aria-label="ROI performance chart">
              <p className="m-auto text-xs text-[#6d7b88]">No hay datos de rendimiento.</p>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="flex items-center gap-3 rounded-xl border border-[#0b252b]/10 bg-white p-4">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#1b7f61]/12 text-[#1b7f61]">✦</div>
              <div>
                <h3 className="font-semibold">Early Access</h3>
                <p className="text-xs text-[#6d7b88]">Priority opportunities</p>
              </div>
            </article>

            <article className="flex items-center gap-3 rounded-xl border border-[#0b252b]/10 bg-white p-4">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#1b7f61]/12 text-[#1b7f61]">✓</div>
              <div>
                <h3 className="font-semibold">Tax Benefits</h3>
                <p className="text-xs text-[#6d7b88]">Smart portfolio planning</p>
              </div>
            </article>
          </div>
        </section>

        <aside>
          <section className="rounded-xl border border-[#0b252b]/10 bg-white p-5 shadow-[0_14px_24px_rgba(13,44,50,0.06)]">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Entrepreneur Updates</h2>
              <button type="button" className="text-xs font-bold text-[#1b7f61]">View All</button>
            </div>

            <div className="mt-4 divide-y divide-[#0b252b]/10">
              {updates.length > 0 ? updates.map((item) => (
                <article key={item.name} className="flex gap-3 py-4 first:pt-0">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${item.tone === 'green' ? 'bg-[#1b7f61]' : 'bg-[#7654a8]'}`}>
                    {item.name.split(' ')[0][0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold">{item.name}</h3>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-[#6d7b88]">{item.badge}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-[#6d7b88]">{item.meta}</p>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-[#6d7b88]">
                      <span>â—”</span>
                      <span>{item.investors} investors</span>
                    </div>
                  </div>
                  <strong className="text-sm text-[#1b7f61]">{item.value}</strong>
                </article>
              )) : <p className="py-6 text-center text-xs text-[#6d7b88]">No hay actualizaciones disponibles.</p>}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default FoundyCardPage;
