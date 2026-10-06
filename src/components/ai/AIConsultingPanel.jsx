import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Bot, RotateCcw, Sparkles, User } from 'lucide-react';
import { askGemini } from '../../services/aiService';

const quickPrompts = [
  'Ayudame a mejorar la descripcion de mi proyecto.',
  'Que fortalezas y riesgos ves en mi idea?',
  'Revisa si mi monto y ganancia estimada son coherentes.',
  'Sugiere un nombre atractivo para mi proyecto.',
];

const welcomeMessage = {
  role: 'assistant',
  content: '¡Hola! Puedo ayudarte a mejorar tu idea, revisar la descripción, pensar en riesgos o analizar las cifras que ingresaste. ¿Por dónde empezamos?',
};

function AIConsultingPanel({ project }) {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const transcriptRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (transcript) transcript.scrollTop = transcript.scrollHeight;
  }, [messages, loading]);

  const sendQuery = async (prompt = query, previousMessages = messages) => {
    const text = prompt.trim();
    if (!text || loading) return;

    const history = previousMessages
      .filter((message) => message.role === 'user' || message.role === 'assistant')
      .slice(-12)
      .map(({ role, content }) => ({ role, content }));
    const userMessage = { role: 'user', content: text };

    setMessages((current) => [...current, userMessage]);
    setQuery('');
    setError('');
    setLoading(true);

    try {
      const reply = await askGemini(text, {
        nombre: project.nombre,
        descripcion: project.descripcion,
        monto: project.monto,
        ganancia_esperada: project.ganancia_esperada,
        retorno_meses: project.retorno,
      }, history);
      setMessages((current) => [...current, { role: 'assistant', content: reply }]);
    } catch (requestError) {
      setError(requestError.message || 'No se pudo contactar al asistente. Intenta de nuevo.');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const resetConversation = () => {
    setMessages([welcomeMessage]);
    setError('');
    setQuery('');
  };

  const retryLastMessage = () => {
    const failedMessage = messages.at(-1);
    if (failedMessage?.role !== 'user') return;
    setMessages((current) => current.slice(0, -1));
    sendQuery(failedMessage.content, messages.slice(0, -1));
  };

  return (
    <aside className="flex h-[min(720px,calc(100vh-3rem))] min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#424a4c]/15 bg-white shadow-[0_12px_35px_rgba(20,65,65,0.06)]">
      <header className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#006b73] text-white">
            <Sparkles size={19} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#006b73]">Foundy</p>
            <h2 className="text-lg font-black text-[#424a4c]">Asistente de proyectos</h2>
            <p className="text-[11px] text-[#168b68]">{loading ? 'Escribiendo...' : 'Consultoría para tu idea'}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={resetConversation}
          className="grid h-9 w-9 place-items-center rounded-lg text-[#687577] transition hover:bg-slate-100 hover:text-[#006b73]"
          aria-label="Reiniciar conversación"
          title="Nueva conversación"
        >
          <RotateCcw size={16} />
        </button>
      </header>

      <div ref={transcriptRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#fbfcfa] p-4 sm:p-5" role="log" aria-live="polite" aria-label="Conversación con el asistente">
        {messages.map((message, index) => {
          const isAssistant = message.role === 'assistant';
          return (
            <div key={`${message.role}-${index}`} className={`flex items-start gap-2.5 ${isAssistant ? '' : 'flex-row-reverse'}`}>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${isAssistant ? 'bg-[#e0f1eb] text-[#006b73]' : 'bg-[#e8eaef] text-[#465266]'}`}>
                {isAssistant ? <Bot size={15} /> : <User size={15} />}
              </span>
              <p className={`m-0 max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-xs leading-5 ${isAssistant ? 'rounded-tl-sm bg-white text-[#424a4c] shadow-sm ring-1 ring-slate-100' : 'rounded-tr-sm bg-[#006b73] text-white'}`}>
                {message.content}
              </p>
            </div>
          );
        })}
        {loading && (
          <div className="flex items-center gap-2.5 text-xs text-[#687577]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e0f1eb] text-[#006b73]"><Bot size={15} /></span>
            <span className="rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm ring-1 ring-slate-100">Estoy revisando tu consulta...</span>
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="border-t border-slate-100 px-4 pt-4 sm:px-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#899496]">Prueba preguntando</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendQuery(prompt)}
                disabled={loading}
                className="shrink-0 rounded-full border border-[#d6e5df] bg-[#f3faf6] px-3 py-2 text-left text-[10px] font-semibold text-[#1d4b4c] transition hover:border-[#0b817d] hover:bg-[#e5f5ef] disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="mx-4 mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-800 sm:mx-5" role="alert">
          <p className="font-bold">No se pudo obtener una respuesta</p>
          <p>{error}</p>
          <button type="button" onClick={retryLastMessage} className="mt-1 font-bold underline" disabled={loading || messages.at(-1)?.role !== 'user'}>
            Reintentar
          </button>
        </div>
      )}

      <form
        className="border-t border-slate-100 p-4 sm:p-5"
        onSubmit={(event) => {
          event.preventDefault();
          sendQuery();
        }}
      >
        <div className="flex items-end gap-2 rounded-xl border border-[#cbd8d4] bg-white p-2 focus-within:border-[#168b88] focus-within:ring-4 focus-within:ring-[#168b88]/10">
          <textarea
            ref={inputRef}
            rows={2}
            maxLength={4000}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendQuery();
              }
            }}
            placeholder="Escribe tu pregunta..."
            aria-label="Escribe tu pregunta para el asistente"
            className="max-h-28 min-h-10 min-w-0 flex-1 resize-y bg-transparent px-2 py-1.5 text-xs leading-5 text-[#424a4c] outline-none placeholder:text-[#899496]"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#006b73] text-white transition hover:bg-[#00545b] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Enviar mensaje"
          >
            <ArrowUp size={17} />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-[#899496]">Enter para enviar · Shift + Enter para nueva línea</p>
      </form>
    </aside>
  );
}

export default AIConsultingPanel;
