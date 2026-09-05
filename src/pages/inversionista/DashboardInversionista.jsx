import { useEffect, useState } from 'react';
import { Bell, CircleHelp, Home, LogOut, Mail, Menu, Search, Settings, Wallet, X } from 'lucide-react';
import { supabase } from '../../services/supabase.js';

const readPublishedProjects = async () => {
    const { data, error } = await supabase.from('proyecto').select('*').eq('estado', 'publicado');
    if (error) throw error;
    return (data || []).map((project) => ({
        id: project.id_proyecto,
        title: project.nombre,
        location: 'El Salvador',
        category: project.id_categoria || 'New opportunity',
        objective: project.descripcion,
        goal: project.monto_objetivo ? `$${Number(project.monto_objetivo).toLocaleString('en-US')}` : 'To be defined',
        term: project.fecha_fin && project.fecha_inicio ? `${project.fecha_inicio} - ${project.fecha_fin}` : 'To be defined',
        spots: 'Open',
        image: '/images/emprendedores-negocios.jpg',
    }));
};

const menuItems = [
    { label: 'Home', icon: Home }, { label: 'My investments', icon: Wallet }, { label: 'Messages', icon: Mail }, { label: 'Settings', icon: Settings }, { label: 'Notifications', icon: Bell },
];

function DashboardInversionista({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome, onOpenChat, onOpenInvestments, onOpenFoundyCard, showSidebar = true }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [montoInversion, setMontoInversion] = useState('');
    const [invirtiendo, setInvirtiendo] = useState(false);
    const [notice, setNotice] = useState('');
    const [opportunities, setOpportunities] = useState([]);
    const name = usuarioData?.usuario || 'David Diaz';
    const filtered = opportunities.filter((item) => `${item.title} ${item.category} ${item.location}`.toLowerCase().includes(searchTerm.toLowerCase()));

    const showNotice = (message) => {
        setNotice(message);
        window.setTimeout(() => setNotice(''), 2500);
    };

    useEffect(() => {
        const refreshProjects = async () => {
            try {
                setOpportunities(await readPublishedProjects());
            } catch (error) {
                showNotice(`No se pudieron cargar los proyectos: ${error.message}`);
            }
        };
        window.addEventListener('foundy-project-published', refreshProjects);
        window.addEventListener('storage', refreshProjects);
        refreshProjects();
        return () => {
            window.removeEventListener('foundy-project-published', refreshProjects);
            window.removeEventListener('storage', refreshProjects);
        };
    }, []);

    const handleMenu = (label) => {
        if (label === 'Home') onBackHome?.();
        else if (label === 'My investments') onOpenInvestments?.();
        else if (label === 'Messages') onOpenChat?.();
        else if (label === 'Settings') onOpenSettings?.();
        else showNotice(label === 'Notifications' ? 'No tienes notificaciones nuevas.' : 'Tus inversiones aparecerán aquí.');
    };

    const confirmarInversion = async () => {
        const monto = Number(montoInversion);
        if (!selectedOpportunity || !Number.isFinite(monto) || monto <= 0) {
            showNotice('Ingresa un monto válido para invertir.');
            return;
        }
        setInvirtiendo(true);
        const objetivo = Number.parseFloat(String(selectedOpportunity.goal).replace(/[^0-9.]/g, '')) || 0;
        const participacion = objetivo > 0 ? (monto / objetivo) * 100 : 0;
        const { data: inversion, error: inversionError } = await supabase
            .from('inversion')
            .insert({
                fecha: new Date().toISOString().slice(0, 10),
                monto,
                participacion,
                id_proyecto: selectedOpportunity.id,
                id_inversionista: usuarioData?.dui,
            })
            .select('id_inversion')
            .single();
        if (inversionError) {
            setInvirtiendo(false);
            showNotice(`No se pudo registrar la inversión: ${inversionError.message}`);
            return;
        }
        const { error: pagoError } = await supabase.from('pago').insert({
            fecha: new Date().toISOString().slice(0, 10),
            monto,
            estado: 'pendiente',
            metodo: 'Pendiente',
            id_inversionista: usuarioData?.dui,
            id_inversion: inversion.id_inversion,
        });
        setInvirtiendo(false);
        if (pagoError) {
            showNotice(`Inversión registrada, pero el pago no pudo guardarse: ${pagoError.message}`);
            return;
        }
        setSelectedOpportunity(null);
        setMontoInversion('');
        showNotice('Inversión registrada y pago pendiente creado.');
    };

    return (
        <div className="min-h-screen bg-[#efeee7] text-[#1e4043]">
            <div className="flex min-h-screen">
                {showSidebar && <aside className={`${sidebarOpen ? 'w-64' : 'w-18'} fixed inset-y-0 left-0 z-30 flex flex-col border-r border-[#d9d3c7] bg-[#f5f2eb] p-4 transition-all duration-200 lg:static`}>
                    <button type="button" onClick={() => setSidebarOpen((open) => !open)} className="mb-6 flex h-12 items-center justify-center border-b border-[#d9d3c7] text-[#0b5d61]" aria-label="Alternar menú">{sidebarOpen ? <img src="/images/foundy-negro.png" alt="Foundy" className="h-8 w-auto" /> : <Menu size={21} />}</button>
                    <div className="mb-7 flex flex-col items-center"><div className={`${sidebarOpen ? 'h-20 w-20' : 'h-10 w-10'} overflow-hidden rounded-full border-[3px] border-[#1b4a4d] bg-[#d6e7e6] transition-all`}><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80" alt="Perfil" className="h-full w-full object-cover" /></div>{sidebarOpen && <><p className="mt-2 text-xs font-semibold text-[#27383a]">{name}</p><span className="mt-1 rounded bg-[#dfe6e6] px-2 py-0.5 text-[10px] text-[#637173]">Inversionista</span></>}</div>
                    <nav className="space-y-1.5" aria-label="Menú principal">{menuItems.map(({ label, icon: Icon }, index) => <button key={label} type="button" onClick={() => handleMenu(label)} title={!sidebarOpen ? label : undefined} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs transition ${index === 0 ? 'bg-[#e5eeee] font-semibold text-[#006b73]' : 'text-[#526164] hover:bg-[#e8f0f0] hover:text-[#006b73]'} ${!sidebarOpen ? 'justify-center px-2' : ''}`}><Icon size={16} />{sidebarOpen && label}</button>)}</nav>
                    <div className="mt-auto space-y-1.5 border-t border-[#d9d3c7] pt-4"><button type="button" onClick={() => showNotice('Soporte: escríbenos desde Mensajes.')} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs text-[#526164] hover:bg-[#e8f0f0] ${!sidebarOpen ? 'justify-center px-2' : ''}`} title="Support"><CircleHelp size={16} />{sidebarOpen && 'Support'}</button><button type="button" onClick={onCerrarSesion} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs text-[#526164] hover:bg-[#e8f0f0] ${!sidebarOpen ? 'justify-center px-2' : ''}`} title="Logout"><LogOut size={16} />{sidebarOpen && 'Logout'}</button></div>
                </aside>}

                <main className="min-w-0 flex-1">
                    <header className="flex h-18 items-center justify-between border-b border-[#d9d3c7] bg-[#f5f2eb] px-5 sm:px-8"><div className="flex items-center gap-6"><button type="button" onClick={() => setSidebarOpen((open) => !open)} className="text-[#0b5d61] lg:hidden" aria-label="Alternar menú"><Menu size={20} /></button><nav className="flex items-center gap-6 text-[11px]" aria-label="Secciones"><button type="button" onClick={onBackHome} className="border-b-2 border-[#006b73] py-[1.62rem] font-semibold text-[#006b73]">Dashboard</button><button type="button" onClick={() => showNotice('Las estadísticas estarán disponibles pronto.')} className="text-[#758082] hover:text-[#006b73]">Statistics</button><button type="button" onClick={onOpenFoundyCard} className="text-[#758082] hover:text-[#006b73]">Foundy card</button></nav></div><label className="flex h-8 w-36 items-center gap-2 rounded-full border border-[#c9d1ce] bg-[#eef2f2] px-3 text-xs text-[#899496] sm:w-48"><Search size={14} /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} type="search" placeholder="Search" className="w-full bg-transparent outline-none placeholder:text-[#899496]" aria-label="Buscar oportunidades" /></label></header>

                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {opportunities.length > 0 && <section className="overflow-hidden rounded-xl bg-[#006b73] p-5 text-white shadow-[0_12px_24px_rgba(0,80,85,0.16)] sm:p-7"><div className="grid items-center gap-6 lg:grid-cols-[.72fr_1.28fr]"><div className="mx-auto flex w-full max-w-68 items-center justify-center"><img src={opportunities[0].image || '/images/emprendedores-negocios.jpg'} alt={opportunities[0].title} className="h-48 w-48 rounded-full border-4 border-[#dff1ed] object-cover shadow-lg sm:h-56 sm:w-56" /></div><div><p className="text-[10px] font-medium uppercase tracking-[.14em] text-[#d4efee]">Featured opportunity</p><h1 className="mt-2 text-xl font-semibold sm:text-2xl">{opportunities[0].title}</h1><p className="mt-2 max-w-2xl text-xs leading-5 text-[#d5efee]">{opportunities[0].objective}</p><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[['Goal', opportunities[0].goal], ['Category', opportunities[0].category], ['Term', opportunities[0].term], ['Spots', opportunities[0].spots]].map(([label, value]) => <div key={label} className="rounded-lg bg-[#1b8c8d]/30 p-2 text-center"><p className="text-[9px] uppercase text-[#d4efee]">{label}</p><p className="mt-1 text-sm font-bold">{value || 'Open'}</p></div>)}</div><div className="mt-4 flex gap-2"><button type="button" onClick={() => setSelectedOpportunity(opportunities[0])} className="rounded-md bg-[#dfece4] px-4 py-2 text-[10px] font-bold uppercase text-[#0d5d61] hover:bg-white">View details</button></div></div></div></section>}

                        <section className="mt-7"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold text-[#1d3f42]">Browse Opportunities</h2><button type="button" onClick={() => { setSearchTerm(''); showNotice('Mostrando todas las oportunidades.'); }} className="text-xs font-semibold text-[#1d4b4c] hover:text-[#0d5d61]">View all →</button></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{filtered.map((item) => <article key={item.title} className="flex flex-col overflow-hidden rounded-lg border border-[#d7d0c4] bg-[#f8f4ef] shadow-sm"><img src={item.image} alt={item.title} className="h-32 w-full object-cover" /><div className="flex flex-1 flex-col p-3"><span className="w-fit rounded-full bg-[#edf5f2] px-2 py-1 text-[9px] font-semibold text-[#1d4b4c]">{item.category}</span><h3 className="mt-2 text-sm font-semibold text-[#1d3f42]">{item.title}</h3><p className="mt-1 text-[10px] text-[#5f7274]">{item.location}</p><p className="mt-3 flex-1 text-[11px] leading-4 text-[#5d6d6d]">{item.objective}</p><div className="mt-3 grid grid-cols-2 gap-2 text-[10px]"><span className="rounded bg-[#f0f3f0] p-2">Goal <b className="block text-[#1f4043]">{item.goal}</b></span><span className="rounded bg-[#f0f3f0] p-2">Spots <b className="block text-[#1f4043]">{item.spots}</b></span><span className="rounded bg-[#f0f3f0] p-2">Term <b className="block text-[#1f4043]">{item.term}</b></span><span className="rounded bg-[#f0f3f0] p-2">Starts <b className="block text-[#1f4043]">12/08/24</b></span></div><button type="button" onClick={() => setSelectedOpportunity(item)} className="mt-3 w-full rounded-md bg-[#006b73] px-3 py-2 text-[10px] font-bold uppercase text-white hover:bg-[#005159]">Invest</button></div></article>)}</div>{filtered.length === 0 && <p className="rounded-lg border border-dashed border-[#cbd4d3] p-8 text-center text-sm text-[#446062]">No se encontraron oportunidades.</p>}</section>

                        <section className="mt-7 grid gap-4 lg:grid-cols-[.8fr_1.4fr_.8fr]"><article className="rounded-lg bg-[#e4eafa] p-4"><p className="text-xs text-[#53657a]">Active Projects</p><p className="mt-2 text-3xl font-semibold text-[#263b59]">6</p><p className="mt-1 text-[10px] text-[#53657a]">Next payout: Aug 15</p></article><article className="rounded-lg bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><h3 className="text-xs font-semibold">Investment Growth</h3><span className="text-[10px] text-[#657577]">Last 7 months</span></div><div className="mt-4 flex h-20 items-end gap-3">{['h-[22%]', 'h-[31%]', 'h-[26%]', 'h-[40%]', 'h-[35%]', 'h-[58%]', 'h-[86%]'].map((height, index) => <div key={height} className={`flex-1 rounded-t ${height} ${index === 6 ? 'bg-[#006b73]' : 'bg-[#dceff0]'}`} />)}</div><div className="mt-2 flex justify-between text-[9px] text-[#657577]"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span></div></article><article className="rounded-lg bg-[#006b73] p-4 text-white"><p className="text-[10px] uppercase tracking-wider text-[#dfeef1]">Total invested</p><p className="mt-3 text-2xl font-semibold">$500,000</p><p className="mt-2 text-xs text-[#dfeef1]">↗ +12.5% this year</p></article></section>
                    </div>
                </main>
            </div>

            {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#173f43] px-4 py-3 text-xs font-semibold text-white shadow-lg">{notice}</div>}
            {selectedOpportunity && <div className="fixed inset-0 z-50 grid place-items-center bg-[#173f43]/40 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-xl bg-[#f8f4ef] p-5 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-[#1b7f61]">Investment opportunity</p><h2 className="mt-1 text-lg font-semibold text-[#1d3f42]">{selectedOpportunity.title}</h2></div><button type="button" onClick={() => setSelectedOpportunity(null)} className="text-[#526164]" aria-label="Cerrar"><X size={18} /></button></div><p className="mt-4 text-sm leading-6 text-[#5d6d6d]">{selectedOpportunity.objective}</p><label className="mt-4 block text-xs font-semibold text-[#526164]">Monto a invertir<input type="number" min="1" value={montoInversion} onChange={(event) => setMontoInversion(event.target.value)} className="mt-2 w-full rounded-md border border-[#ccd6d3] bg-white px-3 py-2 text-sm outline-none focus:border-[#006b73]" placeholder="500" /></label><div className="mt-5 flex gap-2"><button type="button" onClick={confirmarInversion} disabled={invirtiendo} className="flex-1 rounded-md bg-[#006b73] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-[#005159] disabled:opacity-60">{invirtiendo ? 'Guardando...' : 'Confirmar inversión'}</button><button type="button" onClick={() => { setSelectedOpportunity(null); setMontoInversion(''); }} className="rounded-md border border-[#ccd6d3] px-4 py-2 text-xs font-semibold text-[#526164]">Cerrar</button></div></div></div>}
        </div>
    );
}

export default DashboardInversionista;
