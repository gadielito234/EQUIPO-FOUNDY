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
﻿import { ArrowUpRight, BriefcaseBusiness, CreditCard, Gem, PieChart, ShieldCheck, TrendingUp } from 'lucide-react';

function FoundyCardPage({ usuarioData, onBackHome, onOpenInvestments }) {
  const userName = usuarioData?.usuario || 'Usuario';
  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  const investorId = usuarioData?.dui ? `FDY-${String(usuarioData.dui).slice(-4)}` : 'FDY-0000';

  return (
    <main className="min-h-full bg-[#f7f3ee] px-4 py-6 text-[#173f43] sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <section className="overflow-hidden rounded-[24px] border border-[#0b817d]/25 bg-[#0b5d61] py-9 text-white shadow-[0_14px_30px_rgba(11,93,97,0.12)]">
          <div className="flex flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e5d5]">Foundy Card</p>
              <h1 className="mt-2 max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">Your investment center, all in one place.</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">Check your card status and investment summary from your dashboard.</p>
            </div>
            <button type="button" onClick={onBackHome} className="inline-flex items-center gap-2 self-start rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:self-auto">
              Back to dashboard <ArrowUpRight size={15} />
            </button>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <div className="space-y-6">
            <section className="relative min-h-[260px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#123f43] via-[#0a6b6d] to-[#1ca38b] p-6 text-white shadow-[0_18px_35px_rgba(10,75,77,0.2)] sm:p-8">
              <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10" />
              <div className="relative flex h-full min-h-[210px] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold tracking-[0.22em]">FOUNDY</span>
                  <CreditCard size={27} className="text-white/80" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Investor ID</p>
                  <p className="mt-2 text-lg tracking-[0.22em]">{investorId}</p>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Card holder</p>
                    <p className="mt-1 text-sm font-semibold">{userName}</p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-white/10 text-xs font-bold">{initials || 'IN'}</div>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#e5e0d8] bg-white p-6 shadow-[0_12px_28px_rgba(35,60,62,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#728184]">Portfolio summary</p>
                  <h2 className="mt-1 text-2xl font-bold text-[#173f43]">Your investment activity</h2>
                </div>
                <PieChart className="text-[#0b817d]" size={25} />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#f4f8f6] p-4"><p className="text-xs text-[#728184]">Total value</p><p className="mt-2 text-xl font-bold">No data</p></div>
                <div className="rounded-2xl bg-[#f4f8f6] p-4"><p className="text-xs text-[#728184]">Active investments</p><p className="mt-2 text-xl font-bold">0</p></div>
                <div className="rounded-2xl bg-[#f4f8f6] p-4"><p className="text-xs text-[#728184]">Performance</p><p className="mt-2 text-xl font-bold">No data</p></div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[24px] border border-[#e5e0d8] bg-white p-6 shadow-[0_12px_28px_rgba(35,60,62,0.06)]">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e2f4ee] text-[#0b817d]"><TrendingUp size={18} /></span>
                <div><h2 className="font-bold">Rendimiento</h2><p className="text-xs text-[#728184]">Resumen anual</p></div>
              </div>
              <div className="mt-7 flex h-28 items-end gap-2">
                {[35, 48, 42, 63, 57, 78, 88].map((height, index) => <div key={index} className="flex-1 rounded-t-md bg-[#9fd8c7]" style={{ height: `${height}%` }} />)}
              </div>
              <p className="mt-3 text-xs text-[#728184]">Performance will appear after you make your first investment.</p>
            </section>

            <section className="rounded-[24px] border border-[#e5e0d8] bg-white p-6 shadow-[0_12px_28px_rgba(35,60,62,0.06)]">
              <h2 className="font-bold">Your card benefits</h2>
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3"><ShieldCheck size={18} className="text-[#0b817d]" /><span className="text-sm text-[#536568]">Secure investment tracking</span></div>
                <div className="flex items-center gap-3"><Gem size={18} className="text-[#0b817d]" /><span className="text-sm text-[#536568]">Access to selected opportunities</span></div>
                <div className="flex items-center gap-3"><BriefcaseBusiness size={18} className="text-[#0b817d]" /><span className="text-sm text-[#536568]">Centralized portfolio management</span></div>
              </div>
              <button type="button" onClick={onOpenInvestments} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0b817d] transition hover:text-[#075e5c]">View my investments <ArrowUpRight size={15} /></button>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default FoundyCardPage;
