import { useState } from 'react';
import { BriefcaseBusiness, Building2, Gauge, Mail, MessageSquareText, Star, Target } from 'lucide-react';
import { supabase } from '../../services/supabase.js';

export default function PerfilPublicoInversionista({
  usuarioData,
  onOpenProfileSettings,
  onSavePublicProfile,
}) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [displayName, setDisplayName] = useState(usuarioData?.usuario || '');
  const [email, setEmail] = useState(usuarioData?.correo || '');
  const [interests, setInterests] = useState((usuarioData?.intereses || ['Technology', 'Retail', 'Agriculture', 'Sustainability']).join(', '));
  const [biography, setBiography] = useState(usuarioData?.biografia || '');
  const [investmentRange, setInvestmentRange] = useState(usuarioData?.rango_inversion || '$25,000 - $50,000');
  const [riskLevel, setRiskLevel] = useState(usuarioData?.nivel_riesgo || 'Medium');
  const [contactAvailability, setContactAvailability] = useState(usuarioData?.disponibilidad_contacto || 'Available for new conversations');

  const nombre = usuarioData?.usuario || 'Investor';
  const correo = usuarioData?.correo || 'inversionista@foundy.com';
  const intereses = usuarioData?.intereses || ['Technology', 'Retail', 'Agriculture', 'Sustainability'];
  const biografia = usuarioData?.biografia || 'Investor focused on sustainable growth, strong teams, and clear market presence. Looking for opportunities with expansion potential and social impact.';
  const monto = usuarioData?.rango_inversion || '$25,000 - $50,000';
  const riesgo = usuarioData?.nivel_riesgo || 'Medium';
  const disponibilidadContacto = usuarioData?.disponibilidad_contacto || 'Available for new conversations';

  const abrirEditor = () => {
    setDisplayName(usuarioData?.usuario || '');
    setEmail(usuarioData?.correo || '');
    setInterests((usuarioData?.intereses || ['Technology', 'Retail', 'Agriculture', 'Sustainability']).join(', '));
    setBiography(usuarioData?.biografia || '');
    setInvestmentRange(usuarioData?.rango_inversion || '$25,000 - $50,000');
    setRiskLevel(usuarioData?.nivel_riesgo || 'Medium');
    setContactAvailability(usuarioData?.disponibilidad_contacto || 'Available for new conversations');
    setEditorOpen(true);
  };

  const guardarPerfil = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('Usuario')
      .update({ correo: email, usuario: displayName })
      .eq('dui', usuarioData?.dui);
    setSaving(false);

    if (error) {
      setNotice(`Profile could not be saved: ${error.message}`);
      return;
    }

    onSavePublicProfile?.({
      correo: email,
      usuario: displayName,
      intereses: interests.split(',').map((interest) => interest.trim()).filter(Boolean),
      biografia: biography,
      rango_inversion: investmentRange,
      nivel_riesgo: riskLevel,
      disponibilidad_contacto: contactAvailability,
    });
    setEditorOpen(false);
    setNotice('Public profile updated.');
  };

  return (
    <main className="min-h-screen bg-[#f3f7f5] text-[#1d3f42]">
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-12">
        <section className="mt-8 overflow-hidden rounded-[30px] border border-[#dfe7e5] bg-white shadow-[0_16px_35px_rgba(17,52,60,0.06)]">
          <div className="bg-gradient-to-r from-[#0b5d61] via-[#0d6d6f] to-[#199a8e] px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-full border-4 border-white/80 bg-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
                    alt={nombre}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d3f2ea]">Investor</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight">{nombre}</h1>
                  <p className="mt-1 text-sm text-white/80">Public profile · Foundy</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenProfileSettings || abrirEditor}
                  className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0b5d61] transition hover:bg-[#eaf8f6]"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <section className="rounded-[24px] border border-[#e6eeec] bg-[#f9fbfa] p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e0f5f0] text-[#0b5d61]">
                    <Target size={18} />
                  </span>
                  <h2 className="text-lg font-bold text-[#1d3f42]">Investment interests</h2>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {intereses.map((interes) => (
                    <span key={interes} className="rounded-full border border-[#dfe7e5] bg-white px-3 py-1.5 text-xs font-semibold text-[#3d585b]">
                      {interes}
                    </span>
                  ))}
                </div>
              </section>

              <section className="rounded-[24px] border border-[#e6eeec] bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e8f5f0] text-[#0b5d61]">
                    <BriefcaseBusiness size={18} />
                  </span>
                  <h2 className="text-lg font-bold text-[#1d3f42]">Professional profile</h2>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#5d7277]">
                  {biografia}
                </p>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-[24px] border border-[#e6eeec] bg-[#f9fbfa] p-5">
                <h2 className="text-lg font-bold text-[#1d3f42]">Summary</h2>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e7f5f1] text-[#0b5d61]">
                      <Building2 size={16} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#738385]">Range</p>
                      <p className="text-sm font-semibold text-[#1d3f42]">{monto}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f5f0] text-[#0b5d61]">
                      <Gauge size={16} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#738385]">Risk</p>
                      <p className="text-sm font-semibold text-[#1d3f42]">{riesgo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eef8f5] text-[#0b5d61]">
                      <Star size={16} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#738385]">Rating</p>
                      <p className="text-sm font-semibold text-[#1d3f42]">Top 12% of the ecosystem</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-[#e6eeec] bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e8f5f0] text-[#0b5d61]">
                    <Mail size={18} />
                  </span>
                  <h2 className="text-lg font-bold text-[#1d3f42]">Contact</h2>
                </div>

                <div className="mt-4 space-y-3 text-sm text-[#5d7277]">
                  <p className="flex items-center gap-2">
                    <Mail size={14} className="text-[#0b5d61]" />
                    {correo}
                  </p>
                  <p className="flex items-center gap-2">
                    <MessageSquareText size={14} className="text-[#0b5d61]" />
                    {disponibilidadContacto}
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>

      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#123f43]/55 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditorOpen(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="editar-perfil-titulo" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[26px] bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b817d]">Public profile</p>
                <h2 id="editar-perfil-titulo" className="mt-2 text-2xl font-bold text-[#1d3f42]">Edit profile</h2>
                <p className="mt-1 text-sm text-[#64777a]">Update the information other users will see.</p>
              </div>
              <button type="button" onClick={() => setEditorOpen(false)} aria-label="Close window" className="rounded-full px-3 py-1 text-2xl leading-none text-[#6b7a7c] transition hover:bg-[#eef5f2] hover:text-[#1d3f42]">&times;</button>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[#314f52]">
                <span className="mb-2 block">Nombre visible</span>
                <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 font-normal outline-none focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]" />
              </label>
              <label className="text-sm font-semibold text-[#314f52]">
                <span className="mb-2 block">Contact email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 font-normal outline-none focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]" />
              </label>
              <label className="text-sm font-semibold text-[#314f52] sm:col-span-2">
                <span className="mb-2 block">Interests</span>
                <input value={interests} onChange={(event) => setInterests(event.target.value)} placeholder="Technology, Retail, Sustainability" className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 font-normal outline-none focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]" />
                <span className="mt-1 block text-xs font-normal text-[#718487]">Separate them with commas.</span>
              </label>
              <label className="text-sm font-semibold text-[#314f52] sm:col-span-2">
                <span className="mb-2 block">Biography</span>
                <textarea value={biography} onChange={(event) => setBiography(event.target.value)} rows={4} placeholder="Tell entrepreneurs what kind of investor you are." className="w-full resize-y rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 font-normal outline-none focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]" />
              </label>
              <label className="text-sm font-semibold text-[#314f52]">
                <span className="mb-2 block">Investment range</span>
                <input value={investmentRange} onChange={(event) => setInvestmentRange(event.target.value)} className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 font-normal outline-none focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]" />
              </label>
              <label className="text-sm font-semibold text-[#314f52]">
                <span className="mb-2 block">Risk level</span>
                <select value={riskLevel} onChange={(event) => setRiskLevel(event.target.value)} className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 font-normal outline-none focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]">
                  <option>Bajo</option>
                  <option>Medio</option>
                  <option>Alto</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-[#314f52] sm:col-span-2">
                <span className="mb-2 block">Contact availability</span>
                <input value={contactAvailability} onChange={(event) => setContactAvailability(event.target.value)} className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 font-normal outline-none focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]" />
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#e8efed] pt-5">
              <button type="button" onClick={() => setEditorOpen(false)} className="rounded-full border border-[#d5e2df] px-5 py-2.5 text-sm font-semibold text-[#476164] transition hover:bg-[#f1f6f4]">Cancel</button>
              <button type="button" onClick={guardarPerfil} disabled={saving} className="rounded-full bg-[#0b817d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#076b68] disabled:opacity-60">{saving ? 'Saving...' : 'Save changes'}</button>
            </div>
          </section>
        </div>
      )}

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-[#173f43] px-4 py-3 text-xs font-semibold text-white shadow-lg">{notice}</div>}
    </main>
  );
}
