import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.js';

const sidebarItems = [
  { name: 'Home', active: false },
  { name: 'My projects', active: false },
  { name: 'Messages', active: false },
  { name: 'Settings', active: true },
  { name: 'Notifications', active: false },
];

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
  showSidebar = true,
  embeddedLayout = false,
  mode = 'platform',
  onSavePublicProfile,
}) {
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [marketingInsights, setMarketingInsights] = useState(false);
  const [email, setEmail] = useState(usuarioData?.correo || '');
  const [displayName, setDisplayName] = useState(usuarioData?.usuario || '');
  const [profilePicture, setProfilePicture] = useState(usuarioData?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80');
  const [interests, setInterests] = useState((usuarioData?.intereses || ['Technology', 'Retail', 'Agriculture', 'Sustainability']).join(', '));
  const [biography, setBiography] = useState(usuarioData?.biografia || '');
  const [investmentRange, setInvestmentRange] = useState(usuarioData?.rango_inversion || '$25,000 - $50,000');
  const [riskLevel, setRiskLevel] = useState(usuarioData?.nivel_riesgo || 'Medium');
  const [contactAvailability, setContactAvailability] = useState(usuarioData?.disponibilidad_contacto || 'Available for new conversations');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [profileModal, setProfileModal] = useState(null);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);

  const isEmbeddedLayout = Boolean(embeddedLayout);
  const showLegacyProfileSections = false;

  useEffect(() => {
    const loadPreferences = async () => {
      const { data, error } = await supabase
        .from('preferencias_usuario')
        .select('alertas_transacciones, sugerencias_marketing')
        .eq('dui', usuarioData?.dui)
        .maybeSingle();
      if (error) {
        setNotice(`Preferences could not be loaded: ${error.message}`);
        return;
      }
      if (data) {
        setTransactionAlerts(data.alertas_transacciones);
        setMarketingInsights(data.sugerencias_marketing);
      }
    };
    if (usuarioData?.dui) loadPreferences();
  }, [usuarioData?.dui]);

  const saveProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('Usuario')
      .update({ correo: email, usuario: displayName, avatar: profilePicture })
      .eq('dui', usuarioData?.dui);
    setSaving(false);
    if (error) {
      setProfileModal(null);
      setNotice(`Profile could not be saved: ${error.message}`);
      return;
    }

    setProfileModal(null);
    onSavePublicProfile?.({ correo: email, usuario: displayName, avatar: profilePicture });
    setNotice('Personal data updated.');
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setNotice('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setNotice('The image must be smaller than 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setProfilePicture(reader.result);
    reader.readAsDataURL(file);
  };

  const savePublicProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('Usuario')
      .update({ correo: email, usuario: displayName })
      .eq('dui', usuarioData?.dui);
    setSaving(false);

    if (error) {
      setProfileModal(null);
      setNotice(`Profile could not be saved: ${error.message}`);
      return;
    }

    setProfileModal(null);
    onSavePublicProfile?.({
      correo: email,
      usuario: displayName,
      intereses: interests.split(',').map((interest) => interest.trim()).filter(Boolean),
      biografia: biography,
      rango_inversion: investmentRange,
      nivel_riesgo: riskLevel,
      disponibilidad_contacto: contactAvailability,
    });
    setNotice('Public profile updated.');
  };

  const handleSaveChanges = async () => {
    if (profileModal === 'personal') {
      await saveProfile();
      return;
    }

    await savePublicProfile();
  };

  const savePreference = async (field, value, setter) => {
    setter(value);
    const { error } = await supabase.from('preferencias_usuario').upsert({
      dui: usuarioData?.dui,
      [field]: value,
    });
    if (error) setNotice(`Preference could not be saved: ${error.message}`);
  };

  const handleDeactivate = () => {
    setDeactivateModalOpen(true);
  };

  const confirmDeactivate = () => {
    setDeactivateModalOpen(false);
    onCerrarSesion();
    onBackHome();
  };

  const isProfileMode = mode === 'profile';

  return (
    <div className={`${isEmbeddedLayout ? '[&>div>div>header]:hidden [&>div>div>footer]:hidden' : ''} min-h-screen bg-[#f4f6f4] text-slate-800`}>
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        {showSidebar && <aside className="w-full border-b border-slate-200 bg-[#f8faf8] lg:w-70 lg:border-b-0 lg:border-r lg:border-slate-200">
          <div className="flex items-center gap-3 px-6 py-6">
            <img src="/images/foundy-logo.png" alt="Foundy" className="h-8 w-auto object-contain" />
            <span className="text-2xl font-bold tracking-tight text-[#0f4d4d]">Foundy</span>
          </div>

          <div className="px-5 pb-5">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
              <img
                src={profilePicture}
                alt={displayName}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-[#dfece7]"
              />
              <div>
                <p className="text-base font-semibold text-slate-800">{displayName}</p>
                <p className="text-xs text-slate-500">Entrepreneur</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2 px-3 pb-4">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={item.name === 'Home' ? onBackHome : undefined}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  item.active
                    ? 'bg-[#eaf7f4] text-[#0d5c5d] shadow-sm ring-1 ring-[#d5eee9]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{item.name}</span>
                {item.active && <span className="h-2.5 w-2.5 rounded-full bg-[#0d5c5d]" />}
              </button>
            ))}
          </nav>

          <div className="mt-6 space-y-2 border-t border-slate-200 px-3 pt-5">
            <button type="button" className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              Support
            </button>
            <button
              type="button"
              onClick={onCerrarSesion}
              className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </aside>}

        <div className="flex min-h-screen flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {showLegacyProfileSections && isProfileMode && (
                <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                  <h2 className="text-2xl font-bold text-slate-800">Public profile information</h2>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                      <span className="mb-2 block">Interests</span>
                      <input
                        type="text"
                        value={interests}
                        onChange={(event) => setInterests(event.target.value)}
                        placeholder="Technology, Retail, Sustainability"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]"
                      />
                      <span className="mt-1 block text-xs font-normal text-slate-500">Separate each interest with a comma.</span>
                    </label>

                    <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                      <span className="mb-2 block">Biography</span>
                      <textarea
                        value={biography}
                        onChange={(event) => setBiography(event.target.value)}
                        rows={4}
                        placeholder="Tell entrepreneurs what kind of investor you are."
                        className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]"
                      />
                    </label>

                    <label className="block text-sm font-medium text-slate-700">
                      <span className="mb-2 block">Investment range</span>
                      <input
                        type="text"
                        value={investmentRange}
                        onChange={(event) => setInvestmentRange(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]"
                      />
                    </label>

                    <label className="block text-sm font-medium text-slate-700">
                      <span className="mb-2 block">Risk level</span>
                      <select
                        value={riskLevel}
                        onChange={(event) => setRiskLevel(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]"
                      >
                        <option>Bajo</option>
                        <option>Medio</option>
                        <option>Alto</option>
                      </select>
                    </label>

                    <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                      <span className="mb-2 block">Contact availability</span>
                      <input
                        type="text"
                        value={contactAvailability}
                        onChange={(event) => setContactAvailability(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]"
                      />
                    </label>
                  </div>
                </section>
              )}

              {showLegacyProfileSections && isProfileMode && (
                <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                  <h2 className="text-2xl font-bold text-slate-800">Personal information</h2>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                      <span className="mb-2 block">Email address</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]"
                      />
                    </label>

                    <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                      <span className="mb-2 block">Display name</span>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]"
                      />
                    </label>

                    <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                      <span className="mb-2 block">Password</span>
                      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <input type="password" defaultValue="password123" className="w-full bg-transparent text-slate-800 outline-none" />
                        <button type="button" className="text-sm font-semibold text-[#0d5c5d] transition hover:text-[#0a4b4d]">
                          Change
                        </button>
                      </div>
                    </label>
                    </div>
                </section>
              )}

              {isProfileMode && (
                <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b817d]">Investor profile</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">Your profile information</h2>
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-bold text-slate-800">Personal data</p>
                          <p className="mt-1 text-sm text-slate-500">Basic account information.</p>
                        </div>
                        <button type="button" onClick={() => setProfileModal('personal')} className="rounded-full bg-[#0d5c5d] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0a4b4d]">Edit</button>
                      </div>
                      <dl className="mt-5 space-y-3 text-sm">
                        <div className="flex justify-between gap-4 border-b border-slate-200 pb-3"><dt className="text-slate-500">Name</dt><dd className="text-right font-semibold text-slate-700">{displayName || 'Not set'}</dd></div>
                        <div className="flex justify-between gap-4"><dt className="text-slate-500">Email</dt><dd className="break-all text-right font-semibold text-slate-700">{email || 'Not set'}</dd></div>
                      </dl>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-bold text-slate-800">Public profile</p>
                          <p className="mt-1 text-sm text-slate-500">What other users can learn about you.</p>
                        </div>
                        <button type="button" onClick={() => setProfileModal('public')} className="rounded-full bg-[#0d5c5d] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0a4b4d]">Edit</button>
                      </div>
                      <dl className="mt-5 space-y-3 text-sm">
                        <div className="border-b border-slate-200 pb-3"><dt className="text-slate-500">Interests</dt><dd className="mt-1 font-semibold text-slate-700">{interests || 'Not set'}</dd></div>
                        <div className="border-b border-slate-200 pb-3"><dt className="text-slate-500">Biography</dt><dd className="mt-1 line-clamp-2 font-semibold text-slate-700">{biography || 'Not set'}</dd></div>
                        <div className="grid grid-cols-2 gap-3"><div><dt className="text-slate-500">Range</dt><dd className="mt-1 font-semibold text-slate-700">{investmentRange}</dd></div><div><dt className="text-slate-500">Risk</dt><dd className="mt-1 font-semibold text-slate-700">{riskLevel}</dd></div></div>
                        <div><dt className="text-slate-500">Contact</dt><dd className="mt-1 font-semibold text-slate-700">{contactAvailability}</dd></div>
                      </dl>
                    </div>
                  </div>
                </section>
              )}

              {!isProfileMode && <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  {isProfileMode ? 'Personal Information' : 'Platform settings'}
                </h2>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {!isProfileMode && (
                    <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                      <span className="mb-2 block">Preferred language</span>
                      <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]">
                        <option>English</option>
                        <option>Spanish</option>
                      </select>
                    </label>
                  )}

                  <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                    <span className="mb-2 block">Theme</span>
                    <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </label>
                </div>
              </section>}

              {!isProfileMode && <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Notifications</h2>
                    <p className="mt-1 text-sm text-slate-500">Choose which alerts you want to receive.</p>
                  </div>
                  <button type="button" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    Manage All
                  </button>
                </div>

                <div className="mt-6 space-y-5">
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div>
                      <p className="text-base font-semibold text-slate-800">Transaction Alerts</p>
                      <p className="mt-1 text-sm text-slate-500">Get notified when payments or transfers are made.</p>
                    </div>
                    <Switch enabled={transactionAlerts} onChange={(value) => savePreference('alertas_transacciones', value, setTransactionAlerts)} />
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div>
                      <p className="text-base font-semibold text-slate-800">Marketing Insights</p>
                      <p className="mt-1 text-sm text-slate-500">Receive helpful campaign and growth suggestions.</p>
                    </div>
                    <Switch enabled={marketingInsights} onChange={(value) => savePreference('sugerencias_marketing', value, setMarketingInsights)} />
                  </div>
                </div>
              </section>}

              {!isProfileMode && <section className="rounded-[20px] border border-red-200 bg-red-50 p-5 shadow-sm sm:p-6">
                <h2 className="text-2xl font-bold text-red-700">Danger Zone</h2>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-lg text-sm leading-6 text-red-700/80">
                    Deactivating your account will disable your access and hide your profile from other users.
                  </p>
                  <button
                    type="button"
                    onClick={handleDeactivate}
                    className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Deactivate
                  </button>
                </div>
              </section>}

            </div>
          </main>

          <footer className="bg-[#0d3f44] text-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-3">
                  <img src="/images/foundy-logo.png" alt="Foundy" className="h-8 w-auto object-contain brightness-0 invert" />
                  <span className="text-xl font-bold">Foundy</span>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-6 text-teal-100">
                  Foundy connects entrepreneurs, investors, and partners to bring brighter ideas to life.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-100">Social Media</h3>
                <div className="mt-4 space-y-2 text-sm text-teal-50">
                  <p>Instagram</p>
                  <p>LinkedIn</p>
                  <p>Twitter</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-100">Contact Us</h3>
                <div className="mt-4 space-y-2 text-sm text-teal-50">
                  <p>hello@foundy.com</p>
                  <p>+503 2500 0000</p>
                  <p>Location unavailable</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-teal-100">
              Â© 2026 Foundy. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#173f43] px-4 py-3 text-xs font-semibold text-white shadow-lg">{notice}</div>}

      {deactivateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#123f43]/55 p-4"
          role="presentation"
          onMouseDown={(event) => event.target === event.currentTarget && setDeactivateModalOpen(false)}
        >
          <section role="dialog" aria-modal="true" aria-labelledby="deactivate-title" className="w-full max-w-md rounded-[26px] bg-white p-6 shadow-2xl sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-red-100 text-red-600">
              !
            </div>
            <h2 id="deactivate-title" className="mt-5 text-2xl font-bold text-slate-800">Deactivate your account?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This will disable your access and hide your profile from other users. Do you want to continue?
            </p>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setDeactivateModalOpen(false)} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                Cancel
              </button>
              <button type="button" onClick={confirmDeactivate} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">
                Yes, deactivate
              </button>
            </div>
          </section>
        </div>
      )}

      {isProfileMode && profileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#123f43]/55 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setProfileModal(null)}>
          <section role="dialog" aria-modal="true" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[26px] bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b817d]">Edit profile</p>
                <h2 className="mt-2 text-2xl font-bold text-[#1d3f42]">{profileModal === 'personal' ? 'Personal data' : 'Public profile'}</h2>
              </div>
              <button type="button" onClick={() => setProfileModal(null)} aria-label="Close window" className="rounded-full px-3 py-1 text-2xl leading-none text-slate-500 hover:bg-slate-100">&times;</button>
            </div>

            {profileModal === 'personal' ? (
              <div className="mt-7 grid gap-5">
                <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <img src={profilePicture} alt="Profile preview" className="h-20 w-20 rounded-full object-cover ring-2 ring-[#dfece7]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Profile photo</p>
                    <label className="mt-2 inline-flex cursor-pointer rounded-full border border-[#0d5c5d] px-4 py-2 text-xs font-bold text-[#0d5c5d] transition hover:bg-[#eaf7f4]">
                      Choose photo
                      <input type="file" accept="image/*" onChange={handleProfilePictureChange} className="sr-only" />
                    </label>
                    <p className="mt-1 text-xs text-slate-500">PNG, JPG or WEBP. Maximum 5 MB.</p>
                  </div>
                </div>
                <label className="text-sm font-semibold text-slate-700">Display name<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal outline-none focus:border-[#1ca38b]" /></label>
                <label className="text-sm font-semibold text-slate-700">Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal outline-none focus:border-[#1ca38b]" /></label>
                <label className="text-sm font-semibold text-slate-700">Password<div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><input type="password" defaultValue="password123" className="w-full bg-transparent font-normal outline-none" /><button type="button" className="text-sm text-[#0d5c5d]">Change</button></div></label>
              </div>
            ) : (
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Interests<input value={interests} onChange={(event) => setInterests(event.target.value)} placeholder="Technology, Retail, Sustainability" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal outline-none focus:border-[#1ca38b]" /><span className="mt-1 block text-xs font-normal text-slate-500">Separate them with commas.</span></label>
                <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Biography<textarea value={biography} onChange={(event) => setBiography(event.target.value)} rows={4} className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal outline-none focus:border-[#1ca38b]" /></label>
                <label className="text-sm font-semibold text-slate-700">Investment range<input value={investmentRange} onChange={(event) => setInvestmentRange(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal outline-none focus:border-[#1ca38b]" /></label>
                <label className="text-sm font-semibold text-slate-700">Risk level<select value={riskLevel} onChange={(event) => setRiskLevel(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal outline-none focus:border-[#1ca38b]"><option>Low</option><option>Medium</option><option>High</option></select></label>
                <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Contact availability<input value={contactAvailability} onChange={(event) => setContactAvailability(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal outline-none focus:border-[#1ca38b]" /></label>
              </div>
            )}

            <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-5">
              <button type="button" onClick={() => setProfileModal(null)} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button type="button" onClick={handleSaveChanges} disabled={saving} className="rounded-full bg-[#0b817d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#076b68] disabled:opacity-60">{saving ? 'Saving...' : 'Save changes'}</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
