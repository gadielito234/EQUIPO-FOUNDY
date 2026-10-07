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
    <aside className="chat-panel flex h-[min(720px,calc(100dvh-2rem))] min-h-[min(420px,calc(100dvh-2rem))] w-full max-w-[760px] flex-col overflow-hidden rounded-[28px] border border-[#dfe9e5] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfa_100%)] shadow-[0_24px_60px_rgba(17,52,60,0.08)] ring-1 ring-white/80 sm:h-[min(720px,calc(100dvh-3rem))] sm:min-h-[520px]">
      <header className="flex items-center justify-between border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(27,153,137,0.18),transparent_40%)] p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="card-pulse grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#006b73_0%,#0f8d87_100%)] text-white shadow-[0_12px_24px_rgba(0,107,115,0.24)]">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#006b73]">Foundy</p>
            <h2 className="text-base font-black text-[#2d4043] sm:text-lg">Asistente de proyectos</h2>
            <p className="text-[11px] text-[#168b68]">{loading ? 'Escribiendo...' : 'Consultoría para tu idea'}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={resetConversation}
          className="grid h-9 w-9 place-items-center rounded-xl text-[#687577] transition hover:bg-slate-100 hover:text-[#006b73]"
          aria-label="Reiniciar conversación"
          title="Nueva conversación"
        >
          <RotateCcw size={16} />
        </button>
      </header>

      <div ref={transcriptRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,#f6fbfa_0%,#fbfcfb_100%)] p-3.5 sm:p-5" role="log" aria-live="polite" aria-label="Conversación con el asistente">
        {messages.map((message, index) => {
          const isAssistant = message.role === 'assistant';
          return (
            <div key={`${message.role}-${index}`} className={`chat-message flex items-end gap-2.5 ${isAssistant ? '' : 'flex-row-reverse'}`}>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${isAssistant ? 'bg-[#e0f1eb] text-[#006b73]' : 'bg-[#e7ecf1] text-[#465266]'}`}>
                {isAssistant ? <Bot size={15} /> : <User size={15} />}
              </span>
              <p className={`m-0 max-w-[87%] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-xs leading-5 sm:text-sm ${isAssistant ? 'rounded-tl-sm bg-white text-[#424a4c] shadow-[0_8px_18px_rgba(15,46,50,0.05)] ring-1 ring-slate-100' : 'rounded-tr-sm bg-[linear-gradient(135deg,#006b73_0%,#0a7b7f_100%)] text-white shadow-[0_12px_24px_rgba(0,107,115,0.18)]'}`}>
                {message.content}
              </p>
            </div>
          );
        })}
        {loading && (
          <div className="chat-message flex items-end gap-2.5 text-xs text-[#687577]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e0f1eb] text-[#006b73]"><Bot size={15} /></span>
            <span className="rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-[0_8px_18px_rgba(15,46,50,0.05)] ring-1 ring-slate-100">
              <span className="inline-flex items-center gap-1.5">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </span>
            </span>
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="border-t border-slate-100 bg-white/70 px-3 pt-3 sm:px-4 sm:pt-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#899496]">Prueba preguntando</p>
          <div className="flex flex-wrap gap-2 pb-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendQuery(prompt)}
                disabled={loading}
                className="max-w-full whitespace-normal rounded-full border border-[#d6e5df] bg-[#f3faf6] px-3 py-2 text-left text-[10px] font-semibold text-[#1d4b4c] transition hover:border-[#0b817d] hover:bg-[#e5f5ef] hover:shadow-[0_10px_18px_rgba(27,153,137,0.10)] disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="mx-3 mt-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-800 shadow-sm sm:mx-4" role="alert">
          <p className="font-bold">No se pudo obtener una respuesta</p>
          <p>{error}</p>
          <button type="button" onClick={retryLastMessage} className="mt-1 font-bold underline" disabled={loading || messages.at(-1)?.role !== 'user'}>
            Reintentar
          </button>
        </div>
      )}

      <form
        className="border-t border-slate-100 bg-white/80 p-3.5 sm:p-4"
        onSubmit={(event) => {
          event.preventDefault();
          sendQuery();
        }}
      >
        <div className="flex items-end gap-2 rounded-2xl border border-[#cbd8d4] bg-white p-2 shadow-[0_8px_20px_rgba(15,46,50,0.04)] transition focus-within:border-[#168b88] focus-within:ring-4 focus-within:ring-[#168b88]/10">
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
            className="max-h-28 min-h-10 min-w-0 flex-1 resize-y bg-transparent px-2 py-1.5 text-xs leading-5 text-[#424a4c] outline-none placeholder:text-[#899496] sm:text-sm"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#006b73_0%,#0d8d8b_100%)] text-white shadow-[0_12px_20px_rgba(0,107,115,0.18)] transition hover:-translate-y-0.5 hover:bg-[#00545b] disabled:cursor-not-allowed disabled:opacity-40"
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
