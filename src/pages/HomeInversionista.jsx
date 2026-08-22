import { useState } from 'react';

const sidebarItems = [
  { label: 'Home', active: true, icon: '⌂' },
  { label: 'My investments', icon: '▣' },
  { label: 'Messages', icon: '✉' },
  { label: 'Settings', icon: '⚙' },
  { label: 'Notifications', icon: '◔' },
];

const topNav = ['Dashboard', 'Statistics', 'Foundy card'];

const featuredOpportunity = {
  title: 'Jorge Aparicio | Traditional Coffee',
  location: 'Santa Ana, El Salvador',
  category: 'Agriculture',
  image: '/images/jorgeaparicio.jpeg',
  goal: '$20,000',
  spots: '12 spots avail.',
  term: '24 to 36 months',
  starts: '12/08/24',
  objective:
    'Producer of Salvadoran artisanal coffee. Looking for an investment of $20,000 to expand production, improve equipment and export their sales. Project an annual return of 8% with an estimated recovery of the investment in 24 to 36 months.',
};

const opportunities = [
  {
    title: 'Café Monte Verde',
    location: 'Santa Ana, El Salvador',
    category: 'Agriculture',
    image: '/images/Cafemonteverde.png',
    goal: '$500',
    spots: '1 spot avail.',
    term: '1 month',
    starts: '12/08/24',
    objective: 'Investment objective: Advertising and local distribution network…',
  },
  {
    title: 'Tati Pupuseria',
    location: 'Santa Tecla, El Salvador',
    category: 'Gastronomy',
    image: '/images/tatipupuseria.png',
    goal: '$300',
    spots: '2 spots avail.',
    term: '1 month',
    starts: '12/31/23',
    objective: 'Investment objective: New industrial stovetop and kitchen renovation.',
  },
  {
    title: 'Artesanías El Faro',
    location: 'La Libertad, El Salvador',
    category: 'Textiles',
    image: '/images/Artesaníaselfaro.png',
    goal: '$120',
    spots: '2 spots avail.',
    term: '2 months',
    starts: '01/15/24',
    objective: 'Investment objective: Bulk raw material purchase and online store…',
  },
  {
    title: 'Artesanías Sunshine sv',
    location: 'La Libertad, El Salvador',
    category: 'Textiles',
    image: '/images/sunshine.png',
    goal: '$200',
    spots: '1 spot avail.',
    term: '2 months',
    starts: '01/15/24',
    objective: 'Investment objective: Bulk raw material purchase and online store…',
  },
];

const investmentGrowth = [
  { month: 'Jan', value: 24 },
  { month: 'Feb', value: 34 },
  { month: 'Mar', value: 28 },
  { month: 'Apr', value: 42 },
  { month: 'May', value: 38 },
  { month: 'Jun', value: 58 },
  { month: 'Jul', value: 90 },
];

function HomeInversionista({ usuarioData, onCerrarSesion }) {
  const nombreUsuario = usuarioData?.usuario || 'David Diaz';
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOpportunities = opportunities.filter((item) => {
    if (!searchTerm.trim()) return true;
    const haystack = `${item.title} ${item.location} ${item.category} ${item.objective} ${nombreUsuario}`.toLowerCase();
    return haystack.includes(searchTerm.trim().toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#efeee7] text-[#1e4043]">
      <div className="flex min-h-screen">
        <aside className="w-[260px] border-r border-[#d9d3c7] bg-[#f5f2eb] p-5">
          <div className="mb-7 border-b border-[#0b5d61]/70 pb-4">
            <div className="flex items-center justify-center">
              <img
                src="/images/foundy-negro.png"
                alt="Foundy"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 overflow-hidden rounded-full border-[3px] border-[#1b4a4d] shadow-lg ring-1 ring-[#dfece4]">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                alt="Perfil"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-[#e7e0d5] px-3 py-2 text-center text-sm font-medium text-[#213e42] shadow-sm">
            <span className="text-base">◔</span>
            <span>{nombreUsuario}</span>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map(({ label, active, icon }) => (
              <button
                key={label}
                type="button"
                className={[
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition',
                  active ? 'bg-[#e8ebea] text-[#1b4550] shadow-sm' : 'text-[#4d5f61] hover:bg-[#ecf1ee]',
                ].join(' ')}
              >
                <span className="flex h-5 w-5 items-center justify-center text-base">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-4 space-y-2 border-t border-[#d9d3c7] pt-4">
            <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#4d5f61] transition hover:bg-[#ecf1ee]">
              <span className="flex h-5 w-5 items-center justify-center text-base">?</span>
              <span>Support</span>
            </button>
            <button
              type="button"
              onClick={onCerrarSesion}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#4d5f61] transition hover:bg-[#ecf1ee]"
            >
              <span className="flex h-5 w-5 items-center justify-center text-base">↩</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b-[3px] border-[#0b5d61] bg-[#f5f2eb] px-6 py-4">
            <div className="flex items-center justify-between">
              <img
                src="/images/foundy-negro.png"
                alt="Foundy"
                className="h-10 w-auto object-contain"
              />

            <nav className="flex items-center gap-8 text-sm font-medium text-[#506466]">
              {topNav.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={[
                    'relative pb-1',
                    index === 0 ? 'border-b-2 border-[#0d5d61] text-[#0d5d61]' : 'hover:text-[#0d5d61]',
                  ].join(' ')}
                >
                  {item}
                </button>
              ))}
            </nav>

              <div className="flex items-center justify-end">
                <div className="flex items-center gap-2 rounded-full border border-[#c9d1ce] bg-[#f0f3f0] px-3 py-2 text-sm text-[#5f7274] shadow-sm">
                  <span>⌕</span>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-24 border-0 bg-transparent text-sm text-[#485d60] outline-none placeholder:text-[#7a8a8b]"
                    aria-label="Buscar inversionista u oportunidad"
                  />
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 py-5 sm:px-5 lg:px-6 xl:px-8">
            <section className="overflow-hidden rounded-[28px] bg-[#0b5d61] px-4 py-5 text-white shadow-[0_18px_36px_rgba(11,93,97,0.15)] sm:px-6 lg:px-7">
              <div className="grid items-center gap-6 lg:grid-cols-[0.72fr_1.28fr]">
                <div className="relative mx-auto flex w-full max-w-[260px] items-center justify-center lg:mx-0 lg:max-w-none">
                  <button
                    type="button"
                    className="absolute left-[-12px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d5e5e3] bg-[#ebf4f4] text-xl text-[#1d4b4c] shadow-sm"
                    aria-label="Anterior"
                  >
                    ‹
                  </button>
                  <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full border-[5px] border-[#dff1ed] bg-[#e5f3f0] shadow-[0_12px_25px_rgba(0,0,0,0.15)] sm:h-[220px] sm:w-[220px]">
                    <img
                      src="/images/jorgeaparicio.jpeg"
                      alt="Jorge Aparicio"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute right-[-12px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d5e5e3] bg-[#ebf4f4] text-xl text-[#1d4b4c] shadow-sm"
                    aria-label="Siguiente"
                  >
                    ›
                  </button>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium uppercase tracking-[0.14em] text-[#d4efee]">
                    Featured opportunity
                  </p>

                  <h1 className="text-[1.9rem] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[2.2rem]">
                    {featuredOpportunity.title}
                  </h1>

                  <p className="mt-3 max-w-[620px] text-sm leading-7 text-[#d5efee] sm:text-[1.05rem]">
                    {featuredOpportunity.objective}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-white/10 bg-[#1b8c8d]/20 px-3 py-3 text-center">
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-[#d4efee]">Goal</p>
                      <p className="mt-2 text-xl font-bold sm:text-2xl">$350</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#1b8c8d]/20 px-3 py-3 text-center">
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-[#d4efee]">Growth</p>
                      <p className="mt-2 text-base font-bold sm:text-xl">+12%</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#1b8c8d]/20 px-3 py-3 text-center">
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-[#d4efee]">Term</p>
                      <p className="mt-2 text-base font-bold sm:text-xl">2 months</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#1b8c8d]/20 px-3 py-3 text-center">
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-[#d4efee]">Investors</p>
                      <p className="mt-2 text-base font-bold sm:text-xl">2/3</p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm text-[#d5efee]">
                    <span>Confidence percentage</span>
                    <span className="font-semibold">70%</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#0a4d4f]/40">
                    <div className="h-full w-[70%] rounded-full bg-[#8ed0ae]" />
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      className="rounded-xl bg-[#dfece4] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#0d5d61] transition hover:bg-[#eff7f1] sm:text-base"
                    >
                      Invest now
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-white/30 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/10 sm:text-base"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-[#1d3f42] sm:text-[2.1rem]">
                  Browse Opportunities
                </h2>
                <button type="button" className="text-base font-medium text-[#1d4b4c] hover:text-[#0d5d61]">
                  View all →
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {filteredOpportunities.length === 0 ? (
                  <div className="md:col-span-2 xl:col-span-4 rounded-[24px] border border-dashed border-[#cbd4d3] bg-[#f6f2eb] p-6 text-center text-[#446062]">
                    No se encontraron resultados para “{searchTerm}”.
                  </div>
                ) : (
                  filteredOpportunities.map((item) => (
                    <article key={item.title} className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-[24px] border border-[#d7d0c4] bg-[#f8f4ef] shadow-sm">
                    <div className="relative">
                      <img src={item.image} alt={item.title} className="h-[200px] w-full object-cover sm:h-[220px]" />
                      <span className="absolute left-4 top-4 rounded-full bg-[#edf5f2] px-3 py-1 text-xs font-medium text-[#1d4b4c] shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="min-h-[52px] text-[1.5rem] font-semibold leading-tight tracking-[-0.04em] text-[#1d3f42] sm:text-[1.75rem]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-base text-[#5f7274]">{item.location}</p>

                      <p className="mt-4 flex-1 text-[0.95rem] leading-6 text-[#5d6d6d]">{item.objective}</p>

                        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[#415a5d]">
                          <div className="rounded-lg border border-[#dfe6e2] bg-[#f3f5f4] px-2 py-2">
                            <p className="text-[0.68rem] uppercase tracking-[0.08em] text-[#647a7b]">Goal</p>
                            <p className="mt-1 font-semibold text-[#1f4043]">{item.goal}</p>
                          </div>
                          <div className="rounded-lg border border-[#dfe6e2] bg-[#f3f5f4] px-2 py-2">
                            <p className="text-[0.68rem] uppercase tracking-[0.08em] text-[#647a7b]">Spots</p>
                            <p className="mt-1 font-semibold text-[#1f4043]">{item.spots}</p>
                          </div>
                          <div className="rounded-lg border border-[#dfe6e2] bg-[#f3f5f4] px-2 py-2">
                            <p className="text-[0.68rem] uppercase tracking-[0.08em] text-[#647a7b]">Term</p>
                            <p className="mt-1 font-semibold text-[#1f4043]">{item.term}</p>
                          </div>
                          <div className="rounded-lg border border-[#dfe6e2] bg-[#f3f5f4] px-2 py-2">
                            <p className="text-[0.68rem] uppercase tracking-[0.08em] text-[#647a7b]">Starts</p>
                            <p className="mt-1 font-semibold text-[#1f4043]">{item.starts}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="mt-5 w-full rounded-xl bg-[#0b5d61] px-4 py-3 text-base font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#0a4d50]"
                        >
                          Invest
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>

            <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.4fr_0.9fr]">
              <div className="rounded-[22px] border border-[#d9d3c7] bg-[#edf3f2] p-5 shadow-sm">
                <div className="rounded-[16px] border border-[#d7d0c4] bg-[#f6f1ea] p-3">
                  <div className="flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#4f6365]">
                    <span>Active</span>
                    <span>70%</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#0a4d4f]/40">
                    <div className="h-full w-[70%] rounded-full bg-[#8ed0ae]" />
                  </div>
                </div>
                <h3 className="mt-4 text-[1rem] font-semibold text-[#1d3f42]">Active Projects</h3>
                <p className="mt-4 text-[2.7rem] font-semibold leading-none text-[#1d3f42] sm:text-[3rem]">6</p>
                <p className="mt-3 text-base text-[#5d6d6d]">Next payout: “Aug 15”</p>
              </div>

              <div className="rounded-[22px] border border-[#d9d3c7] bg-[#f5f2eb] p-5 shadow-sm">
                <h3 className="text-[1rem] font-semibold text-[#1d3f42]">Investment Growth</h3>
                <div className="mt-5 flex h-32 items-end gap-3">
                  {investmentGrowth.map(({ value, month }, index) => (
                    <div key={month} className="flex flex-1 flex-col items-center justify-end">
                      <div
                        className={`w-full rounded-t-[8px] ${index === investmentGrowth.length - 1 ? 'bg-[#0b5d61]' : 'bg-[#dfeef2]'}`}
                        style={{ height: `${value}%` }}
                        aria-label={`${month}: ${value}%`}
                        title={`${month}: ${value}%`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-[0.75rem] text-[#5d6d6d] sm:text-xs">
                  {investmentGrowth.map(({ month }) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-[22px] bg-[#0b5d61] p-5 text-white shadow-[0_18px_36px_rgba(11,93,97,0.15)]">
                <p className="text-[0.85rem] uppercase tracking-[0.12em] text-[#dfeef1]">Total Invested</p>
                <p className="mt-5 text-[2.5rem] font-semibold leading-none sm:text-[3rem]">$500.000</p>
                <p className="mt-3 flex items-center gap-2 text-lg text-[#dfeef1]">
                  <span>↗</span>
                  <span>+12.5% this year</span>
                </p>
              </div>
            </section>

          </div>
        </main>
      </div>

      <footer className="w-full bg-[#006b70] text-white">
        <div className="mx-auto grid w-full max-w-none gap-8 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-12">
          <div className="sm:col-span-2">
            <img
              src="/images/foundy-negro.png"
              alt="Foundy"
              className="h-10 w-auto object-contain"
            />
            <p className="mt-4 max-w-sm text-sm leading-6 text-teal-100">
              Conectamos ideas, emprendedores e inversionistas para construir nuevas oportunidades en El Salvador.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Explora</h2>
            <div className="mt-4 space-y-3 text-sm text-teal-100">
              <a href="#" className="block hover:text-white">Home</a>
              <a href="#" className="block hover:text-white">My investments</a>
              <a href="#" className="block hover:text-white">Messages</a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Cuenta</h2>
            <div className="mt-4 space-y-3 text-sm text-teal-100">
              <button type="button" className="block hover:text-white">Sign in</button>
              <button type="button" className="block hover:text-white">Sign up</button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 px-6 py-5 text-center text-xs text-teal-100 sm:px-10">
          © 2026 Foundy. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default HomeInversionista;

