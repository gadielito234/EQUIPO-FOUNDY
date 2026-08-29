import { useState } from 'react';

const menuItems = [
  { label: 'Home', icon: '⌂' },
  { label: 'My investments', icon: '▣' },
  { label: 'Messages', icon: '▱' },
  { label: 'Settings', icon: '⚙' },
  { label: 'Notifications', icon: '♧' },
];

// Datos de ejemplo — reemplazar con datos reales desde Supabase (tabla de proyectos/negocios)
const oportunidades = [
  {
    id: 1,
    nombre: 'GreenTech Solutions',
    categoria: 'Sostenibilidad',
    descripcion: 'Plataforma de energía solar para pequeñas empresas, con retorno proyectado a 18 meses.',
    montoBuscado: '$25,000.00',
    imagen: null, // agregar URL cuando exista imagen real
  },
  {
    id: 2,
    nombre: 'EcoMarket',
    categoria: 'Retail sostenible',
    descripcion: 'Marketplace de productos orgánicos locales, con red de distribución ya establecida.',
    montoBuscado: '$15,000.00',
    imagen: null,
  },
  {
    id: 3,
    nombre: 'FinTrack App',
    categoria: 'Tecnología financiera',
    descripcion: 'App de gestión de finanzas personales con más de 3,000 usuarios activos mensuales.',
    montoBuscado: '$40,000.00',
    imagen: null,
  },
];

function OportunidadesInversion({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome, onOpenChat, onOpenFoundyCard, onVerDetalle }) {
  const nombreUsuario = usuarioData?.usuario || 'usuario';
  const [menuAbierto, setMenuAbierto] = useState(true);

  return (
    <div className="min-h-screen bg-[#f4f6f7] text-[#31474a]">
      <div className="flex min-h-screen">
        {menuAbierto && (
          <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-[#dfe5e5] bg-[#f8faf9] px-4 py-5 shadow-sm lg:static lg:shadow-none" aria-label="Menú principal">
            <div className="flex items-center justify-between border-b border-[#e1e6e6] pb-5">
              <img src="/images/foundy-logo.png" alt="Foundy" className="mx-auto h-8 w-auto object-contain brightness-0 opacity-75" />
            </div>
            <div className="border-b border-[#e1e6e6] py-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#006b73] bg-[#d6e7e6] text-xl text-[#006b73]">
                {nombreUsuario.charAt(0).toUpperCase()}
              </div>
              <p className="mt-2 text-xs font-semibold text-[#27383a]">{nombreUsuario}</p>
              <span className="mt-1 inline-block rounded bg-[#dfe6e6] px-2 py-0.5 text-[10px] text-[#637173]">Inversionista</span>
            </div>
            <nav className="mt-5 flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={
                    item.label === 'Home'
                      ? onBackHome
                      : item.label === 'Messages'
                      ? onOpenChat
                      : item.label === 'Settings'
                      ? onOpenSettings
                      : undefined
                  }
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-[#526164] transition hover:bg-[#e8f0f0] hover:text-[#006b73]"
                >
                  <span className="w-4 text-center text-base leading-none" aria-hidden="true">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-1.5 border-t border-[#e1e6e6] pt-4">
              <button type="button" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-[#526164] hover:bg-[#e8f0f0] hover:text-[#006b73]">
                <span className="w-4 text-center text-base">?</span>Support
              </button>
              <button type="button" onClick={onCerrarSesion} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-[#526164] hover:bg-[#e8f0f0] hover:text-[#006b73]">
                <span className="w-4 text-center text-base">↪</span>Logout
              </button>
            </div>
          </aside>
        )}

        <div className="min-w-0 flex-1">
          <header className="relative z-40 flex h-[4.5rem] items-center justify-between border-b border-[#dfe5e5] bg-[#f8faf9] px-6 sm:px-10">
            <div className="flex h-full items-center gap-5 sm:gap-12">
              <button
                type="button"
                onClick={() => setMenuAbierto((abierto) => !abierto)}
                className="text-lg text-[#006b73]"
                aria-label={menuAbierto ? 'Ocultar menú' : 'Mostrar menú'}
                aria-expanded={menuAbierto}
              >
                ☰
              </button>
              <nav className="hidden h-full items-center gap-7 text-[11px] sm:flex" aria-label="Secciones">
                <button type="button" onClick={onBackHome} className="border-b-2 border-[#006b73] py-[1.62rem] font-semibold text-[#006b73]">Dashboard</button>
                <button type="button" onClick={onOpenFoundyCard} className="text-[#758082] hover:text-[#006b73]">Foundy card</button>
              </nav>
            </div>
            <label className="flex h-8 w-36 items-center gap-2 rounded-full border border-[#dce2e2] bg-[#eef2f2] px-3 text-[#899496] sm:w-44">
              <span aria-hidden="true">⌕</span>
              <input type="search" placeholder="Buscar" className="w-full bg-transparent text-xs outline-none placeholder:text-[#899496]" />
            </label>
          </header>

          <main id="oportunidades" className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-12">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#004e56]">Investment Opportunities</h1>
                <p className="mt-1 max-w-lg text-xs leading-5 text-[#687577]">Explore businesses actively looking for investment.</p>
              </div>
            </section>

            <section className="mt-7 flex flex-col gap-5">
              {oportunidades.map((negocio) => (
                <article
                  key={negocio.id}
                  className="flex flex-col gap-4 rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center"
                >
                  <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-md bg-[#e4f3ef] sm:h-28 sm:w-44">
                    {negocio.imagen ? (
                      <img src={negocio.imagen} alt={negocio.nombre} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-[#8bb5ae]">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <span className="inline-block rounded bg-[#e5f1ee] px-2 py-0.5 text-[9px] font-semibold text-[#279578]">
                      {negocio.categoria}
                    </span>
                    <h2 className="mt-2 text-sm font-semibold text-[#293a3d]">{negocio.nombre}</h2>
                    <p className="mt-1 text-xs leading-5 text-[#687577]">{negocio.descripcion}</p>
                    <p className="mt-3 text-[11px] text-[#899395]">
                      Funding goal <span className="font-semibold text-[#146f78]">{negocio.montoBuscado}</span>
                    </p>
                  </div>

                  <div className="shrink-0 sm:self-center">
                    <button
                      type="button"
                      onClick={() => onVerDetalle?.(negocio)}
                      className="w-full rounded-full bg-[#006b73] px-5 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#005159] sm:w-auto"
                    >
                      Ver más
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default OportunidadesInversion;