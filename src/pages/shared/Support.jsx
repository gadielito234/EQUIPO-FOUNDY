import { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, ChevronDown, Mail, MessageCircleQuestion, Send } from 'lucide-react';

const faqs = [
  {
    question: 'How do I update my profile information?',
    answer: 'Open Settings from the sidebar, update your details, and save your changes at the bottom of the profile section.',
  },
  {
    question: 'Where can I see my investment activity?',
    answer: 'Your investments and their current status are available in My investments. Notifications will also keep you informed about important updates.',
  },
  {
    question: 'How can I report a problem with a project?',
    answer: 'Send us the project name and a short description using the contact form. Our support team will review the report and follow up by email.',
  },
  {
    question: 'How long does support take to respond?',
    answer: 'Most requests receive a response within one business day. More complex account or payment cases may take a little longer.',
  },
];

export default function Support({ onBack, onOpenChat }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    setForm({ subject: '', message: '' });
  };

  const updateForm = (field, value) => {
    setSent(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-[#f4f6f7] text-[#31474a]">
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-12">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-xs font-semibold text-[#006b73] transition hover:text-[#004e56]">
          <ArrowLeft size={16} /> Back to home
        </button>

        <header className="mt-8 rounded-[28px] bg-[#006b73] px-6 py-8 text-white shadow-[0_16px_35px_rgba(17,52,60,0.12)] sm:px-8 sm:py-10">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#bde3dc]">Foundy help center</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">How can we help?</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#d9efeb]">Find quick answers or send a message to our support team. We are here to help you move forward with confidence.</p>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
          <section className="rounded-[24px] border border-[#dfe5e5] bg-white p-5 shadow-[0_10px_30px_rgba(17,52,60,0.04)] sm:p-6" aria-labelledby="faq-heading">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e7f5f1] text-[#006b73]"><BookOpen size={18} /></span>
              <div>
                <h2 id="faq-heading" className="text-lg font-semibold text-[#1d3f42]">Frequently asked questions</h2>
                <p className="mt-1 text-xs text-[#687577]">Quick answers to common questions.</p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-[#e5e9e8]">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question}>
                    <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-[#29494c]">
                      <span>{faq.question}</span>
                      <ChevronDown size={16} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#006b73]' : 'text-[#849193]'}`} />
                    </button>
                    {isOpen && <p className="pb-4 pr-8 text-xs leading-5 text-[#687577]">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-[24px] border border-[#dfe5e5] bg-white p-5 shadow-[0_10px_30px_rgba(17,52,60,0.04)] sm:p-6" aria-labelledby="contact-heading">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e7f5f1] text-[#006b73]"><MessageCircleQuestion size={18} /></span>
              <div>
                <h2 id="contact-heading" className="text-lg font-semibold text-[#1d3f42]">Contact support</h2>
                <p className="mt-1 text-xs text-[#687577]">Tell us what you need and we will get back to you.</p>
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-xs font-semibold text-[#526164]">
                Subject
                <input required value={form.subject} onChange={(event) => updateForm('subject', event.target.value)} className="mt-2 w-full rounded-xl border border-[#ccd8d5] bg-[#fbfcfb] px-3 py-2.5 text-sm font-normal text-[#29494c] outline-none transition focus:border-[#006b73] focus:ring-2 focus:ring-[#006b73]/10" placeholder="What do you need help with?" />
              </label>
              <label className="block text-xs font-semibold text-[#526164]">
                Message
                <textarea required value={form.message} onChange={(event) => updateForm('message', event.target.value)} className="mt-2 min-h-32 w-full resize-y rounded-xl border border-[#ccd8d5] bg-[#fbfcfb] px-3 py-2.5 text-sm font-normal text-[#29494c] outline-none transition focus:border-[#006b73] focus:ring-2 focus:ring-[#006b73]/10" placeholder="Describe your question or issue..." />
              </label>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#006b73] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#00555b]">
                <Send size={14} /> Send message
              </button>
            </form>

            {sent && <p role="status" className="mt-4 flex items-center gap-2 rounded-xl bg-[#eaf8f1] px-3 py-2.5 text-xs font-semibold text-[#1b7f61]"><CheckCircle2 size={15} /> Your request has been received.</p>}

            <div className="mt-6 border-t border-[#e5e9e8] pt-5">
              <p className="text-xs font-semibold text-[#526164]">Prefer email?</p>
              <a href="mailto:support@foundy.com" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-[#006b73] hover:underline"><Mail size={14} /> support@foundy.com</a>
              {onOpenChat && <button type="button" onClick={onOpenChat} className="mt-4 block text-xs font-semibold text-[#1b7f61] hover:underline">Chat with support team</button>}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}