import { useState } from 'react';
import { CheckCircle2, CreditCard, Landmark, LockKeyhole, X } from 'lucide-react';

const paymentOptions = [
  { id: 'Tarjeta simulada', label: 'Tarjeta de prueba', description: 'Pago ficticio, sin ingresar datos de tarjeta.', icon: CreditCard },
  { id: 'Transferencia simulada', label: 'Transferencia de prueba', description: 'Confirmación inmediata para demostración.', icon: Landmark },
];

function SimulatedPaymentModal({ open, amount, projectName, onClose, onConfirm }) {
  const [method, setMethod] = useState(paymentOptions[0].id);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const closeModal = () => {
    setProcessing(false);
    setError('');
    setMethod(paymentOptions[0].id);
    onClose();
  };

  const simulatePayment = async () => {
    setProcessing(true);
    setError('');
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      await onConfirm(method);
      setProcessing(false);
      setMethod(paymentOptions[0].id);
    } catch (paymentError) {
      setError(paymentError?.message || 'No se pudo registrar la simulación. Inténtalo de nuevo.');
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-[#123b3d]/65 p-2 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="simulated-payment-title">
      <section className="my-auto flex max-h-[calc(100dvh-1rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)]">
        <header className="relative bg-[linear-gradient(135deg,#07575d,#118573)] px-6 py-6 text-white sm:px-8">
          <button type="button" onClick={closeModal} disabled={processing} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 transition hover:bg-white/25 disabled:opacity-50" aria-label="Cerrar pasarela"><X size={18} /></button>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15"><CreditCard size={23} /></span>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[.2em] text-white/75">Checkout de demostración</p>
          <h2 id="simulated-payment-title" className="mt-1 text-2xl font-bold">Confirmar inversión</h2>
          <p className="mt-1 text-sm text-white/80">{projectName}</p>
        </header>

        <div className="space-y-4 overflow-y-auto p-4 sm:space-y-5 sm:p-8">
          <div className="flex items-center justify-between rounded-2xl border border-[#e4ece8] bg-[#f7faf8] p-4">
            <div><p className="text-xs text-[#718083]">Total de prueba</p><p className="mt-1 text-xs font-semibold text-[#25484a]">No se realizará ningún cobro</p></div>
            <strong className="text-2xl text-[#0b5d61]">${Number(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>

          <fieldset className="space-y-3">
            <legend className="mb-3 text-sm font-bold text-[#1d3f42]">Elige un método simulado</legend>
            {paymentOptions.map(({ id, label, description, icon: Icon }) => (
              <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${method === id ? 'border-[#0b817d] bg-[#f0faf6] ring-2 ring-[#0b817d]/10' : 'border-[#e2e9e5] hover:border-[#a8c9be]'}`}>
                <input type="radio" name="simulated-payment-method" value={id} checked={method === id} onChange={() => setMethod(id)} className="accent-[#0b817d]" disabled={processing} />
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#0b5d61] shadow-sm"><Icon size={19} /></span>
                <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-[#25484a]">{label}</span><span className="mt-0.5 block text-xs text-[#718083]">{description}</span></span>
              </label>
            ))}
          </fieldset>

          <p className="flex gap-2 rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-900"><LockKeyhole size={15} className="mt-0.5 shrink-0" />Modo demostración: no se solicitan datos bancarios ni se conecta a una entidad financiera.</p>
          {error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800" role="alert">{error}</p>}

          <button type="button" onClick={simulatePayment} disabled={processing} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0b5d61] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#08494c] disabled:cursor-wait disabled:opacity-65">
            {processing ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Procesando simulación…</> : <><CheckCircle2 size={17} />Simular pago aprobado</>}
          </button>
          <button type="button" onClick={closeModal} disabled={processing} className="w-full py-1 text-xs font-semibold text-[#687577] hover:text-[#0b5d61] disabled:opacity-50">Cancelar</button>
        </div>
      </section>
    </div>
  );
}

export default SimulatedPaymentModal;