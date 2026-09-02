import { useState } from 'react';
import {
  Bell,
  CircleHelp,
  FolderKanban,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';

const navigation = [
  { key: 'home', label: 'Overview', icon: Home },
  { key: 'projects', label: 'My projects', icon: FolderKanban },
  { key: 'create-project', label: 'Create project', icon: FolderKanban },
  { key: 'statistics', label: 'Statistics', icon: LayoutDashboard },
  { key: 'chat', label: 'Messages', icon: Mail },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function EntrepreneurLayout({
  active = 'home',
  user = 'Entrepreneur',
  onBackHome,
  onOpenCreateProject,
  onOpenProjects,
  onOpenStatistics,
  onOpenChat,
  onOpenSettings,
  onOpenFoundyCard,
  onCerrarSesion,
  onNotice,
  children,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const initials = user
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const actions = {
    home: onBackHome,
    projects: onOpenProjects,
    'create-project': onOpenCreateProject,
    statistics: onOpenStatistics,
    chat: onOpenChat,
    settings: onOpenSettings,
  };

  const goTo = (key) => {
    actions[key]?.();
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f7f5] text-[#294448]">
      <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#d7e4df] bg-[#fbfdfc] px-4 py-5 shadow-xl transition-transform lg:translate-x-0 lg:shadow-none`}>
        <div className="flex items-center justify-between px-3 pb-5">
          <img src="/images/foundy-logo.png" alt="Foundy" className="h-8 w-auto object-contain" />
          <button type="button" onClick={() => setMobileOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-[#547073] hover:bg-[#e8f2ee] lg:hidden" aria-label="Close menu">
            <X size={19} />
          </button>
        </div>

        <div className="border-y border-[#e0ebe7] px-3 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[#0b7471]/20 bg-[#dcefeb] text-sm font-bold text-[#0b7471]">{initials || 'E'}</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#294448]">{user}</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a9290]">Entrepreneur</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 space-y-1" aria-label="Entrepreneur menu">
          {navigation.map(({ key, label, icon: Icon }) => (
            <button key={key} type="button" onClick={() => goTo(key)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${active === key ? 'bg-[#0b7471] text-white shadow-[0_8px_18px_rgba(11,116,113,0.2)]' : 'text-[#587073] hover:bg-[#e8f2ee] hover:text-[#0b7471]'}`}>
              <Icon size={18} strokeWidth={active === key ? 2.4 : 2} />
              {label}
            </button>
          ))}
          <button type="button" onClick={onOpenFoundyCard} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#587073] transition hover:bg-[#e8f2ee] hover:text-[#0b7471]">
            <Sparkles size={18} /> Foundy card
          </button>
        </nav>

        <div className="mt-auto space-y-1 border-t border-[#e0ebe7] pt-4">
          <button type="button" onClick={() => onNotice?.('Support is available from Messages.')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#587073] hover:bg-[#e8f2ee] hover:text-[#0b7471]"><CircleHelp size={18} /> Support</button>
          <button type="button" onClick={onCerrarSesion} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#587073] hover:bg-[#e8f2ee] hover:text-[#0b7471]"><LogOut size={18} /> Log out</button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#d7e4df] bg-[#fbfdfc]/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl text-[#0b7471] hover:bg-[#e8f2ee] lg:hidden" aria-label="Open menu"><Menu size={21} /></button>
            <div className="lg:hidden"><img src="/images/foundy-logo.png" alt="Foundy" className="h-7 w-auto" /></div>
            <p className="hidden text-sm font-semibold text-[#6b8584] sm:block">{navigation.find((item) => item.key === active)?.label || 'Workspace'}</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <button type="button" onClick={() => onNotice?.('You are all caught up.')} className="grid h-9 w-9 place-items-center rounded-full text-[#587073] hover:bg-[#e8f2ee] hover:text-[#0b7471]" aria-label="Notifications"><Bell size={18} /></button>
            <span className="hidden h-7 w-px bg-[#d7e4df] sm:block" />
            <span className="hidden text-xs font-semibold text-[#587073] sm:block">{user}</span>
            <button type="button" onClick={onCerrarSesion} className="text-xs font-bold text-[#0b7471] hover:underline">Log out</button>
          </div>
        </header>
        <main>{children}</main>
      </div>
      {mobileOpen && <button type="button" className="fixed inset-0 z-40 bg-[#183d3e]/30 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu overlay" />}
    </div>
  );
}
