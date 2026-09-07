import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../services/supabase.js';

const readPublishedProjects = async () => {
    const { data, error } = await supabase.from('proyecto').select('*').eq('estado', 'publicado');
    if (error) throw error;
    return (data || []).map((project) => ({
        id: project.id_proyecto,
        title: project.nombre,
        location: project.ubicacion || 'No definido',
        category: project.id_categoria || 'Uncategorized',
        objective: project.descripcion,
        goal: project.monto_objetivo ? `$${Number(project.monto_objetivo).toLocaleString('en-US')}` : 'No definido',
        term: project.fecha_fin && project.fecha_inicio ? `${project.fecha_inicio} - ${project.fecha_fin}` : 'No definido',
        spots: null,
        image: null,
    }));
};

function DashboardInversionista({ usuarioData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [montoInversion, setMontoInversion] = useState('');
    const [invirtiendo, setInvirtiendo] = useState(false);
    const [notice, setNotice] = useState('');
    const [opportunities, setOpportunities] = useState([]);
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
        <div className="min-h-full bg-[#efeee7] text-[#1e4043]">
                    <div className="mx-auto max-w-7xl px-1 py-1 sm:px-2 lg:px-4">
                        {opportunities.length > 0 && <section className="overflow-hidden rounded-xl bg-[#006b73] p-5 text-white shadow-[0_12px_24px_rgba(0,80,85,0.16)] sm:p-7"><div className="grid items-center gap-6 lg:grid-cols-[.72fr_1.28fr]"><div className="mx-auto flex w-full max-w-68 items-center justify-center"><div className="grid h-48 w-48 place-items-center rounded-full border-4 border-[#dff1ed] bg-white/10 text-xs text-[#d5efee] sm:h-56 sm:w-56">Sin imagen</div></div><div><p className="text-[10px] font-medium uppercase tracking-[.14em] text-[#d4efee]">Featured opportunity</p><h1 className="mt-2 text-xl font-semibold sm:text-2xl">{opportunities[0].title}</h1><p className="mt-2 max-w-2xl text-xs leading-5 text-[#d5efee]">{opportunities[0].objective}</p><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[['Goal', opportunities[0].goal], ['Category', opportunities[0].category], ['Term', opportunities[0].term], ['Spots', opportunities[0].spots || 'No definido']].map(([label, value]) => <div key={label} className="rounded-lg bg-[#1b8c8d]/30 p-2 text-center"><p className="text-[9px] uppercase text-[#d4efee]">{label}</p><p className="mt-1 text-sm font-bold">{value || 'No definido'}</p></div>)}</div><div className="mt-4 flex gap-2"><button type="button" onClick={() => setSelectedOpportunity(opportunities[0])} className="rounded-md bg-[#dfece4] px-4 py-2 text-[10px] font-bold uppercase text-[#0d5d61] hover:bg-white">View details</button></div></div></div></section>}

                        <section className="mt-7"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold text-[#1d3f42]">Browse Opportunities</h2><button type="button" onClick={() => setSearchTerm('')} className="text-xs font-semibold text-[#1d4b4c] hover:text-[#0d5d61]">View all →</button></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{filtered.map((item) => <article key={item.id} className="flex flex-col overflow-hidden rounded-lg border border-[#d7d0c4] bg-[#f8f4ef] shadow-sm"><div className="grid h-32 place-items-center bg-[#e8efed] text-xs text-[#5d6d6d]">Sin imagen</div><div className="flex flex-1 flex-col p-3"><span className="w-fit rounded-full bg-[#edf5f2] px-2 py-1 text-[9px] font-semibold text-[#1d4b4c]">{item.category}</span><h3 className="mt-2 text-sm font-semibold text-[#1d3f42]">{item.title}</h3><p className="mt-1 text-[10px] text-[#5f7274]">{item.location}</p><p className="mt-3 flex-1 text-[11px] leading-4 text-[#5d6d6d]">{item.objective}</p><div className="mt-3 grid grid-cols-2 gap-2 text-[10px]"><span className="rounded bg-[#f0f3f0] p-2">Goal <b className="block text-[#1f4043]">{item.goal}</b></span><span className="rounded bg-[#f0f3f0] p-2">Spots <b className="block text-[#1f4043]">{item.spots || 'No definido'}</b></span><span className="rounded bg-[#f0f3f0] p-2">Term <b className="block text-[#1f4043]">{item.term}</b></span></div><button type="button" onClick={() => setSelectedOpportunity(item)} className="mt-3 w-full rounded-md bg-[#006b73] px-3 py-2 text-[10px] font-bold uppercase text-white hover:bg-[#005159]">Invest</button></div></article>)}</div>{filtered.length === 0 && <p className="rounded-lg border border-dashed border-[#cbd4d3] p-8 text-center text-sm text-[#446062]">No se encontraron oportunidades.</p>}</section>

                        <section className="mt-7 rounded-lg border border-dashed border-[#cbd4d3] bg-[#f8f4ef] p-8 text-center"><h2 className="text-sm font-semibold text-[#1d3f42]">Investment data will appear here</h2><p className="mt-2 text-xs text-[#5d6d6d]">Connect investment and payment records to see your portfolio metrics.</p></section>
                    </div>

            {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#173f43] px-4 py-3 text-xs font-semibold text-white shadow-lg">{notice}</div>}
            {selectedOpportunity && <div className="fixed inset-0 z-50 grid place-items-center bg-[#173f43]/40 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-xl bg-[#f8f4ef] p-5 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-[#1b7f61]">Investment opportunity</p><h2 className="mt-1 text-lg font-semibold text-[#1d3f42]">{selectedOpportunity.title}</h2></div><button type="button" onClick={() => setSelectedOpportunity(null)} className="text-[#526164]" aria-label="Cerrar"><X size={18} /></button></div><p className="mt-4 text-sm leading-6 text-[#5d6d6d]">{selectedOpportunity.objective}</p><label className="mt-4 block text-xs font-semibold text-[#526164]">Monto a invertir<input type="number" min="1" value={montoInversion} onChange={(event) => setMontoInversion(event.target.value)} className="mt-2 w-full rounded-md border border-[#ccd6d3] bg-white px-3 py-2 text-sm outline-none focus:border-[#006b73]" placeholder="500" /></label><div className="mt-5 flex gap-2"><button type="button" onClick={confirmarInversion} disabled={invirtiendo} className="flex-1 rounded-md bg-[#006b73] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-[#005159] disabled:opacity-60">{invirtiendo ? 'Guardando...' : 'Confirmar inversión'}</button><button type="button" onClick={() => { setSelectedOpportunity(null); setMontoInversion(''); }} className="rounded-md border border-[#ccd6d3] px-4 py-2 text-xs font-semibold text-[#526164]">Cerrar</button></div></div></div>}
        </div>
    );
}

export default DashboardInversionista;
