import { useEffect, useState } from 'react';
import {
  Bell,
  CircleHelp,
  FolderKanban,
  Home,
  LogOut,
  Menu,
  MessageSquareText,
  Search,
  Settings,
  Wallet,
  X,
} from 'lucide-react';
import { useLanguage } from '../../components/LanguageContext.jsx';

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
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
  const searchResults = searchOptions.filter((item) => t(item.label).toLowerCase().includes(searchTerm.trim().toLowerCase())).slice(0, 5);

  const handleSidebarAction = (label) => {
    if (label === 'Home') onBackHome?.();
    if (label === 'My projects') onOpenProjects?.();
    if (label === 'My investments') onOpenInvestments?.();
    if (label === 'Messages') onOpenChat?.();
    if (label === 'Settings') onOpenSettings?.();
    if (label === 'Notifications') onOpenNotifications?.();
    setMobileNavOpen(false);
  };

  const handleTopNavAction = (label) => {
    if (label === 'Dashboard') onBackHome?.();
    if (label === 'Statistics') onOpenStatistics?.();
    if (label === 'Foundy card') onOpenFoundyCard?.();
    setMobileNavOpen(false);
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
    setMobileNavOpen(false);
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
    <div className="min-h-screen bg-[#efeee7] text-[#1e4043] animate-fade-up">
      <div className="flex min-h-screen w-full flex-col bg-[#f7f3ee]">
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {mobileNavOpen && <button type="button" className="fixed inset-0 z-50 cursor-default bg-[#123b3d]/50 backdrop-blur-[2px] lg:hidden" aria-label="Close navigation menu" onClick={() => setMobileNavOpen(false)} />}
          <aside
          className={[
            'group fixed inset-y-0 left-0 z-[60] overflow-y-auto border-r border-[#e9e2d8] bg-[#f8f4ef] px-3 py-5 transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:overflow-y-auto lg:border-b-0',
            sidebarOpen ? 'w-[min(84vw,18rem)] lg:w-64' : 'w-[min(84vw,18rem)] lg:w-[88px]',
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          ].join(' ')}
        >
          <div className="mb-7 flex items-center justify-center border-b border-[#e3ddd2] pb-4">
            <button
              type="button"
              onClick={() => {
                if (window.matchMedia('(min-width: 1024px)').matches) setSidebarOpen((value) => !value);
                else setMobileNavOpen(false);
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-[#efeae2]"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <img
                src="/images/foundy-negro.png"
                alt="Foundy"
                className="foundy-logo-glow h-8 w-auto object-contain"
              />
            </button>
          </div>

          <button
            type="button"
                  onClick={() => { (onOpenInvestorProfile || onBackHome)?.(); setMobileNavOpen(false); }}
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
                      sidebarOpen ? 'translate-x-0 opacity-100' : 'lg:hidden',
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
                    <Icon className="h-[18px] w-[18px] shrink-0 stroke-[2]" />
                  </span>
                  <span
                    className={[
                      'whitespace-nowrap transition-all duration-300',
                      sidebarOpen ? 'translate-x-0 opacity-100' : 'hidden',
                    ].join(' ')}
                  >
                    {t(label)}
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
                <CircleHelp className="h-[18px] w-[18px] shrink-0 stroke-[2]" />
              </span>
              <span
                className={[
                  'whitespace-nowrap transition-all duration-300',
                  sidebarOpen ? 'translate-x-0 opacity-100' : 'hidden',
                ].join(' ')}
              >
                {t('Support')}
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
                <LogOut className="h-[18px] w-[18px] shrink-0 stroke-[2]" />
              </span>
              <span
                className={[
                  'whitespace-nowrap transition-all duration-300',
                  sidebarOpen ? 'translate-x-0 opacity-100' : 'hidden',
                ].join(' ')}
              >
                {t('Logout')}
              </span>
            </button>
          </div>
          </aside>

          <main className="flex-1 min-w-0">
          <header className="border-b-[3px] border-[#0b5d61] bg-[#f5f2eb] px-3 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:justify-between">
              <button type="button" onClick={() => { setSidebarOpen(true); setMobileNavOpen(true); }} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#d8e1dc] bg-white text-[#0b5d61] lg:hidden" aria-label="Open navigation menu" aria-expanded={mobileNavOpen}>
                <Menu size={19} />
              </button>
              <nav className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto pb-1 text-sm font-medium text-[#506466] sm:gap-6 lg:flex-initial lg:overflow-visible">
                {visibleTopNav.map(({ label, key }) => (
                  <button
                    key={key || label}
                    type="button"
                    onClick={() => handleTopNavAction(label)}
                    className={[
                      'relative shrink-0 pb-1 whitespace-nowrap',
                      activeNav === key ? 'border-b-2 border-[#0d5d61] text-[#0d5d61]' : 'hover:text-[#0d5d61]',
                    ].join(' ')}
                  >
                    {t(label)}
                  </button>
                ))}
              </nav>

              {showSearch && (
                <div className="relative flex w-full items-center justify-end lg:w-auto">
                  <div className="flex w-full items-center gap-2 rounded-full border border-[#c9d1ce] bg-[#f0f3f0] px-3 py-2 text-sm text-[#5f7274] shadow-sm focus-within:border-[#0b817d] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0b817d]/15 sm:w-64">
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
                      className="w-full border-0 bg-transparent text-sm text-[#485d60] outline-none placeholder:text-[#7a8a8b]"
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

          <div className="app-page-content min-w-0 px-4 py-4 sm:px-6 lg:px-8">{children}</div>

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
                  <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{t('Explore')}</h2>
                  <div className="mt-4 space-y-3 text-sm text-teal-100">
                    <button type="button" className="block hover:text-white">Home</button>
                    <button type="button" className="block hover:text-white">My investments</button>
                    <button type="button" className="block hover:text-white">Messages</button>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{t('Account')}</h2>
                  <div className="mt-4 space-y-3 text-sm text-teal-100">
                    <button type="button" className="block hover:text-white">Sign in</button>
                    <button type="button" className="block hover:text-white">Sign up</button>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/20 px-6 py-5 text-center text-xs text-teal-100 sm:px-10">
                © 2026 Foundy. {t('All rights reserved.')}
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
