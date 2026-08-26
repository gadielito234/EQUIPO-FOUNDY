const sidebarItems = [
  { name: 'Home', icon: '⌂', active: true },
  { name: 'My projects', icon: '▣' },
  { name: 'Messages', icon: '✉' },
  { name: 'Settings', icon: '⚙' },
  { name: 'Notifications', icon: '◔' },
];
const growthData = [
  { month: 'Jan', value: 28 },
  { month: 'Feb', value: 36 },
  { month: 'Mar', value: 42 },
  { month: 'Apr', value: 58 },
  { month: 'May', value: 71 },
  { month: 'Jun', value: 86 },
];

const recentActivity = [
  { title: 'New Investment Received', detail: '$100 from Alpha Ventures', time: '13 min ago', tone: 'positive' },
  { title: 'Document Verified', detail: 'Project "VencerTech"', time: '1h ago', tone: 'neutral' },
  { title: 'New Investor Follow', detail: 'Sarah Chen followed your profile', time: '2h ago', tone: 'positive' },
];

function Sidebar({ nombreUsuario, tipoUsuario, onCerrarSesion, onOpenSettings }) {
  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#f7fafb] p-4 sm:w-64 lg:w-72">
      <div>
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-[#0f8c8d] to-[#0d5c63] font-bold text-white">F</div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Foundy</span>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d8ece8] font-bold text-[#0f6866]">{nombreUsuario.charAt(0).toUpperCase()}</div>
          <div>
            <p className="truncate text-sm font-bold text-slate-900">{nombreUsuario}</p>
            <p className="text-[10px] uppercase text-slate-500">TIPO: {tipoUsuario}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 grid gap-2" aria-label="Sidebar navigation">
        {sidebarItems.map((item) => (
          <button
            key={item.name}
            type="button"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${item.active ? 'bg-[#dff0ed] text-[#0d6865]' : 'text-slate-600 hover:bg-slate-100'}`}
            onClick={item.name === 'Settings' ? onOpenSettings : undefined}
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-base">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto grid gap-2 pt-8"><button type="button" className="rounded-xl px-3 py-3 text-left text-sm text-slate-600 hover:bg-slate-100">Support</button>
        <button type="button" className="rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-600 hover:bg-slate-100" onClick={onCerrarSesion}>
          Logout
        </button>
      </div>
    </aside>
  );
}

function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f8c8d]">Dashboard</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">Statistics</h1>
      </div>

      <div className="rounded-xl bg-white px-4 py-3 text-right shadow-sm">
        <span className="block text-xs text-slate-500">Foundy</span>
        <strong className="text-[#0f8c8d]">+12.4%</strong>
      </div>
    </header>
  );
}

function WelcomeSection({ nombreUsuario }) {
  return (
    <section className="mt-8 flex flex-col justify-between gap-6 rounded-2xl bg-linear-to-br from-[#0f6866] to-[#123e4a] p-6 text-white sm:p-8 lg:flex-row lg:items-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-100">Overview</p>
        <h2 className="mt-2 text-3xl font-bold">Welcome back, {nombreUsuario}.</h2>
        <p className="mt-2 text-sm text-teal-50">Your investments are growing strong this quarter.</p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/15 px-3 py-2">3 new investors</span>
          <span className="rounded-full bg-white/15 px-3 py-2">Portfolio growth 12% above market</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#0f6866]">Create Project</button>
          <button type="button" className="rounded-lg border border-white/40 px-4 py-2.5 text-sm font-bold text-white">View Reports</button>
        </div>
      </div>

      <div className="min-w-44 rounded-2xl border border-white/20 bg-white/10 p-5">
        <div className="inline-block rounded-full bg-[#a8dfc1] px-2 py-1 text-xs font-bold text-[#155c48]">Live</div>
        <div className="mt-5 text-3xl font-bold">$184.2K</div>
        <p className="mt-1 text-xs text-teal-50">Portfolio value</p>
      </div>
    </section>
  );
}

function SummaryCard({ title, value, status, description, progress, badge, cta }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
        </div>
        {status && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">{status}</span>}
      </div>

      {description && <p className="mt-3 text-xs text-slate-500">{description}</p>}

      {progress !== undefined && (
        <div className="mt-5">
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <span className="block h-full rounded-full bg-[#0f8c8d]" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>{badge}</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {cta && <button type="button" className="mt-5 text-xs font-bold text-[#0f6866]">{cta}</button>}
    </article>
  );
}

function GrowthStatistics() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#0f8c8d]">Growth Statistics</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">Net value</h3>
        </div>
        <span className="text-xs text-slate-500">Last 6 Months</span>
      </div>

      <div className="mt-8 flex h-52 items-end gap-3" aria-label="Monthly growth chart">
        {growthData.map((item) => (
          <div key={item.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2 text-xs text-slate-500">
            <div className="flex h-full w-full items-end"><div className="w-full rounded-t-lg bg-[#0f8c8d]" style={{ height: `${item.value}%` }} /></div>
            <span>{item.month}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentActivity() {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="font-bold text-slate-900">Recent Activity</h3>
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {recentActivity.map((item) => (
          <div key={item.title} className="flex gap-3 py-4 first:pt-0">
            <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.tone === 'positive' ? 'bg-[#0f8c8d]' : 'bg-slate-300'}`} />
            <div>
              <p className="text-sm font-semibold text-slate-800">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
              <span className="mt-1 block text-[10px] text-slate-400">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}


function Home({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome }) {
  const nombreUsuario = usuarioData?.usuario || 'Usuario';
  const tipoUsuario = usuarioData?.tipo_usuario || 'Usuario';

  return (
    <div className="flex min-h-screen flex-col bg-[#edf2f3] text-slate-800 lg:flex-row">
      <Sidebar
        nombreUsuario={nombreUsuario}
        tipoUsuario={tipoUsuario}
        onCerrarSesion={onCerrarSesion}
        onOpenSettings={onOpenSettings || onBackHome}
      />

      <div className="min-w-0 flex-1 p-5 sm:p-8">
        <DashboardHeader />

        <main>
          <WelcomeSection nombreUsuario={nombreUsuario} />

          <section className="mt-6 grid gap-5 md:grid-cols-2">
            <SummaryCard
              title="Active Investments"
              value="2 Ventures"
              status="Pending"
              description="Updated 2h ago"
            />

            <SummaryCard
              title="Profile Strength"
              value="92%"
              progress={92}
              badge="Excellent"
              cta="Finish now"
            />
          </section>

          <section className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
            <GrowthStatistics />
            <RecentActivity />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
