import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.js';
import { useI18n } from '../../services/i18n.js';

function Switch({ enabled, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1ca38b]/30 ${
        enabled ? 'bg-[#1ca38b]' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function PerfilConfiguracion({
  usuarioData,
  onCerrarSesion,
  onBackHome,
  onOpenFoundyCard,
  onOpenChat,
  mode = 'platform',
  onSavePublicProfile,
  onOpenPolicies,
}) {
  const { t, language, setLanguage } = useI18n();
  const isProfileMode = mode === 'profile';
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [marketingInsights, setMarketingInsights] = useState(false);
  const [theme, setTheme] = useState('Light');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [confirmDeactivateOpen, setConfirmDeactivateOpen] = useState(false);
  const [form, setForm] = useState({
    email: '',
    displayName: '',
    password: '',
    profilePicture: '',
    biography: '',
    interests: '',
    investmentRange: '',
    riskLevel: 'Medium',
    contactAvailability: '',
  });

  useEffect(() => {
    const profilePicture = usuarioData?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80';
    const interests = Array.isArray(usuarioData?.intereses) && usuarioData.intereses.length
      ? usuarioData.intereses
      : ['Technology', 'Retail', 'Agriculture', 'Sustainability'];

    setForm({
      email: usuarioData?.correo || '',
      displayName: usuarioData?.usuario || 'Maya Johnson',
      password: '',
      profilePicture,
      biography: usuarioData?.biografia || '',
      interests: interests.join(', '),
      investmentRange: usuarioData?.rango_inversion || '$25,000 - $50,000',
      riskLevel: usuarioData?.nivel_riesgo || 'Medium',
      contactAvailability: usuarioData?.disponibilidad_contacto || 'Available for new conversations',
    });
  }, [usuarioData]);

  const handleDeactivate = () => {
    setConfirmDeactivateOpen(true);
  };

  const confirmDeactivate = () => {
    setConfirmDeactivateOpen(false);
    onCerrarSesion?.();
    onBackHome?.();
  };

  const openPolicies = () => {
    onOpenPolicies?.();
  };

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const storage = supabase?.storage;

      if (storage?.from) {
        const extension = file.name.split('.').pop() || 'png';
        const fileName = `${usuarioData?.dui || 'avatar'}-${Date.now()}.${extension}`;
        const { error: uploadError } = await storage.from('project-images').upload(fileName, file, {
          upsert: true,
        });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = storage.from('project-images').getPublicUrl(fileName);
        updateField('profilePicture', data?.publicUrl || '');
      } else {
        updateField('profilePicture', URL.createObjectURL(file));
      }
    } catch (error) {
      setNotice(error.message || 'No se pudo subir la foto de perfil.');
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    const payload = {
      correo: form.email,
      usuario: form.displayName,
      avatar: form.profilePicture,
      biografia: form.biography,
      intereses: form.interests
        .split(',')
        .map((interest) => interest.trim())
        .filter(Boolean),
      rango_inversion: form.investmentRange,
      nivel_riesgo: form.riskLevel,
      disponibilidad_contacto: form.contactAvailability,
    };

    if (form.password.trim()) {
      payload.contrasena = form.password.trim();
    }

    try {
      if (usuarioData?.dui) {
        const { error } = await supabase
          .from('Usuario')
          .update(payload)
          .eq('dui', usuarioData.dui);

        if (error) {
          throw error;
        }
      }

      onSavePublicProfile?.(payload);
      setNotice('Perfil actualizado correctamente.');
    } catch (error) {
      setNotice(`No se pudo guardar el perfil: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {isProfileMode ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1ca38b]">{t('investorProfile')}</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#193b40]">{t('profileInformation')}</h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[26px] border border-[#dfe7e5] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold text-[#1d3f42]">{t('personalData')}</h3>
                <button type="button" className="rounded-full bg-[#0d5c5d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a4b4d]">{t('edit')}</button>
              </div>
              <p className="mt-2 text-sm text-[#5d7277]">{t('basicAccountInformation')}</p>

              <div className="mt-6 space-y-5">
                <label className="block text-sm font-medium text-[#314f52]">
                  <span className="mb-2 block">{t('profilePhoto')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                  />
                </label>

                {form.profilePicture && (
                  <div className="mt-3">
                    <img src={form.profilePicture} alt="Profile preview" className="h-24 w-24 rounded-full object-cover border border-[#dce7e4] bg-[#f8fbfa]" />
                  </div>
                )}

                <label className="block text-sm font-medium text-[#314f52]">
                  <span className="mb-2 block">{t('name')}</span>
                  <input
                    type="text"
                    value={form.displayName}
                    onChange={(event) => updateField('displayName', event.target.value)}
                    className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                  />
                </label>

                <label className="block text-sm font-medium text-[#314f52]">
                  <span className="mb-2 block">{t('email')}</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                  />
                </label>

                <label className="block text-sm font-medium text-[#314f52]">
                  <span className="mb-2 block">{t('password')}</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => updateField('password', event.target.value)}
                    placeholder={t('leaveBlank')}
                    className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[26px] border border-[#dfe7e5] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold text-[#1d3f42]">{t('publicProfile')}</h3>
                <button type="button" className="rounded-full bg-[#0d5c5d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a4b4d]">{t('edit')}</button>
              </div>
              <p className="mt-2 text-sm text-[#5d7277]">{t('publicProfileDescription')}</p>

              <div className="mt-6 space-y-5">
                <label className="block text-sm font-medium text-[#314f52]">
                    <span className="mb-2 block">{t('interests')}</span>
                  <input
                    type="text"
                    value={form.interests}
                    onChange={(event) => updateField('interests', event.target.value)}
                    className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                  />
                </label>

                <label className="block text-sm font-medium text-[#314f52]">
                    <span className="mb-2 block">{t('biography')}</span>
                  <textarea
                    value={form.biography}
                    rows={4}
                    onChange={(event) => updateField('biography', event.target.value)}
                    className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                  />
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block text-sm font-medium text-[#314f52]">
                    <span className="mb-2 block">{t('range')}</span>
                    <input
                      type="text"
                      value={form.investmentRange}
                      onChange={(event) => updateField('investmentRange', event.target.value)}
                      className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#314f52]">
                    <span className="mb-2 block">{t('risk')}</span>
                    <select
                      value={form.riskLevel}
                      onChange={(event) => updateField('riskLevel', event.target.value)}
                      className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                    >
                      <option value="Low">{t('low')}</option>
                      <option value="Medium">{t('medium')}</option>
                      <option value="High">{t('high')}</option>
                    </select>
                  </label>
                </div>

                <label className="block text-sm font-medium text-[#314f52]">
                  <span className="mb-2 block">{t('contact')}</span>
                  <input
                    type="text"
                    value={form.contactAvailability}
                    onChange={(event) => updateField('contactAvailability', event.target.value)}
                    className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3 text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                  />
                </label>
              </div>
            </section>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button type="button" onClick={onBackHome} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">{t('back')}</button>
            <button type="button" onClick={handleSaveProfile} disabled={saving} className="rounded-full bg-[#0d5c5d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a4b4d] disabled:opacity-60">
              {saving ? t('saving') : t('saveChanges')}
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <section className="rounded-[24px] border border-[#dfe7e5] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black tracking-tight text-[#1a3a3e]">{t('platformSettings')}</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#314f52]">{t('preferredLanguage')}</label>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-3 py-2.5 text-sm text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                >
                  <option value="es">{t('spanish')}</option>
                  <option value="en">{t('english')}</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#314f52]">{t('theme')}</label>
                <select
                  value={theme}
                  onChange={(event) => setTheme(event.target.value)}
                  className="w-full rounded-xl border border-[#dce7e4] bg-[#f8fbfa] px-3 py-2.5 text-sm text-[#1d3f42] outline-none transition focus:border-[#1ca38b] focus:ring-2 focus:ring-[#dff5f0]"
                >
                  <option value="Light">{t('light')}</option>
                  <option value="Dark">{t('dark')}</option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-[#dfe7e5] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-[#1a3a3e]">{t('notificationsTitle')}</h2>
                <p className="mt-1 text-sm text-[#5d7277]">{t('chooseAlerts')}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTransactionAlerts(true);
                  setMarketingInsights(true);
                }}
                className="rounded-full border border-[#d7e4e2] bg-[#f3f7f6] px-4 py-2 text-sm font-semibold text-[#476164] transition hover:bg-[#edf4f2]"
              >
                {t('manageAll')}
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-[18px] border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3">
                <div>
                  <p className="text-base font-bold text-[#1d3f42]">{t('transactionAlerts')}</p>
                  <p className="mt-1 text-sm text-[#5d7277]">{t('transactionAlertsDescription')}</p>
                </div>
                <Switch enabled={transactionAlerts} onChange={setTransactionAlerts} />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-[18px] border border-[#dce7e4] bg-[#f8fbfa] px-4 py-3">
                <div>
                  <p className="text-base font-bold text-[#1d3f42]">{t('marketingInsights')}</p>
                  <p className="mt-1 text-sm text-[#5d7277]">{t('marketingInsightsDescription')}</p>
                </div>
                <Switch enabled={marketingInsights} onChange={setMarketingInsights} />
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-[#dfe7e5] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight text-[#1a3a3e]">{t('policies')}</h2>
                <p className="mt-1 text-sm text-[#5d7277]">{t('policiesDescription')}</p>
              </div>
              <button
                type="button"
                onClick={openPolicies}
                className="rounded-full bg-[#0d5c5d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a4b4d]"
              >
                {t('viewPolicies')}
              </button>
            </div>
          </section>

          <section className="rounded-[24px] border border-[#f0b8b5] bg-[#fef0ef] p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-[#d84848]">{t('dangerZone')}</h2>
                <p className="mt-1 max-w-2xl text-sm text-[#d84848]">
                  {t('deactivateDescription')}
                </p>
              </div>

              <button
                type="button"
                onClick={handleDeactivate}
                className="rounded-full bg-[#d33f3f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c13434]"
              >
                {t('deactivate')}
              </button>
            </div>
          </section>
        </div>
      )}

      {notice && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-[#173f43] px-4 py-3 text-xs font-semibold text-white shadow-lg">
          {notice}
        </div>
      )}

      {confirmDeactivateOpen && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-[#173f43]/45 px-4 py-6 backdrop-blur-[2px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setConfirmDeactivateOpen(false);
            }
          }}
        >
          <div
            className="w-full max-w-md rounded-[28px] border border-[#f0b8b5] bg-[#fffaf9] p-6 shadow-[0_24px_70px_rgba(17,52,60,0.24)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-deactivate-title"
            aria-describedby="confirm-deactivate-description"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fde4e1] text-[#d94848]">
                <span className="text-lg font-black">!</span>
              </div>
              <div>
                <h3 id="confirm-deactivate-title" className="text-xl font-black text-[#1d3f42]">
                  {t('confirmDeactivation')}
                </h3>
                <p id="confirm-deactivate-description" className="mt-2 text-sm leading-6 text-[#5d7277]">
                  {t('confirmDeactivationDescription')}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfirmDeactivateOpen(false)}
                className="rounded-xl border border-[#ccd8d5] px-4 py-2.5 text-sm font-semibold text-[#526164] transition hover:bg-[#f0f3f0]"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={confirmDeactivate}
                className="rounded-xl bg-[#d33f3f] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#c13434]"
              >
                {t('deactivate')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
