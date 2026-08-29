function Statistics({ usuarioData }) {
  const nombreUsuario = usuarioData?.usuario || 'usuario';
  const inicial = nombreUsuario.charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-12">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#004e56]">My Statistics</h1>
          <p className="mt-1 max-w-lg text-xs leading-5 text-[#687577]">
            Track your progress and get insights into your performance.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <button type="button" className="rounded-md border border-[#cbd7d7] bg-white px-3 py-2 text-[11px] font-medium text-[#506063]">
            This week ▾
          </button>
          <button type="button" className="rounded-md bg-[#006b73] px-3 py-2 text-[11px] font-semibold text-white shadow-sm">
            Export report
          </button>
        </div>
      </section>

      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        <article className="rounded-lg border border-[#e8eeee] bg-[#146f78] p-4 text-white shadow-[0_8px_18px_rgba(0,90,95,0.12)]">
          <p className="text-[11px] text-[#d8f2ee]">Total Investment</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">$12,450.00</p>
          <p className="mt-2 text-[10px] font-semibold text-[#c0e9df]">↗ 12.5% vs last month</p>
        </article>

        <article className="rounded-lg border border-[#e8eeee] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <p className="text-[11px] text-[#7d898b]">Avg. Annual ROI</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#279578]">18.2%</p>
          <p className="mt-2 text-[10px] font-semibold text-[#2c8068]">↗ 4.8% vs last month</p>
        </article>

        <article className="rounded-lg border border-[#d9eee8] bg-[#e4f3ef] p-4">
          <p className="text-[11px] text-[#527573]">Active Projects</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#32977d]">07</p>
          <p className="mt-2 text-[10px] font-semibold text-[#2c8068]">↗ 2 new this month</p>
        </article>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(220px,0.8fr)]">
        <article className="rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#293a3d]">Portfolio Growth</h2>
              <p className="mt-1 text-[10px] text-[#899395]">Your investment growth over time</p>
            </div>
            <div className="flex gap-1 rounded border border-[#e0e7e7] p-1 text-[8px] text-[#617173]">
              <button type="button" className="rounded bg-[#e6f1f0] px-2 py-1 font-semibold text-[#006b73]">6 MONTHS</button>
              <button type="button" className="px-2 py-1">1 YEAR</button>
              <button type="button" className="px-2 py-1">ALL</button>
            </div>
          </div>

          <div className="relative mt-8 h-40 border-b border-[#e4e9e9] bg-[linear-gradient(to_bottom,transparent_24%,#edf2f2_25%,transparent_26%,transparent_49%,#edf2f2_50%,transparent_51%,transparent_74%,#edf2f2_75%,transparent_76%)]">
            <svg viewBox="0 0 396 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label="Crecimiento del portafolio durante el año">
              <path d="M0 126 C38 123 64 121 88 113 S132 110 154 101 S188 109 210 91 S244 95 264 65 S295 88 308 40 S346 59 374 51 S389 36 396 34 L396 140 L0 140 Z" fill="url(#growthFill)" />
              <path d="M0 126 C38 123 64 121 88 113 S132 110 154 101 S188 109 210 91 S244 95 264 65 S295 88 308 40 S346 59 374 51 S389 36 396 34" fill="none" stroke="#138b88" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <defs>
                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#65bcb2" stopOpacity="0.27" />
                  <stop offset="100%" stopColor="#65bcb2" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <circle cx="308" cy="40" r="3.5" fill="#fff" stroke="#138b88" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <div className="mt-2 flex justify-between px-1 text-[9px] text-[#899395]">
            <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span>
          </div>
        </article>

        <article className="rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <h2 className="text-sm font-semibold text-[#293a3d]">Distribution</h2>
          <p className="mt-1 text-[10px] text-[#899395]">By project category</p>
          <div className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#146f78 0 55%, #69c5b0 55% 85%, #d3e8e1 85% 100%)' }}>
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
              <strong className="block text-2xl text-[#006b73]">07</strong>
              <span className="text-[9px] text-[#7b888a]">ACTIVE PROJECTS</span>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-[10px] text-[#586668]">
            <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#146f78]" />Equity &amp; Tech <span className="float-right rounded bg-[#e5f1ee] px-1 text-[#527573]">55%</span></p>
            <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#69c5b0]" />Real Estate <span className="float-right rounded bg-[#e5f1ee] px-1 text-[#527573]">30%</span></p>
            <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d3e8e1]" />Crypto &amp; Alt <span className="float-right rounded bg-[#f0f1ee] px-1 text-[#69706b]">15%</span></p>
          </div>
        </article>
      </section>

      <section className="mt-5 rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#293a3d]">Recent Activity</h2>
            <p className="mt-1 text-[10px] text-[#899395]">Your latest investment activity</p>
          </div>
          <button type="button" className="text-[10px] font-semibold text-[#006b73]">View full history</button>
        </div>

        <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
          <p className="border-l-2 border-[#78c7b2] pl-3">
            <strong className="block text-[#42575a]">New investment added</strong>
            <span className="text-[10px] text-[#899395]">GreenTech Solutions · 2 hours ago</span>
          </p>
          <p className="border-l-2 border-[#78c7b2] pl-3">
            <strong className="block text-[#42575a]">Project milestone reached</strong>
            <span className="text-[10px] text-[#899395]">EcoMarket · Yesterday</span>
          </p>
          <p className="border-l-2 border-[#78c7b2] pl-3">
            <strong className="block text-[#42575a]">Monthly report ready</strong>
            <span className="text-[10px] text-[#899395]">Your portfolio · 2 days ago</span>
          </p>
        </div>
      </section>

      <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-[#dfe7e7] bg-[#f4f7f6] p-4 text-sm text-[#4d6468]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b7d7d3] bg-[#dfeef0] text-lg font-bold text-[#006b73]">{inicial}</div>
        <span>Hola, {nombreUsuario}</span>
      </div>
    </div>
  );
}

export default Statistics;
