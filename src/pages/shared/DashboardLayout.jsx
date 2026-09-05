import { useState } from 'react';
import {
  Bell,
  CircleHelp,
  FolderKanban,
  Home,
  LogOut,
  MessageSquareText,
  Search,
  Settings,
} from 'lucide-react';

const defaultSidebarItems = [
  { label: 'Home', icon: Home, key: 'home' },
  { label: 'My projects', icon: FolderKanban, key: 'projects' },
  { label: 'Messages', icon: MessageSquareText, key: 'messages' },
  { label: 'Settings', icon: Settings, key: 'settings' },
  { label: 'Notifications', icon: Bell, key: 'notifications' },
];

const defaultTopNav = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Statistics', key: 'statistics' },
  { label: 'Foundy card', key: 'foundy-card' },
];

export default function DashboardLayout({
  children,
  usuarioData,
  onCerrarSesion,
  onBackHome,
  onOpenSettings,
  onOpenChat,
  onOpenFoundyCard,
  activeNav = 'dashboard',
  sidebarItems = defaultSidebarItems,
  topNav = defaultTopNav,
  searchPlaceholder = 'Buscar',
  showSearch = true,
  showStatistics = true,
  footerContent,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const nombreUsuario = usuarioData?.usuario || 'Usuario';
  const visibleTopNav = topNav.filter(({ key }) => showStatistics || key !== 'statistics');

  const handleSidebarAction = (label) => {
    if (label === 'Home') onBackHome?.();
    if (label === 'Messages') onOpenChat?.();
    if (label === 'Settings') onOpenSettings?.();
  };

  const handleTopNavAction = (label) => {
    if (label === 'Dashboard' || label === 'Statistics') onBackHome?.();
    if (label === 'Foundy card') onOpenFoundyCard?.();
  };

  return (
    <div className="min-h-screen bg-[#efeee7] text-[#1e4043]">
      <div className="flex min-h-screen w-full bg-[#f7f3ee]">
        <aside
          className={[
            'group relative border-r border-[#e9e2d8] bg-[#f8f4ef] px-3 py-5 transition-all duration-300 ease-in-out',
            sidebarOpen ? 'w-64' : 'w-[88px]',
          ].join(' ')}
          onMouseEnter={() => setSidebarOpen(true)}
          onMouseLeave={() => setSidebarOpen(false)}
        >
          <div className="mb-7 flex items-center justify-center border-b border-[#e3ddd2] pb-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((value) => !value)}
              className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-[#efeae2]"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <img
                src="/images/foundy-negro.png"
                alt="Foundy"
                className="h-8 w-auto object-contain"
              />
            </button>
          </div>

          <div className="mb-6 flex items-center gap-3 overflow-hidden rounded-2xl bg-[#f1ece4] px-2 py-2.5 transition-all duration-300">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-[2px] border-[#1b4a4d] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                alt="Perfil"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className={[
                'transition-all duration-300',
                sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0',
              ].join(' ')}
            >
              <p className="text-sm font-semibold text-[#1f4043]">{nombreUsuario}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#6b7a7c]">Online</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map(({ label, icon: Icon, key }) => {
              const isActive = activeNav === key || (key === 'home' && activeNav === 'dashboard');

              return (
                <button
                  key={key || label}
                  type="button"
                  onClick={() => handleSidebarAction(label)}
                  className={[
                    'group flex w-full items-center rounded-xl px-2 py-2.5 text-left text-sm transition-all duration-200',
                    isActive ? 'bg-[#0b5d61] text-white shadow-sm' : 'text-[#4f5d5f] hover:bg-[#efeae2] hover:text-[#183f43]',
                    sidebarOpen ? 'justify-start gap-3' : 'justify-center gap-0',
                  ].join(' ')}
                  title={label}
                  style={{ minHeight: '42px' }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base font-bold leading-none">
                    <Icon className="h-4 w-4 stroke-[2.2]" />
                  </span>
                  <span
                    className={[
                      'whitespace-nowrap transition-all duration-300',
                      sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                    ].join(' ')}
                    style={{ display: sidebarOpen ? 'inline' : 'none' }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-5 space-y-2 border-t border-[#e3ddd2] pt-4">
            <button
              type="button"
              className={[
                'flex w-full items-center rounded-xl px-2 py-2.5 text-left text-sm text-[#4f5d5f] transition hover:bg-[#efeae2] hover:text-[#183f43]',
                sidebarOpen ? 'justify-start gap-3' : 'justify-center gap-0',
              ].join(' ')}
              title="Support"
              style={{ minHeight: '42px' }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base font-bold leading-none">
                <CircleHelp className="h-4 w-4 stroke-[2.2]" />
              </span>
              <span
                className={[
                  'whitespace-nowrap transition-all duration-300',
                  sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                ].join(' ')}
                style={{ display: sidebarOpen ? 'inline' : 'none' }}
              >
                Support
              </span>
            </button>
            <button
              type="button"
              onClick={onCerrarSesion}
              className={[
                'flex w-full items-center rounded-xl px-2 py-2.5 text-left text-sm text-[#4f5d5f] transition hover:bg-[#efeae2] hover:text-[#183f43]',
                sidebarOpen ? 'justify-start gap-3' : 'justify-center gap-0',
              ].join(' ')}
              title="Logout"
              style={{ minHeight: '42px' }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base font-bold leading-none">
                <LogOut className="h-4 w-4 stroke-[2.2]" />
              </span>
              <span
                className={[
                  'whitespace-nowrap transition-all duration-300',
                  sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                ].join(' ')}
                style={{ display: sidebarOpen ? 'inline' : 'none' }}
              >
                Logout
              </span>
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b-[3px] border-[#0b5d61] bg-[#f5f2eb] px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <nav className="flex items-center gap-8 text-sm font-medium text-[#506466]">
                {visibleTopNav.map(({ label, key }) => (
                  <button
                    key={key || label}
                    type="button"
                    onClick={() => handleTopNavAction(label)}
                    className={[
                      'relative pb-1',
                      activeNav === key ? 'border-b-2 border-[#0d5d61] text-[#0d5d61]' : 'hover:text-[#0d5d61]',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              {showSearch && (
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-2 rounded-full border border-[#c9d1ce] bg-[#f0f3f0] px-3 py-2 text-sm text-[#5f7274] shadow-sm">
                    <Search className="h-4 w-4" />
                    <input
                      type="text"
                      placeholder={searchPlaceholder}
                      className="w-24 border-0 bg-transparent text-sm text-[#485d60] outline-none placeholder:text-[#7a8a8b]"
                      aria-label="Buscar"
                    />
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="px-4 py-5 sm:px-5 lg:px-6 xl:px-8">{children}</div>

          <footer className="w-full bg-[#006b70] text-white">
            {footerContent || (
              <>
                <div className="mx-auto grid w-full max-w-none gap-8 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-12">
                  <div className="sm:col-span-2">
                    <img src="/images/foundy-negro.png" alt="Foundy" className="h-10 w-auto object-contain" />
                    <p className="mt-4 max-w-sm text-sm leading-6 text-teal-100">
                      Conectamos ideas, emprendedores e inversionistas para construir nuevas oportunidades en El Salvador.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Explora</h2>
                    <div className="mt-4 space-y-3 text-sm text-teal-100">
                      <button type="button" className="block hover:text-white">Home</button>
                      <button type="button" className="block hover:text-white">My investments</button>
                      <button type="button" className="block hover:text-white">Messages</button>
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
              </>
            )}
          </footer>
        </main>
      </div>
    </div>
  );
}
