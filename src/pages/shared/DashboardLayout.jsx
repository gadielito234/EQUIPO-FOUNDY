import { useEffect, useState } from 'react';
import {
  Bell,
  CircleHelp,
  FolderKanban,
  Home,
  LogOut,
  MessageSquareText,
  Search,
  Settings,
  Wallet,
  X,
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

const investorSidebarItems = [
  { label: 'Home', icon: Home, key: 'home' },
  { label: 'My investments', icon: Wallet, key: 'investments' },
  { label: 'Messages', icon: MessageSquareText, key: 'messages' },
  { label: 'Settings', icon: Settings, key: 'settings' },
  { label: 'Notifications', icon: Bell, key: 'notifications' },
];

export default function DashboardLayout({
  children,
  usuarioData,
  onCerrarSesion,
  onBackHome,
  onOpenSettings,
  onOpenChat,
  onOpenProjects,
  onOpenFoundyCard,
  onOpenStatistics,
  onOpenInvestments,
  onOpenNotifications,
  onOpenSupport,
  onOpenInvestorProfile,
  investorMode = false,
  activeNav = 'dashboard',
  sidebarItems = defaultSidebarItems,
  topNav = defaultTopNav,
  searchPlaceholder = 'Search',
  showSearch = true,
  showStatistics = true,
  footerContent,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const nombreUsuario = usuarioData?.usuario || 'Usuario';
  const visibleTopNav = topNav.filter(({ key }) => showStatistics || key !== 'statistics');
  const visibleSidebarItems = investorMode ? investorSidebarItems : sidebarItems;
  const searchOptions = [
    ...visibleTopNav,
    ...visibleSidebarItems,
    { label: 'Support', key: 'support' },
  ].filter((item, index, items) => items.findIndex((candidate) => candidate.key === item.key) === index);
  const searchResults = searchOptions.filter((item) => item.label.toLowerCase().includes(searchTerm.trim().toLowerCase())).slice(0, 5);

  const handleSidebarAction = (label) => {
    if (label === 'Home') onBackHome?.();
    if (label === 'My projects') onOpenProjects?.();
    if (label === 'My investments') onOpenInvestments?.();
    if (label === 'Messages') onOpenChat?.();
    if (label === 'Settings') onOpenSettings?.();
    if (label === 'Notifications') onOpenNotifications?.();
  };

  const handleTopNavAction = (label) => {
    if (label === 'Dashboard') onBackHome?.();
    if (label === 'Statistics') onOpenStatistics?.();
    if (label === 'Foundy card') onOpenFoundyCard?.();
  };

  const handleSearchAction = (key) => {
    setSearchTerm('');
    if (key === 'dashboard' || key === 'home') onBackHome?.();
    if (key === 'statistics') onOpenStatistics?.();
    if (key === 'foundy-card') onOpenFoundyCard?.();
    if (key === 'projects') onOpenProjects?.();
    if (key === 'investments') onOpenInvestments?.();
    if (key === 'messages') onOpenChat?.();
    if (key === 'settings') onOpenSettings?.();
    if (key === 'notifications') onOpenNotifications?.();
    if (key === 'support') onOpenSupport?.();
  };

  useEffect(() => {
    if (!logoutConfirmOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setLogoutConfirmOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [logoutConfirmOpen]);

  const handleLogout = () => setLogoutConfirmOpen(true);

  const confirmLogout = () => {
    setLogoutConfirmOpen(false);
    onCerrarSesion?.();
  };

  return (
    <div className="min-h-screen bg-[#efeee7] text-[#1e4043]">
      <div className="flex min-h-screen w-full flex-col bg-[#f7f3ee]">
        <div className="flex min-h-0 flex-1">
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

          <button
            type="button"
            onClick={onOpenInvestorProfile || onBackHome}
            className="mb-6 flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-[#f1ece4] px-2 py-2.5 text-left transition-all duration-300 hover:bg-[#ede5dc]"
          >
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-[2px] border-[#1b4a4d] shadow-sm">
              <img
                src={usuarioData?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'}
                alt="Profile"
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
          </button>

          <nav className="space-y-2">
            {visibleSidebarItems.map(({ label, icon: Icon, key }) => {
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
              onClick={onOpenSupport}
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
              onClick={handleLogout}
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
                <div className="relative flex items-center justify-end">
                  <div className="flex items-center gap-2 rounded-full border border-[#c9d1ce] bg-[#f0f3f0] px-3 py-2 text-sm text-[#5f7274] shadow-sm focus-within:border-[#0b817d] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0b817d]/15">
                    <Search className="h-4 w-4" />
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && searchResults[0]) handleSearchAction(searchResults[0].key);
                        if (event.key === 'Escape') setSearchTerm('');
                      }}
                      type="text"
                      placeholder={searchPlaceholder}
                      className="w-28 border-0 bg-transparent text-sm text-[#485d60] outline-none placeholder:text-[#7a8a8b] sm:w-40"
                      aria-label="Search"
                    />
                  </div>
                  {searchTerm.trim() && (
                    <div className="absolute right-0 top-12 z-40 w-56 overflow-hidden rounded-2xl border border-[#dfe5df] bg-white p-1.5 shadow-[0_18px_40px_rgba(24,63,67,0.16)]">
                      {searchResults.length > 0 ? searchResults.map((result) => (
                        <button
                          key={result.key}
                          type="button"
                          onClick={() => handleSearchAction(result.key)}
                          className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm text-[#4f5d5f] transition hover:bg-[#eef5f2] hover:text-[#0b5d61]"
                        >
                          {result.label}
                        </button>
                      )) : <p className="px-3 py-3 text-xs text-[#718083]">No sections found.</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          <div className="min-w-0 px-0 py-0">{children}</div>

          </main>
        </div>

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
      </div>

      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#173f43]/45 px-4 py-6 backdrop-blur-[2px]" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setLogoutConfirmOpen(false);
        }}>
          <div className="w-full max-w-md rounded-[24px] border border-white/70 bg-[#fbfaf6] p-6 shadow-[0_24px_70px_rgba(17,52,60,0.24)]" role="dialog" aria-modal="true" aria-labelledby="logout-title" aria-describedby="logout-description">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fce9df] text-[#b85c3d]">
                  <LogOut size={19} />
                </div>
                <div>
                  <h2 id="logout-title" className="text-lg font-bold text-[#1d3f42]">Log out of Foundy?</h2>
                  <p id="logout-description" className="mt-1 text-sm leading-5 text-[#687577]">You will need to sign in again to access your account.</p>
                </div>
              </div>
              <button type="button" onClick={() => setLogoutConfirmOpen(false)} className="rounded-full p-1.5 text-[#718083] transition hover:bg-[#eef1ef] hover:text-[#29494c]" aria-label="Close logout confirmation">
                <X size={18} />
              </button>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" autoFocus onClick={() => setLogoutConfirmOpen(false)} className="rounded-xl border border-[#ccd8d5] px-4 py-2.5 text-xs font-semibold text-[#526164] transition hover:bg-[#f0f3f0]">Cancel</button>
              <button type="button" onClick={confirmLogout} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b85c3d] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#98472f]"><LogOut size={14} /> Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
