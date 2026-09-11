import { useState } from 'react';
import { askGemini } from '../../services/aiService';

const quickPrompts = [
  {
    label: 'Generate name',
    prompt: 'Sugiere tres nombres memorables para este proyecto y explica brevemente la mejor opcion.',
  },
  {
    label: 'Improve description',
    prompt: 'Mejora la descripcion de este proyecto para que sea clara, convincente y util para potenciales inversionistas.',
  },
  {
    label: 'Calculate investment',
    prompt: 'Analiza el monto solicitado y el plazo de retorno. Indica que informacion financiera adicional deberia considerar.',
  },
];

function AIConsultingPanel({ project, onMessage }) {
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('Hello, how can I help you with your project?');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendQuery = async (prompt = query) => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || loading) return;

    setLoading(true);
    setError('');
    try {
      const response = await askGemini(trimmedPrompt, {
        nombre: project.nombre,
        descripcion: project.descripcion,
        monto: project.monto,
        retorno: project.retorno,
      });
      setReply(response);
      setQuery('');
      onMessage?.({ tipo: 'info', texto: response });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="h-fit rounded-2xl border border-[#424a4c]/15 bg-white p-5 shadow-[0_12px_35px_rgba(20,65,65,0.06)] sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006b73]">Assistant</p>
          <h2 className="mt-1 text-lg font-black text-[#424a4c]">AI Consulting</h2>
          <p className="text-[11px] text-[#424a4c]/60">MADE FOR YOU</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#006b73] text-xs font-black text-white">AI</span>
      </div>
      <div className="space-y-2">
        {quickPrompts.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => sendQuery(item.prompt)}
            disabled={loading}
            className="w-full rounded-xl bg-[#006b73] px-4 py-3 text-left text-xs font-bold text-white transition hover:bg-[#00545b] disabled:cursor-wait disabled:opacity-60"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-7 rounded-xl border border-[#424a4c]/10 bg-[#424a4c]/4 p-4">
        <div className="flex gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#006b73] text-[10px] font-bold text-white">AI</span>
          <p className="m-0 whitespace-pre-wrap text-xs leading-5 text-[#424a4c]/75">{loading ? 'Pensando...' : reply}</p>
        </div>
        {error && <p className="mt-3 text-xs leading-5 text-red-700" role="alert">{error}</p>}
        <form className="mt-5 flex items-center gap-2 rounded-lg border border-[#424a4c]/15 bg-white px-3 py-2" onSubmit={(event) => { event.preventDefault(); sendQuery(); }}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Write here..."
            aria-label="Consulta para el asistente"
            className="min-w-0 flex-1 bg-transparent text-[11px] text-[#424a4c] outline-none placeholder:text-[#424a4c]/60"
          />
          <button type="submit" disabled={loading || !query.trim()} className="text-[#00634b] disabled:opacity-40" aria-label="Enviar consulta">
            &#10148;
          </button>
        </form>
      </div>
    </aside>
  );
}

export default AIConsultingPanel;
