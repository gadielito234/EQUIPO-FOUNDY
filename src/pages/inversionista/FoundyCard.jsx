const defaultUser = {
  name: 'Sara Hernandez',
};

const updates = [
  { name: 'EcoStream Solutions', status: 'Seed Stage', value: '$48k' },
  { name: 'Quantum Ledger', status: 'Series A', value: '$27k' },
];

function FoundyCardPage({ usuarioData, onBackHome, onOpenSettings, onOpenChat, onLogout }) {
  const userName = usuarioData?.usuario || defaultUser.name;

  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      <section className="my-6 flex items-center justify-between gap-4 rounded-xl bg-[#dfeeed] px-6 py-5">
        <div>
          <span className="text-[0.7rem] font-bold tracking-[0.16em] text-[#1b7f61]">MEMBER DASHBOARD</span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Manage your Foundy Card and exclusive investment portfolio.</h1>
        </div>
        <button type="button" className="shrink-0 rounded-lg bg-[#1d5c4d] px-4 py-3 text-sm font-bold text-white hover:bg-[#15483d]">+ Invest Now</button>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <section className="flex min-w-0 flex-col gap-5">
          <article className="rounded-2xl bg-gradient-to-br from-[#06494d] via-[#0d4c52] to-[#1a6d71] p-6 text-white shadow-[0_14px_24px_rgba(13,44,50,0.12)]">
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
              <div className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-xs font-bold">{userName.slice(0, 2).toUpperCase()}</div>
            </div>
          </article>

          <article className="rounded-xl border border-[#0b252b]/10 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between font-semibold">
              <span>Portfolio Summary</span>
              <span className="rounded-full bg-[#1b7f61]/[0.12] px-3 py-1 text-xs font-bold text-[#1b7f61]">+12.4%</span>
            </div>
            <div className="mt-5 text-xs text-[#6d7b88]">Total Value</div>
            <div className="mt-1 text-3xl font-bold text-[#0f2d39]">$128,490.00</div>
          </article>
        </section>

        <aside className="rounded-xl border border-[#0b252b]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Entrepreneur Updates</h2>
            <button type="button" className="text-xs font-bold text-[#1b7f61]">View All</button>
          </div>
          <div className="mt-4 divide-y divide-[#0b252b]/10">
            {updates.map((item) => (
              <article key={item.name} className="flex items-center justify-between gap-3 py-4 first:pt-0">
                <div>
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="mt-1 text-xs text-[#6d7b88]">{item.status}</p>
                </div>
                <strong className="text-sm text-[#1b7f61]">{item.value}</strong>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            <button type="button" onClick={onBackHome} className="text-xs font-semibold text-[#0d5c5d]">Dashboard</button>
            <button type="button" onClick={onOpenSettings} className="text-xs font-semibold text-[#0d5c5d]">Settings</button>
            <button type="button" onClick={onOpenChat} className="text-xs font-semibold text-[#0d5c5d]">Messages</button>
            <button type="button" onClick={onLogout} className="text-xs font-semibold text-[#0d5c5d]">Logout</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default FoundyCardPage;
