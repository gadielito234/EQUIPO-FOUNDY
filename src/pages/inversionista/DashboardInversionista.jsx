import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../services/supabase.js';

async function readPublishedProjects() {
  const { data, error } = await supabase.from('proyecto').select('*').eq('estado', 'publicado');
  if (error) throw error;
  return (data || []).map((project) => ({
    id: project.id_proyecto,
    title: project.nombre,
    location: project.ubicacion || 'Location unavailable',
    category: project.id_categoria || 'Uncategorized',
    objective: project.descripcion || 'No description available.',
    image: project.imagen_url || '',
    goalAmount: Number(project.monto_objetivo || 0),
    raisedAmount: Number(project.monto_recaudado || 0),
    goal: project.monto_objetivo ? `$${Number(project.monto_objetivo).toLocaleString('en-US')}` : 'Not available',
    raised: `$${Number(project.monto_recaudado || 0).toLocaleString('en-US')}`,
    term: project.fecha_fin && project.fecha_inicio ? `${project.fecha_inicio} - ${project.fecha_fin}` : 'Not available',
    startDate: project.fecha_inicio || 'Not available',
    endDate: project.fecha_fin || 'Not available',
  }));
}

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
        showNotice(`Projects could not be loaded: ${error.message}`);
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

  const confirmInvestment = async () => {
    const amount = Number(montoInversion);
    if (!selectedOpportunity || !Number.isFinite(amount) || amount <= 0) {
      showNotice('Enter a valid amount to invest.');
      return;
    }
    const remainingAmount = Math.max(selectedOpportunity.goalAmount - selectedOpportunity.raisedAmount, 0);
    if (remainingAmount > 0 && amount > remainingAmount) {
      showNotice(`The maximum available amount is $${remainingAmount.toLocaleString('en-US')}.`);
      return;
    }
    setInvirtiendo(true);
    const goal = selectedOpportunity.goalAmount;
    const participation = goal > 0 ? (amount / goal) * 100 : 0;
    const { data: investment, error: investmentError } = await supabase.from('inversion').insert({
      fecha: new Date().toISOString().slice(0, 10),
      monto: amount,
      participacion: participation,
      id_proyecto: selectedOpportunity.id,
      id_inversionista: usuarioData?.dui,
    }).select('id_inversion').single();

    if (investmentError) {
      setInvirtiendo(false);
      showNotice(`Investment could not be recorded: ${investmentError.message}`);
      return;
    }

    const { error: paymentError } = await supabase.from('pago').insert({
      fecha: new Date().toISOString().slice(0, 10),
      monto: amount,
      estado: 'pending',
      metodo: 'Pending',
      id_inversionista: usuarioData?.dui,
      id_inversion: investment.id_inversion,
    });
    if (paymentError) {
      setInvirtiendo(false);
      showNotice(`Investment recorded, but the payment could not be saved: ${paymentError.message}`);
      return;
    }

    const { data: project, error: projectReadError } = await supabase
      .from('proyecto')
      .select('monto_recaudado')
      .eq('id_proyecto', selectedOpportunity.id)
      .single();

    if (projectReadError) {
      showNotice(`Payment saved, but the project total could not be updated: ${projectReadError.message}`);
      setInvirtiendo(false);
      return;
    }

    const { error: projectUpdateError } = await supabase
      .from('proyecto')
      .update({ monto_recaudado: Number(project?.monto_recaudado || 0) + amount })
      .eq('id_proyecto', selectedOpportunity.id);

    if (projectUpdateError) {
      showNotice(`Payment saved, but the project total could not be updated: ${projectUpdateError.message}`);
      setInvirtiendo(false);
      return;
    }

    const { error: notificationError } = await supabase.from('notifications').insert({
      user_id: usuarioData?.dui,
      title: 'Investment registered',
      body: `Your investment of $${amount.toLocaleString('en-US')} is pending payment confirmation.`,
      is_read: false,
    });

    setInvirtiendo(false);
    setSelectedOpportunity(null);
    setMontoInversion('');
    showNotice(notificationError
      ? `Investment recorded, but notification failed: ${notificationError.message}`
      : 'Investment recorded and pending payment created.');
  };

  return (
    <main className="min-h-full bg-[#f7f3ee] px-5 py-8 text-[#1e4043] sm:px-8 lg:px-10">
      <div className="w-full">
        {opportunities.length > 0 && (
          <section className="overflow-hidden rounded-2xl bg-[#006b73] p-6 text-white shadow-[0_12px_24px_rgba(0,80,85,0.16)] sm:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-[.7fr_1.3fr]">
              {opportunities[0].image ? <img src={opportunities[0].image} alt="" className="mx-auto h-48 w-48 rounded-full border-4 border-[#dff1ed] object-cover sm:h-56 sm:w-56" /> : <div className="mx-auto grid h-48 w-48 place-items-center rounded-full border-4 border-[#dff1ed] bg-white/10 text-xs text-[#d5efee] sm:h-56 sm:w-56">No image</div>}
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[.14em] text-[#d4efee]">Featured opportunity</p>
                <h1 className="mt-2 text-xl font-semibold sm:text-2xl">{opportunities[0].title}</h1>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-[#d5efee]">{opportunities[0].objective}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[['Goal', opportunities[0].goal], ['Category', opportunities[0].category], ['Term', opportunities[0].term]].map(([label, value]) => <div key={label} className="rounded-lg bg-[#1b8c8d]/30 p-2 text-center"><p className="text-[9px] uppercase text-[#d4efee]">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>)}
                </div>
                <button type="button" onClick={() => setSelectedOpportunity(opportunities[0])} className="mt-5 rounded-md bg-[#dfece4] px-4 py-2 text-[10px] font-bold uppercase text-[#0d5d61] hover:bg-white">View details and invest</button>
              </div>
            </div>
          </section>
        )}

        <section className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#1b7f61]">Discover</p><h2 className="mt-1 text-2xl font-semibold text-[#1d3f42]">Browse opportunities</h2></div><button type="button" onClick={() => setSearchTerm('')} className="text-xs font-semibold text-[#1d4b4c] hover:text-[#0d5d61]">View all</button></div>
          <div className="mb-5"><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search opportunities" className="w-full rounded-full border border-[#d7d0c4] bg-white px-4 py-3 text-sm outline-none focus:border-[#006b73] sm:max-w-sm" /></div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((item) => <article key={item.id} className="flex flex-col overflow-hidden rounded-lg border border-[#d7d0c4] bg-[#f8f4ef] shadow-sm">{item.image ? <img src={item.image} alt="" className="h-32 w-full object-cover" /> : <div className="grid h-32 place-items-center bg-[#e8efed] text-xs text-[#5d6d6d]">No image</div>}<div className="flex flex-1 flex-col p-4"><span className="w-fit rounded-full bg-[#edf5f2] px-2 py-1 text-[9px] font-semibold text-[#1d4b4c]">{item.category}</span><h3 className="mt-2 text-sm font-semibold text-[#1d3f42]">{item.title}</h3><p className="mt-1 text-[10px] text-[#5f7274]">{item.location}</p><p className="mt-3 flex-1 text-[11px] leading-4 text-[#5d6d6d]">{item.objective}</p><div className="mt-3 grid grid-cols-2 gap-2 text-[10px]"><span className="rounded bg-[#f0f3f0] p-2">Goal <b className="block text-[#1f4043]">{item.goal}</b></span><span className="rounded bg-[#f0f3f0] p-2">Term <b className="block text-[#1f4043]">{item.term}</b></span></div><button type="button" onClick={() => setSelectedOpportunity(item)} className="mt-3 w-full rounded-md bg-[#006b73] px-3 py-2 text-[10px] font-bold uppercase text-white hover:bg-[#005159]">Invest</button></div></article>)}
          </div>
          {filtered.length === 0 && <p className="rounded-lg border border-dashed border-[#cbd4d3] p-10 text-center text-sm text-[#446062]">No opportunities found.</p>}
        </section>

        <section className="mt-8 border-y border-dashed border-[#cbd4d3] px-2 py-8 text-center"><h2 className="text-sm font-semibold text-[#1d3f42]">Your investment data will appear here</h2><p className="mt-2 text-xs text-[#5d6d6d]">Once you record investments and payments, you can view your portfolio metrics.</p></section>
      </div>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#173f43] px-4 py-3 text-xs font-semibold text-white shadow-lg">{notice}</div>}
      {selectedOpportunity && (() => {
        const progress = selectedOpportunity.goalAmount > 0
          ? Math.min((selectedOpportunity.raisedAmount / selectedOpportunity.goalAmount) * 100, 100)
          : 0;
        const amount = Number(montoInversion || 0);
        const available = Math.max(selectedOpportunity.goalAmount - selectedOpportunity.raisedAmount, 0);
        return (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#173f43]/55 p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="investment-detail-title">
            <div className="mx-auto my-6 w-full max-w-2xl overflow-hidden rounded-2xl bg-[#f8f4ef] shadow-2xl">
              <div className="relative h-48 bg-[#dcece8]">
                {selectedOpportunity.image ? <img src={selectedOpportunity.image} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-sm text-[#5d6d6d]">No project image</div>}
                <button type="button" onClick={() => { setSelectedOpportunity(null); setMontoInversion(''); }} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#526164] shadow" aria-label="Close"><X size={18} /></button>
              </div>
              <div className="p-5 sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#1b7f61]">Project details</p>
                <h2 id="investment-detail-title" className="mt-2 text-2xl font-bold text-[#1d3f42]">{selectedOpportunity.title}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  {[
                    ['Category', selectedOpportunity.category],
                    ['Goal', selectedOpportunity.goal],
                    ['Raised', selectedOpportunity.raised],
                    ['Available', `$${available.toLocaleString('en-US')}`],
                  ].map(([label, value]) => <div key={label} className="rounded-lg bg-white p-3"><p className="text-[10px] uppercase tracking-wide text-[#899496]">{label}</p><p className="mt-1 text-sm font-bold text-[#1d3f42]">{value}</p></div>)}
                </div>
                <div className="mt-5"><div className="flex justify-between text-[10px] font-semibold text-[#687577]"><span>Funding progress</span><span>{progress.toFixed(0)}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#dce6e2]"><div className="h-full rounded-full bg-[#168b68]" style={{ width: `${progress}%` }} /></div></div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2"><div><p className="text-[10px] uppercase tracking-wide text-[#899496]">Project period</p><p className="mt-1 text-sm font-semibold text-[#1d3f42]">{selectedOpportunity.startDate} to {selectedOpportunity.endDate}</p></div><div><p className="text-[10px] uppercase tracking-wide text-[#899496]">Description</p><p className="mt-1 text-sm leading-5 text-[#5d6d6d]">{selectedOpportunity.objective}</p></div></div>
                <div className="mt-6 border-t border-[#e0d9cf] pt-5"><p className="text-sm font-bold text-[#1d3f42]">Decide your investment</p><p className="mt-1 text-xs text-[#687577]">The investment will be recorded as pending payment.</p><label className="mt-4 block text-xs font-semibold text-[#526164]">Amount to invest<input type="number" min="1" max={available || undefined} value={montoInversion} onChange={(event) => setMontoInversion(event.target.value)} className="mt-2 w-full rounded-md border border-[#ccd6d3] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#006b73]" placeholder="500" /></label>{amount > 0 && <p className="mt-2 text-xs text-[#1b7f61]">This represents {selectedOpportunity.goalAmount > 0 ? ((amount / selectedOpportunity.goalAmount) * 100).toFixed(2) : '0.00'}% of the project goal.</p>}<div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => { setSelectedOpportunity(null); setMontoInversion(''); }} className="rounded-md border border-[#ccd6d3] px-4 py-2.5 text-xs font-semibold text-[#526164]">Cancel</button><button type="button" onClick={confirmInvestment} disabled={invirtiendo} className="rounded-md bg-[#006b73] px-5 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#005159] disabled:opacity-60">{invirtiendo ? 'Saving...' : 'Confirm investment'}</button></div></div>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}

export default DashboardInversionista;
