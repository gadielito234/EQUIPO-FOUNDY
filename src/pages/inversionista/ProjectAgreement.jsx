import { useEffect, useState } from 'react';
import { ArrowLeft, FileText, Handshake, MapPin, MessageCircle, ShieldCheck, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../components/LanguageContext.jsx';
import InvestmentContracts from '../../components/InvestmentContracts.jsx';
import SimulatedPaymentModal from '../../components/SimulatedPaymentModal.jsx';
import Chat from '../chat/Chat.jsx';
import { supabase } from '../../services/supabase.js';

const formatMoney = (value) => `$${Number(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

const formatDate = (value) => {
  if (!value) return 'Not available';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

function ProjectAgreement({ projectId, usuarioData, onBack }) {
  const { t } = useLanguage();
  const [project, setProject] = useState(null);
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('project');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [saving, setSaving] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [investmentSaved, setInvestmentSaved] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;

    const loadProject = async () => {
      setLoading(true);
      const { data: projectRow, error: projectError } = await supabase
        .from('proyecto')
        .select('*')
        .eq('id_proyecto', projectId)
        .eq('estado', 'publicado')
        .maybeSingle();

      if (!active) return;
      if (projectError || !projectRow) {
        setError(projectError?.message || t('This project is no longer available.'));
        setLoading(false);
        return;
      }

      const [categoryResult, entrepreneurResult] = await Promise.all([
        projectRow.id_categoria
          ? supabase.from('categoria').select('nombre').eq('id_categoria', projectRow.id_categoria).maybeSingle()
          : Promise.resolve({ data: null }),
        projectRow.dui
          ? supabase.from('Usuario').select('dui, nombre, apellidos, usuario').eq('dui', projectRow.dui).maybeSingle()
          : Promise.resolve({ data: null }),
      ]);

      if (!active) return;
      setProject({
        ...projectRow,
        categoryName: categoryResult.data?.nombre || projectRow.id_categoria || t('Uncategorized'),
        goalAmount: Number(projectRow.monto_objetivo || 0),
        raisedAmount: Number(projectRow.monto_recaudado || 0),
        expectedProfit: Number(projectRow.ganancia_esperada || 0),
        returnMonths: Number(projectRow.plazo_retorno_meses || 0),
      });
      setEntrepreneur(entrepreneurResult.data || null);
      setLoading(false);
    };

    loadProject();
    return () => { active = false; };
  }, [projectId, t]);

  const founderName = entrepreneur
    ? [entrepreneur.nombre, entrepreneur.apellidos].filter(Boolean).join(' ') || entrepreneur.usuario
    : t('Entrepreneur');
  const availableAmount = project ? Math.max(project.goalAmount - project.raisedAmount, 0) : 0;
  const fundingProgress = project?.goalAmount
    ? Math.min((project.raisedAmount / project.goalAmount) * 100, 100)
    : 0;
  const amount = Number(investmentAmount || 0);
  const participation = project?.goalAmount ? (amount / project.goalAmount) * 100 : 0;
  const estimatedProfitShare = project?.goalAmount
    ? (project.expectedProfit * amount) / project.goalAmount
    : 0;

  const recordInvestment = () => {
    if (!project || !usuarioData?.dui || !Number.isFinite(amount) || amount <= 0) {
      setNotice(t('Enter a valid amount to invest.'));
      return;
    }
    if (String(project.dui) === String(usuarioData.dui)) {
      setNotice(t('You cannot invest in your own project.'));
      return;
    }
    if (availableAmount <= 0 || amount > availableAmount) {
      setNotice(`${t('The maximum available amount is')} ${formatMoney(availableAmount)}.`);
      return;
    }
    if (!acceptedTerms) {
      setNotice(t('Review and accept the agreement terms before investing.'));
      return;
    }

    setPaymentModalOpen(true);
  };

  const completeSimulatedPayment = async (paymentMethod) => {
    setSaving(true);
    try {
      const paymentDate = new Date().toISOString().slice(0, 10);
      const { data: matchingInvestments, error: matchingInvestmentsError } = await supabase
        .from('inversion')
        .select('id_inversion')
        .eq('fecha', paymentDate)
        .eq('monto', amount)
        .eq('id_proyecto', project.id_proyecto)
        .eq('id_inversionista', usuarioData.dui)
        .order('id_inversion', { ascending: false });
      if (matchingInvestmentsError) throw matchingInvestmentsError;

      let investment = null;
      if (matchingInvestments?.length) {
        const candidateIds = matchingInvestments.map((row) => row.id_inversion);
        const { data: existingPayments, error: existingPaymentsError } = await supabase
          .from('pago')
          .select('id_inversion')
          .in('id_inversion', candidateIds);
        if (existingPaymentsError) throw existingPaymentsError;
        const paidInvestmentIds = new Set((existingPayments || []).map((row) => String(row.id_inversion)));
        investment = matchingInvestments.find((row) => !paidInvestmentIds.has(String(row.id_inversion))) || null;
      }

      if (!investment) {
        const { data: newInvestment, error: investmentError } = await supabase.from('inversion').insert({
          fecha: paymentDate,
          monto: amount,
          participacion: participation,
          id_proyecto: project.id_proyecto,
          id_inversionista: usuarioData.dui,
        }).select('id_inversion').single();
        if (investmentError) throw investmentError;
        investment = newInvestment;
      }

      const { error: paymentError } = await supabase.from('pago').insert({
        fecha: paymentDate,
        monto: amount,
        estado: 'paid',
        metodo: paymentMethod,
        id_inversionista: usuarioData.dui,
        id_inversion: investment.id_inversion,
      });
      if (paymentError) {
        const { error: rollbackError } = await supabase.from('inversion')
          .delete()
          .eq('id_inversion', investment.id_inversion);
        const rollbackNote = rollbackError
          ? ` No se pudo limpiar la inversión parcial ${investment.id_inversion}: ${rollbackError.message}`
          : '';
        throw new Error(`${paymentError.message}${rollbackNote}`, { cause: paymentError });
      }

      const { data: currentProject, error: readError } = await supabase
        .from('proyecto')
        .select('monto_recaudado')
        .eq('id_proyecto', project.id_proyecto)
        .single();
      if (readError) throw readError;

      const { error: updateError } = await supabase.from('proyecto')
        .update({ monto_recaudado: Number(currentProject?.monto_recaudado || 0) + amount })
        .eq('id_proyecto', project.id_proyecto);
      if (updateError) throw updateError;

      const { error: notificationError } = await supabase.from('notifications').insert({
        user_id: usuarioData.dui,
        title: 'Investment registered',
        body: `Your investment of ${formatMoney(amount)} is pending payment confirmation.`,
        is_read: false,
      });

      setInvestmentSaved(true);
      setPaymentModalOpen(false);
      setProject((current) => ({ ...current, raisedAmount: current.raisedAmount + amount }));
      setNotice(notificationError
        ? t('Investment recorded; the agreement will be generated after payment confirmation.')
        : t('Investment recorded; the agreement will be generated after payment confirmation.'));
    } catch (saveError) {
      const message = `${t('Investment could not be recorded:')} ${saveError.message}`;
      setNotice(message);
      throw new Error(message, { cause: saveError });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="min-h-full bg-[#f7f3ee] px-5 py-10 text-[#1e4043]">{t('Loading project details...')}</main>;
  }

  if (error || !project) {
    return (
      <main className="min-h-full bg-[#f7f3ee] px-5 py-10 text-[#1e4043]">
        <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0b5d61]"><ArrowLeft size={16} />{t('Back to opportunities')}</button>
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error || t('This project is no longer available.')}</p>
      </main>
    );
  }

  const tabs = [
    { id: 'project', label: t('Project'), icon: TrendingUp },
    { id: 'agreement', label: t('Agreement'), icon: FileText },
    { id: 'chat', label: t('Chat with entrepreneur'), icon: MessageCircle },
  ];

  return (
    <main className="min-h-full bg-[#f7f3ee] px-4 py-6 text-[#1e4043] sm:px-7 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <button type="button" onClick={onBack} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0b5d61] hover:text-[#07474b]"><ArrowLeft size={16} />{t('Back to opportunities')}</button>

        <section className="overflow-hidden rounded-xl border border-[#e9e2d8] bg-white">
          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
            {project.imagen_url ? <img src={project.imagen_url} alt={project.nombre} className="h-56 w-full object-cover lg:h-full lg:min-h-72" /> : <div className="grid min-h-56 place-items-center bg-[#e8efed] text-sm text-[#5d6d6d]">{t('No project image')}</div>}
            <div className="flex flex-col justify-center p-5 sm:p-8">
              <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#edf5f2] px-3 py-1 text-xs font-semibold text-[#1d4b4c]">{project.categoryName}</span><span className="flex items-center gap-1 text-xs text-[#718083]"><MapPin size={14} />{project.ubicacion || t('Location unavailable')}</span></div>
              <h1 className="mt-4 text-3xl font-bold text-[#1d3f42]">{project.nombre}</h1>
              <p className="mt-2 text-sm text-[#718083]">{t('Founded by')} <strong className="text-[#1d3f42]">{founderName}</strong></p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  [t('Funding goal'), formatMoney(project.goalAmount)],
                  [t('Raised'), formatMoney(project.raisedAmount)],
                  [t('Available'), formatMoney(availableAmount)],
                  [t('Expected project profit'), formatMoney(project.expectedProfit)],
                  [t('Estimated return period'), project.returnMonths ? `${project.returnMonths} ${t('months')}` : t('Not available')],
                  [t('Project period'), `${formatDate(project.fecha_inicio)} – ${formatDate(project.fecha_fin)}`],
                ].map(([label, value]) => <div key={label} className="rounded-lg bg-[#f6f8f6] p-3"><p className="text-[10px] uppercase tracking-wide text-[#768587]">{label}</p><p className="mt-1 text-sm font-bold text-[#1d3f42]">{value}</p></div>)}
              </div>
              <div className="mt-5"><div className="flex justify-between text-xs font-semibold text-[#687577]"><span>{t('Funding progress')}</span><span>{fundingProgress.toFixed(0)}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#dce6e2]"><div className="h-full rounded-full bg-[#168b68] transition-[width] duration-500" style={{ width: `${fundingProgress}%` }} /></div></div>
            </div>
          </div>
        </section>

        <nav className="mt-6 flex gap-1 overflow-x-auto rounded-lg border border-[#dce3df] bg-white p-1" aria-label={t('Project sections')}>
          {tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveTab(id)} aria-pressed={activeTab === id} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-4 text-sm font-semibold transition ${activeTab === id ? 'bg-[#0b5d61] text-white' : 'text-[#536568] hover:bg-[#f2f7f4]'}`}><Icon size={16} />{label}</button>)}
        </nav>

        {activeTab === 'project' && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.65fr)]">
            <article className="rounded-xl border border-[#e9e2d8] bg-white p-5 sm:p-7"><h2 className="text-lg font-bold">{t('About this project')}</h2><p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#5d6d6d]">{project.descripcion || t('No description available.')}</p></article>
            <aside className="rounded-xl border border-[#b9ded4] bg-[#f2faf7] p-5 sm:p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-[#0b5d61]"><Handshake size={20} /></span><div><h2 className="text-sm font-bold">{t('Ready to review the agreement?')}</h2><p className="mt-1 text-xs text-[#718083]">{t('Review the terms and talk with the entrepreneur before investing.')}</p></div></div><button type="button" onClick={() => setActiveTab('agreement')} className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#0b5d61] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#08494c]"><FileText size={15} />{t('Review agreement')}</button></aside>
          </section>
        )}

        {activeTab === 'agreement' && (
          <section className="mt-5 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)]">
            <div className="space-y-5">
              <section className="rounded-xl border border-[#e9e2d8] bg-white p-5 sm:p-7">
                <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#e4f3ed] text-[#0b5d61]"><FileText size={19} /></span><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#168b68]">{t('Automatically prepared')}</p><h2 className="mt-1 text-lg font-bold">{t('Agreement preview')}</h2><p className="mt-1 text-xs leading-5 text-[#718083]">{t('This draft updates with your proposed amount. The final agreement is created automatically after payment confirmation.')}</p></div></div>
                <label className="mt-6 block text-xs font-semibold text-[#526164]">{t('Amount to invest')}<span className="mt-2 flex items-center rounded-md border border-[#ccd6d3] bg-white px-3 focus-within:border-[#006b73]"><span className="text-sm text-[#718083]">$</span><input type="number" min="1" max={availableAmount || undefined} step="0.01" value={investmentAmount} onChange={(event) => setInvestmentAmount(event.target.value)} className="min-h-11 w-full border-0 bg-transparent px-2 text-sm outline-none focus:ring-0" placeholder="500" /></span></label>
                <div className="mt-5 divide-y divide-[#edf0ed] rounded-lg border border-[#e8eeea] px-4">
                  {[
                    [t('Investor'), usuarioData?.nombre ? `${usuarioData.nombre} ${usuarioData.apellidos || ''}`.trim() : usuarioData?.usuario || t('Investor')],
                    [t('Entrepreneur'), founderName],
                    [t('Project'), project.nombre],
                    [t('Proposed investment'), formatMoney(amount)],
                    [t('Estimated participation'), `${participation.toFixed(2)}%`],
                    [t('Estimated investor profit'), formatMoney(estimatedProfitShare)],
                    [t('Estimated return period'), project.returnMonths ? `${project.returnMonths} ${t('months')}` : t('Not available')],
                  ].map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-2 py-3 text-xs"><span className="text-[#718083]">{label}</span><strong className="text-right text-[#1d3f42]">{value}</strong></div>)}
                </div>
                <p className="mt-4 flex gap-2 text-[11px] leading-5 text-[#687577]"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#168b68]" />{t('Profit and timing are estimates declared by the entrepreneur, not guaranteed returns. This preview is informational and is not a signed legal contract.')}</p>
                <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-900">Pasarela de demostración: no se procesan cobros reales ni se solicitan datos bancarios.</p>
                <label className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#526164]"><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-1 accent-[#0b5d61]" />{t('I have reviewed the estimated terms and understand they are not guaranteed.')}</label>
                {investmentSaved ? <p className="mt-5 rounded-lg bg-[#e9f6ef] p-4 text-sm font-semibold text-[#176345]" role="status">{t('Investment recorded; the agreement will be generated after payment confirmation.')}</p> : <button type="button" onClick={recordInvestment} disabled={saving || availableAmount <= 0} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#0b5d61] px-5 py-3 text-sm font-bold text-white hover:bg-[#08494c] disabled:cursor-not-allowed disabled:opacity-55">{saving ? t('Saving...') : t('Confirm investment')}<TrendingUp size={16} /></button>}
              </section>
              <InvestmentContracts key={investmentSaved ? 'updated' : 'initial'} userId={usuarioData?.dui} party="investor" />
            </div>
            <aside className="h-fit rounded-xl border border-[#e9e2d8] bg-white p-5"><h2 className="text-sm font-bold">{t('What happens next?')}</h2><ol className="mt-4 space-y-4 text-xs leading-5 text-[#687577]"><li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e4f3ed] font-bold text-[#0b5d61]">1</span><span>{t('Review the draft terms and discuss questions with the entrepreneur.')}</span></li><li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e4f3ed] font-bold text-[#0b5d61]">2</span><span>{t('Confirm the amount to register your investment and pending payment.')}</span></li><li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e4f3ed] font-bold text-[#0b5d61]">3</span><span>{t('After payment is confirmed, the final agreement is generated for both parties.')}</span></li></ol><button type="button" onClick={() => setActiveTab('chat')} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#0b5d61] hover:underline"><MessageCircle size={15} />{t('Chat with entrepreneur')}</button></aside>
          </section>
        )}

        {activeTab === 'chat' && (
          <section className="mt-5 overflow-hidden rounded-xl border border-[#dfe5df] bg-white">
            <div className="border-b border-[#edf0ed] px-5 py-4"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#168b68]">{t('Project conversation')}</p><h2 className="mt-1 text-lg font-bold">{t('Chat with')} {founderName}</h2><p className="mt-1 text-xs text-[#718083]">{t('Discuss the project and proposed agreement before investing.')}</p></div>
            {project.dui ? <Chat key={`${project.id_proyecto}-${project.dui}`} usuarioData={usuarioData} initialRecipient={{ dui: project.dui, name: founderName }} initialProjectId={project.id_proyecto} compact /> : <p className="p-6 text-sm text-[#718083]">{t('The entrepreneur contact is unavailable.')}</p>}
          </section>
        )}
      </div>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-lg bg-[#173f43] px-4 py-3 text-xs font-semibold text-white shadow-lg">{notice}</div>}
      <SimulatedPaymentModal
        open={paymentModalOpen}
        amount={amount}
        projectName={project.nombre}
        onClose={() => setPaymentModalOpen(false)}
        onConfirm={completeSimulatedPayment}
      />
    </main>
  );
}

export default ProjectAgreement;