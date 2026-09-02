import { useState } from 'react';
import { Bell, CircleHelp, Home, LogOut, Mail, Menu, Search, Settings, TrendingUp, Wallet } from 'lucide-react';

const investments = [
	{ name: 'Jorge Aparicio Coffee', category: 'Agriculture', date: 'Aug 12, 2024', invested: '$350.00', return: '+12.0%', status: 'Active', image: '/images/jorgeaparicio.jpeg' },
	{ name: 'Café Monte Verde', category: 'Agriculture', date: 'Aug 08, 2024', invested: '$500.00', return: '+15.0%', status: 'Active', image: '/images/Cafemonteverde.png' },
	{ name: 'Tati Pupuseria', category: 'Gastronomy', date: 'Jul 31, 2024', invested: '$300.00', return: '+8.5%', status: 'Active', image: '/images/tatipupuseria.png' },
	{ name: 'Artesanías El Faro', category: 'Textiles', date: 'Jul 15, 2024', invested: '$120.00', return: '+10.2%', status: 'Completed', image: '/images/Artesaníaselfaro.png' },
];

const menuItems = [
	{ label: 'Home', icon: Home }, { label: 'My investments', icon: Wallet }, { label: 'Messages', icon: Mail }, { label: 'Settings', icon: Settings }, { label: 'Notifications', icon: Bell },
];

function Investments({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome, onOpenChat, onOpenFoundyCard }) {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [filter, setFilter] = useState('All');
	const [notice, setNotice] = useState('');
	const name = usuarioData?.usuario || 'David Diaz';
	const visibleInvestments = investments.filter((item) => {
		const matchesFilter = filter === 'All' || item.status === filter;
		const matchesSearch = `${item.name} ${item.category}`.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesFilter && matchesSearch;
	});

	const showNotice = (message) => {
		setNotice(message);
		window.setTimeout(() => setNotice(''), 2500);
	};

	const handleMenu = (label) => {
		if (label === 'Home') onBackHome?.();
		else if (label === 'Messages') onOpenChat?.();
		else if (label === 'Settings') onOpenSettings?.();
		else showNotice(label === 'Notifications' ? 'No tienes notificaciones nuevas.' : 'Esta sección está en preparación.');
	};

	return (
		<div className="min-h-screen bg-[#efeee7] text-[#1e4043]"><div className="flex min-h-screen">
			<aside className={`${sidebarOpen ? 'w-64' : 'w-18'} fixed inset-y-0 left-0 z-30 flex flex-col border-r border-[#d9d3c7] bg-[#f5f2eb] p-4 transition-all duration-200 lg:static`}>
				<button type="button" onClick={() => setSidebarOpen((open) => !open)} className="mb-6 flex h-12 items-center justify-center border-b border-[#d9d3c7] text-[#0b5d61]" aria-label="Alternar menú">{sidebarOpen ? <img src="/images/foundy-negro.png" alt="Foundy" className="h-8 w-auto" /> : <Menu size={21} />}</button>
				<button type="button" onClick={onBackHome} className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-[#006b73]/9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006b73]/30" aria-label="Volver al panel" title="Volver al panel"><img src="https://tse2.mm.bing.net/th/id/OIP.w171eC9ZBI8OTweGWM7G0gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" className="h-7 w-7 object-contain" /></button>
				<div className="mb-7 flex flex-col items-center"><div className={`${sidebarOpen ? 'h-20 w-20' : 'h-10 w-10'} overflow-hidden rounded-full border-[3px] border-[#1b4a4d] bg-[#d6e7e6]`}><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80" alt="Perfil" className="h-full w-full object-cover" /></div>{sidebarOpen && <><p className="mt-2 text-xs font-semibold text-[#27383a]">{name}</p><span className="mt-1 rounded bg-[#dfe6e6] px-2 py-0.5 text-[10px] text-[#637173]">Inversionista</span></>}</div>
				<nav className="space-y-1.5" aria-label="Menú principal">{menuItems.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => label === 'My investments' ? undefined : handleMenu(label)} title={!sidebarOpen ? label : undefined} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs transition ${label === 'My investments' ? 'bg-[#e5eeee] font-semibold text-[#006b73]' : 'text-[#526164] hover:bg-[#e8f0f0] hover:text-[#006b73]'} ${!sidebarOpen ? 'justify-center px-2' : ''}`}><Icon size={16} />{sidebarOpen && label}</button>)}</nav>
				<div className="mt-auto space-y-1.5 border-t border-[#d9d3c7] pt-4"><button type="button" onClick={() => showNotice('Soporte: escríbenos desde Mensajes.')} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs text-[#526164] hover:bg-[#e8f0f0]"><CircleHelp size={16} />{sidebarOpen && 'Support'}</button><button type="button" onClick={onCerrarSesion} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs text-[#526164] hover:bg-[#e8f0f0]"><LogOut size={16} />{sidebarOpen && 'Logout'}</button></div>
			</aside>
			<main className="min-w-0 flex-1"><header className="flex h-18 items-center justify-between border-b border-[#d9d3c7] bg-[#f5f2eb] px-5 sm:px-8"><div className="flex items-center gap-6"><button type="button" onClick={() => setSidebarOpen((open) => !open)} className="text-[#0b5d61] lg:hidden" aria-label="Alternar menú"><Menu size={20} /></button><nav className="flex items-center gap-6 text-[11px]" aria-label="Secciones"><button type="button" onClick={onBackHome} className="text-[#758082] hover:text-[#006b73]">Dashboard</button><button type="button" className="border-b-2 border-[#006b73] py-[1.62rem] font-semibold text-[#006b73]">My investments</button><button type="button" onClick={onOpenFoundyCard} className="text-[#758082] hover:text-[#006b73]">Foundy card</button></nav></div><label className="flex h-8 w-36 items-center gap-2 rounded-full border border-[#c9d1ce] bg-[#eef2f2] px-3 text-xs text-[#899496] sm:w-48"><Search size={14} /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} type="search" placeholder="Search investments" className="w-full bg-transparent outline-none placeholder:text-[#899496]" aria-label="Buscar inversiones" /></label></header>
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#1b7f61]">Portfolio overview</p><h1 className="mt-1 text-2xl font-semibold text-[#1d3f42]">My investments</h1><p className="mt-1 text-xs text-[#687577]">Track the businesses and opportunities you have supported.</p></div><button type="button" onClick={onBackHome} className="w-fit rounded-md bg-[#006b73] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-[#005159]">Explore opportunities</button></div>
					<section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><article className="rounded-lg bg-[#006b73] p-4 text-white shadow-sm"><p className="text-[10px] uppercase tracking-wider text-[#dfeef1]">Total invested</p><p className="mt-3 text-2xl font-semibold">$1,270.00</p><p className="mt-2 text-xs text-[#dfeef1]">Across 4 projects</p></article><article className="rounded-lg bg-white p-4 shadow-sm"><p className="text-[10px] uppercase tracking-wider text-[#657577]">Portfolio return</p><p className="mt-3 text-2xl font-semibold text-[#1b7f61]">+11.8%</p><p className="mt-2 text-xs text-[#657577]">This year</p></article><article className="rounded-lg bg-[#e4eafa] p-4"><p className="text-[10px] uppercase tracking-wider text-[#53657a]">Active projects</p><p className="mt-3 text-2xl font-semibold text-[#263b59]">3</p><p className="mt-2 text-xs text-[#53657a]">Generating returns</p></article><article className="rounded-lg bg-[#f8f4ef] p-4 shadow-sm"><p className="text-[10px] uppercase tracking-wider text-[#657577]">Next payout</p><p className="mt-3 text-2xl font-semibold text-[#1d3f42]">Aug 15</p><p className="mt-2 text-xs text-[#657577]">Estimated payout date</p></article></section>
					<section className="mt-7 overflow-hidden rounded-lg border border-[#d7d0c4] bg-[#f8f4ef] shadow-sm"><div className="flex flex-col gap-3 border-b border-[#d7d0c4] p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-sm font-semibold text-[#1d3f42]">Investment history</h2><p className="mt-1 text-[10px] text-[#687577]">Your latest investments and their current performance.</p></div><div className="flex gap-1 rounded-md bg-[#e9eeeb] p-1">{['All', 'Active', 'Completed'].map((option) => <button key={option} type="button" onClick={() => setFilter(option)} className={`rounded px-3 py-1.5 text-[10px] font-semibold ${filter === option ? 'bg-white text-[#006b73] shadow-sm' : 'text-[#657577]'}`}>{option}</button>)}</div></div><div className="divide-y divide-[#e3ddd3]">{visibleInvestments.map((item) => <article key={item.name} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"><img src={item.image} alt={item.name} className="h-12 w-16 rounded object-cover" /><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold text-[#1d3f42]">{item.name}</h3><p className="mt-1 text-[10px] text-[#687577]">{item.category} · Invested {item.date}</p></div><div className="grid grid-cols-3 gap-5 text-right text-[10px] sm:min-w-[18rem]"><div><p className="text-[#899496]">Amount</p><p className="mt-1 font-semibold text-[#1d3f42]">{item.invested}</p></div><div><p className="text-[#899496]">Return</p><p className="mt-1 font-semibold text-[#1b7f61]">{item.return}</p></div><div><p className="text-[#899496]">Status</p><p className={`mt-1 font-semibold ${item.status === 'Active' ? 'text-[#1b7f61]' : 'text-[#657577]'}`}>{item.status}</p></div></div><button type="button" onClick={() => showNotice(`Detalles de ${item.name}.`)} className="rounded-md border border-[#cbd7d3] px-3 py-2 text-[10px] font-semibold text-[#1d4b4c] hover:bg-white">View</button></article>)}{visibleInvestments.length === 0 && <p className="p-8 text-center text-sm text-[#687577]">No se encontraron inversiones.</p>}</div></section>
					<section className="mt-6 flex items-center gap-3 rounded-lg bg-[#dfeeed] p-4"><TrendingUp size={20} className="text-[#1b7f61]" /><div><h2 className="text-xs font-semibold text-[#1d3f42]">Your portfolio is growing</h2><p className="mt-1 text-[10px] text-[#536d6e]">Your investments have generated an average return of 11.8% this year.</p></div></section>
				</div>
			</main>
		</div>{notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#173f43] px-4 py-3 text-xs font-semibold text-white shadow-lg">{notice}</div>}
		</div>
	);
}

export default Investments;
