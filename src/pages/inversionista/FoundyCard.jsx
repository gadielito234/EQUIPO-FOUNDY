import { useMemo } from 'react';

const defaultUser = {
  name: 'Sara Hernández',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
};

const chartBars = [
  { label: 'Jan', value: 28 },
  { label: 'Feb', value: 38 },
  { label: 'Mar', value: 42 },
  { label: 'Apr', value: 58 },
  { label: 'May', value: 74 },
  { label: 'Jun', value: 64 },
];

const updates = [
  {
    name: 'EcoStream Solutions',
    badge: 'Seed Stage',
    value: '$48k',
    meta: 'Q3 revenue goals exceeded by 15% following our…',
    tone: 'green',
    investors: 42,
  },
  {
    name: 'Quantum Ledger',
    badge: 'Series A',
    value: '$27k',
    meta: 'Beta testing for our cross-border payment protocol is…',
    tone: 'purple',
    investors: 128,
  },
];

function FoundyCardPage({ usuarioData }) {
  const user = useMemo(() => {
    try {
      const savedUser = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('user') || 'null') : null;
      return savedUser?.name ? { ...defaultUser, ...savedUser } : defaultUser;
    } catch {
      return defaultUser;
    }
  }, []);

  const userName = usuarioData?.usuario || user.name;
  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      <section className="my-6 flex items-center justify-between gap-4 rounded-xl bg-[#dfeeed] px-6 py-5">
        <div>
          <span className="text-[0.7rem] font-bold tracking-[0.16em] text-[#1b7f61]">MEMBER DASHBOARD</span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Manage your Foundy Card and exclusive investment portfolio.</h1>
        </div>
        <button type="button" className="shrink-0 rounded-lg bg-[#1d5c4d] px-4 py-3 text-sm font-bold text-white hover:bg-[#15483d]">
          + Invest Now
        </button>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <section className="flex min-w-0 flex-col gap-5">
          <article className="min-h-[215px] rounded-2xl bg-gradient-to-br from-[#06494d] via-[#0d4c52] to-[#1a6d71] p-6 text-white shadow-[0_14px_24px_rgba(13,44,50,0.12)]">
            <div className="flex items-center justify-between">
              <span className="font-bold tracking-[0.18em]">FOUNDY</span>
              <span className="text-xl" aria-label="Card type">●●●</span>
            </div>

            <div className="mt-10 text-xs uppercase tracking-[0.18em] text-white/65">Investor ID</div>
            <div className="mt-2 text-lg tracking-[0.2em]"># # # # # # # # # # 8291</div>

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
              <span className="rounded-full bg-[#1b7f61]/[0.12] px-3 py-1 text-xs font-bold text-[#1b7f61]">+12.4%</span>
            </div>

            <div className="mt-5">
              <div className="text-xs text-[#6d7b88]">Total Value</div>
              <div className="mt-1 text-3xl font-bold text-[#0f2d39]">$128,490.00</div>
            </div>
          </article>

          <article className="rounded-xl border border-[#0b252b]/10 bg-white p-5 shadow-[0_14px_24px_rgba(13,44,50,0.06)]">
            <div className="flex items-center justify-between font-semibold">
              <span>ROI Performance</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#6d7b88]">YTD</span>
            </div>

            <div className="mt-6 flex h-40 items-end justify-between gap-3" aria-label="ROI performance chart">
              {chartBars.map((bar) => (
                <div key={bar.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2 text-xs text-[#6d7b88]">
                  <div className="w-full rounded-t-md bg-[#1b7f61]" style={{ height: `${bar.value}%` }} />
                  <span>{bar.label}</span>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="flex items-center gap-3 rounded-xl border border-[#0b252b]/10 bg-white p-4">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#1b7f61]/[0.12] text-[#1b7f61]">✦</div>
              <div>
                <h3 className="font-semibold">Early Access</h3>
                <p className="text-xs text-[#6d7b88]">Priority opportunities</p>
              </div>
            </article>

            <article className="flex items-center gap-3 rounded-xl border border-[#0b252b]/10 bg-white p-4">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#1b7f61]/[0.12] text-[#1b7f61]">✓</div>
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
              {updates.map((item) => (
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
                      <span>◔</span>
                      <span>{item.investors} investors</span>
                    </div>
                  </div>
                  <strong className="text-sm text-[#1b7f61]">{item.value}</strong>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default FoundyCardPage;
