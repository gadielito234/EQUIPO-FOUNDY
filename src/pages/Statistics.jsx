import { useState } from 'react';

const menuItems = [
  { label: 'Home', icon: '⌂' },
  { label: 'My investments', icon: '▣' },
  { label: 'Messages', icon: '▱' },
  { label: 'Settings', icon: '⚙' },
  { label: 'Notifications', icon: '♧' },
];

const chartPoints = '0,126 22,124 44,121 66,118 88,112 110,113 132,106 154,101 176,99 198,91 220,98 242,87 264,65 286,67 308,40 330,29 352,38 374,51 396,34';

function Statistics({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome, onOpenCreateProject, onOpenChat, onOpenFoundyCard }) {
  const nombreUsuario = usuarioData?.usuario || 'usuario';
  const [menuAbierto, setMenuAbierto] = useState(true);

  return (
    <div className="min-h-screen bg-[#f4f6f7] text-[#31474a]">
      <div className="flex min-h-screen">
          {menuAbierto && <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-[#dfe5e5] bg-[#f8faf9] px-4 py-5 shadow-sm lg:static lg:shadow-none" aria-label="Menú principal">
            <div className="flex items-center justify-between border-b border-[#e1e6e6] pb-5">
              <img src="/images/foundy-logo.png" alt="Foundy" className="mx-auto h-8 w-auto object-contain brightness-0 opacity-75" />
            </div>
            <div className="border-b border-[#e1e6e6] py-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#006b73] bg-[#d6e7e6] text-xl text-[#006b73]">{nombreUsuario.charAt(0).toUpperCase()}</div>
              <p className="mt-2 text-xs font-semibold text-[#27383a]">{nombreUsuario}</p>
              <span className="mt-1 inline-block rounded bg-[#dfe6e6] px-2 py-0.5 text-[10px] text-[#637173]">Emprendedor</span>
            </div>
            <nav className="mt-5 flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <button key={item.label} type="button" onClick={item.label === 'Home' ? onBackHome : item.label === 'My investments' ? onOpenCreateProject : item.label === 'Messages' ? onOpenChat : item.label === 'Settings' ? onOpenSettings : undefined} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs transition ${item.active ? 'bg-[#006b73] font-semibold text-white shadow-sm' : 'text-[#526164] hover:bg-[#e8f0f0] hover:text-[#006b73]'}`}>
                  <span className="w-4 text-center text-base leading-none" aria-hidden="true">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-1.5 border-t border-[#e1e6e6] pt-4">
              <button type="button" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-[#526164] hover:bg-[#e8f0f0] hover:text-[#006b73]"><span className="w-4 text-center text-base">?</span>Support</button>
              <button type="button" onClick={onCerrarSesion} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-[#526164] hover:bg-[#e8f0f0] hover:text-[#006b73]"><span className="w-4 text-center text-base">↪</span>Logout</button>
            </div>
        </aside>}
        <div className="min-w-0 flex-1">
          <header className="relative z-40 flex h-[4.5rem] items-center justify-between border-b border-[#dfe5e5] bg-[#f8faf9] px-6 sm:px-10">
            <div className="flex h-full items-center gap-5 sm:gap-12">
              <button type="button" onClick={() => setMenuAbierto((abierto) => !abierto)} className="text-lg text-[#006b73]" aria-label={menuAbierto ? 'Ocultar menú' : 'Mostrar menú'} aria-expanded={menuAbierto}>☰</button>
              <nav className="hidden h-full items-center gap-7 text-[11px] sm:flex" aria-label="Secciones">
                <button type="button" onClick={onBackHome} className="text-[#758082] hover:text-[#006b73]">Dashboard</button>
                <a href="#estadisticas" className="border-b-2 border-[#006b73] py-[1.62rem] font-semibold text-[#006b73]">Statistics</a>
                <button type="button" onClick={onOpenFoundyCard} className="text-[#758082] hover:text-[#006b73]">Foundy card</button>
              </nav>
            </div>
            <label className="flex h-8 w-36 items-center gap-2 rounded-full border border-[#dce2e2] bg-[#eef2f2] px-3 text-[#899496] sm:w-44"><span aria-hidden="true">⌕</span><input type="search" placeholder="Buscar" className="w-full bg-transparent text-xs outline-none placeholder:text-[#899496]" /></label>
          </header>
          <main id="dashboard" className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-12">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div><h1 className="text-2xl font-bold tracking-tight text-[#004e56]">My Statistics</h1><p className="mt-1 max-w-lg text-xs leading-5 text-[#687577]">Track your progress and get insights into your performance.</p></div>
              <div className="flex items-center gap-2 self-start"><button type="button" className="rounded-md border border-[#cbd7d7] bg-white px-3 py-2 text-[11px] font-medium text-[#506063]">This week ▾</button><button type="button" className="rounded-md bg-[#006b73] px-3 py-2 text-[11px] font-semibold text-white shadow-sm">Export report</button></div>
            </section>
            <section id="estadisticas" className="mt-7 grid gap-4 sm:grid-cols-3">
              <article className="rounded-lg border border-[#e8eeee] bg-[#146f78] p-4 text-white shadow-[0_8px_18px_rgba(0,90,95,0.12)]"><p className="text-[11px] text-[#d8f2ee]">Total Investment</p><p className="mt-2 text-2xl font-semibold tracking-tight">$12,450.00</p><p className="mt-2 text-[10px] font-semibold text-[#c0e9df]">↗ 12.5% vs last month</p></article>
              <article className="rounded-lg border border-[#e8eeee] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"><p className="text-[11px] text-[#7d898b]">Avg. Annual ROI</p><p className="mt-2 text-2xl font-semibold tracking-tight text-[#279578]">18.2%</p><p className="mt-2 text-[10px] font-semibold text-[#2c8068]">↗ 4.8% vs last month</p></article>
              <article className="rounded-lg border border-[#d9eee8] bg-[#e4f3ef] p-4"><p className="text-[11px] text-[#527573]">Active Projects</p><p className="mt-2 text-2xl font-semibold tracking-tight text-[#32977d]">07</p><p className="mt-2 text-[10px] font-semibold text-[#2c8068]">↗ 2 new this month</p></article>
            </section>
            <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(220px,0.8fr)]">
              <article className="rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-[#293a3d]">Portfolio Growth</h2><p className="mt-1 text-[10px] text-[#899395]">Your investment growth over time</p></div><div className="flex gap-1 rounded border border-[#e0e7e7] p-1 text-[8px] text-[#617173]"><button type="button" className="rounded bg-[#e6f1f0] px-2 py-1 font-semibold text-[#006b73]">6 MONTHS</button><button type="button" className="px-2 py-1">1 YEAR</button><button type="button" className="px-2 py-1">ALL</button></div></div><div className="relative mt-8 h-40 border-b border-[#e4e9e9] bg-[linear-gradient(to_bottom,transparent_24%,#edf2f2_25%,transparent_26%,transparent_49%,#edf2f2_50%,transparent_51%,transparent_74%,#edf2f2_75%,transparent_76%)]"><svg viewBox="0 0 396 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label="Crecimiento del portafolio durante el año"><path d="M0 126 C38 123 64 121 88 113 S132 110 154 101 S188 109 210 91 S244 95 264 65 S295 88 308 40 S346 59 374 51 S389 36 396 34 L396 140 L0 140 Z" fill="url(#growthFill)" /><path d="M0 126 C38 123 64 121 88 113 S132 110 154 101 S188 109 210 91 S244 95 264 65 S295 88 308 40 S346 59 374 51 S389 36 396 34" fill="none" stroke="#138b88" strokeWidth="2" vectorEffect="non-scaling-stroke" /><defs><linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#65bcb2" stopOpacity="0.27" /><stop offset="100%" stopColor="#65bcb2" stopOpacity="0.02" /></linearGradient></defs><circle cx="308" cy="40" r="3.5" fill="#fff" stroke="#138b88" strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg></div><div className="mt-2 flex justify-between px-1 text-[9px] text-[#899395]"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span></div></article>
              <article className="rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"><h2 className="text-sm font-semibold text-[#293a3d]">Distribution</h2><p className="mt-1 text-[10px] text-[#899395]">By project category</p><div className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#146f78 0 55%, #69c5b0 55% 85%, #d3e8e1 85% 100%)' }}><div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white"><strong className="block text-2xl text-[#006b73]">07</strong><span className="text-[9px] text-[#7b888a]">ACTIVE PROJECTS</span></div></div><div className="mt-5 space-y-2 text-[10px] text-[#586668]"><p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#146f78]" />Equity &amp; Tech <span className="float-right rounded bg-[#e5f1ee] px-1 text-[#527573]">55%</span></p><p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#69c5b0]" />Real Estate <span className="float-right rounded bg-[#e5f1ee] px-1 text-[#527573]">30%</span></p><p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d3e8e1]" />Crypto &amp; Alt <span className="float-right rounded bg-[#f0f1ee] px-1 text-[#69706b]">15%</span></p></div></article>
            </section>
            <section id="proyectos" className="mt-5 rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-[#293a3d]">Recent Activity</h2><p className="mt-1 text-[10px] text-[#899395]">Your latest investment activity</p></div><button type="button" className="text-[10px] font-semibold text-[#006b73]">View full history</button></div><div className="mt-4 grid gap-3 text-xs sm:grid-cols-3"><p className="border-l-2 border-[#78c7b2] pl-3"><strong className="block text-[#42575a]">New investment added</strong><span className="text-[10px] text-[#899395]">GreenTech Solutions · 2 hours ago</span></p><p className="border-l-2 border-[#78c7b2] pl-3"><strong className="block text-[#42575a]">Project milestone reached</strong><span className="text-[10px] text-[#899395]">EcoMarket · Yesterday</span></p><p className="border-l-2 border-[#78c7b2] pl-3"><strong className="block text-[#42575a]">Monthly report ready</strong><span className="text-[10px] text-[#899395]">Your portfolio · 2 days ago</span></p></div></section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
