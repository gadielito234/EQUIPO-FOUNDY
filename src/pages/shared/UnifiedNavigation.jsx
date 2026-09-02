import { Bell, CircleHelp, FolderKanban, Home, LayoutDashboard, LogOut, Mail, Settings, Wallet } from 'lucide-react';

const investorItems = [
  { label: 'Home', icon: Home },
  { label: 'My investments', icon: Wallet },
  { label: 'Messages', icon: Mail },
  { label: 'Settings', icon: Settings },
  { label: 'Notifications', icon: Bell },
];

export default function UnifiedNavigation({ role = 'investor', active = 'home', user = 'User', onBackHome, onOpenSettings, onOpenChat, onOpenInvestments, onOpenFoundyCard, onCerrarSesion, onNotice, onSearch }) {
  const isInvestor = role === 'investor';
  const items = isInvestor ? investorItems : [{ label: 'Home', icon: Home }, { label: 'My projects', icon: FolderKanban }, { label: 'Statistics', icon: LayoutDashboard }, { label: 'Messages', icon: Mail }, { label: 'Settings', icon: Settings }];
  const action = (label) => {
    if (label === 'Home') onBackHome?.();
    else if (label === 'My investments') onOpenInvestments?.();
    else if (label === 'Messages') onOpenChat?.();
    else if (label === 'Settings') onOpenSettings?.();
    else onNotice?.(`${label} is up to date.`);
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[#d7e4df] bg-[#fbfdfc] px-4 py-5 lg:flex">
        <div className="border-b border-[#e0ebe7] px-3 pb-5"><img src="/images/foundy-logo.png" alt="Foundy" className="h-8 w-auto" /></div>
        <div className="border-b border-[#e0ebe7] px-3 py-5"><p className="text-sm font-bold text-[#294448]">{user}</p><p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a9290]">{isInvestor ? 'Investor' : 'Entrepreneur'}</p></div>
        <nav className="mt-6 space-y-1" aria-label="Main navigation">
          {items.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => action(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${active === label.toLowerCase() ? 'bg-[#0b7471] text-white' : 'text-[#587073] hover:bg-[#e8f2ee]'}`}><Icon size={18} />{label}</button>)}
          {onOpenFoundyCard && <button type="button" onClick={onOpenFoundyCard} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#587073] hover:bg-[#e8f2ee]"><FolderKanban size={18} />Foundy card</button>}
        </nav>
        <div className="mt-auto space-y-1 border-t border-[#e0ebe7] pt-4"><button type="button" onClick={() => onNotice?.('Support is available from Messages.')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#587073]"><CircleHelp size={18} />Support</button><button type="button" onClick={onCerrarSesion} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#587073]"><LogOut size={18} />Log out</button></div>
      </aside>
      <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-end border-b border-[#d7e4df] bg-[#fbfdfc]/95 px-4 backdrop-blur sm:px-8 lg:left-64"><div className="flex items-center gap-4"><button type="button" onClick={() => onNotice?.('You are all caught up.')} className="text-[#587073]" aria-label="Notifications"><Bell size={18} /></button><label className="hidden h-8 w-44 items-center rounded-full border border-[#d7e4df] bg-[#f0f5f2] px-3 sm:flex"><input type="search" onChange={(event) => onSearch?.(event.target.value)} placeholder="Search" className="w-full bg-transparent text-xs outline-none" /></label><span className="text-xs font-semibold text-[#587073]">{user}</span></div></header>
    </>
  );
}
