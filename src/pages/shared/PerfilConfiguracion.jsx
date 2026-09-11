import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.js';

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
  onOpenFoundyCard = () => {},
  onOpenChat = () => {},
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
      .update({
        correo: email,
        usuario: displayName,
        intereses: interests.split(',').map((interest) => interest.trim()).filter(Boolean),
        biografia: biography,
        rango_inversion: investmentRange,
        nivel_riesgo: riskLevel,
        disponibilidad_contacto: contactAvailability,
      })
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
    <div className="space-y-6">
      <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <h2 className="text-2xl font-bold text-slate-800">Profile Photo</h2>
        <div className="mt-6 flex flex-col items-center gap-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <img src={profilePicture} alt={displayName} className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-sm" />
            <div>
              <p className="text-base font-semibold text-slate-700">Update your profile picture</p>
              <p className="mt-1 max-w-md text-sm text-slate-500">A great photo helps people recognize you and builds trust with your network.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="rounded-full bg-[#0d5c5d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a4b4d]">Upload New</button>
            <button type="button" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Remove</button>
          </div>
        </div>
      </section>

      <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 md:col-span-2">
            <span className="mb-2 block">Email Address</span>
            <input type="email" defaultValue="jane@foundy.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]" />
          </label>
          <label className="block text-sm font-medium text-slate-700 md:col-span-2">
            <span className="mb-2 block">Display Name</span>
            <input type="text" defaultValue={displayName} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]" />
          </label>
          <label className="block text-sm font-medium text-slate-700 md:col-span-2">
            <span className="mb-2 block">Password</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <input type="password" defaultValue="password123" className="w-full bg-transparent text-slate-800 outline-none" />
              <button type="button" className="text-sm font-semibold text-[#0d5c5d] transition hover:text-[#0a4b4d]">Change</button>
            </div>
          </label>
        </div>
      </section>

      <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Notifications</h2>
            <p className="mt-1 text-sm text-slate-500">Choose which alerts you want to receive.</p>
          </div>
          <button type="button" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Manage All</button>
        </div>
        <div className="mt-6 space-y-5">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div>
              <p className="text-base font-semibold text-slate-800">Transaction Alerts</p>
              <p className="mt-1 text-sm text-slate-500">Get notified when payments or transfers are made.</p>
            </div>
            <Switch enabled={transactionAlerts} onChange={setTransactionAlerts} />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div>
              <p className="text-base font-semibold text-slate-800">Marketing Insights</p>
              <p className="mt-1 text-sm text-slate-500">Receive helpful campaign and growth suggestions.</p>
            </div>
            <Switch enabled={marketingInsights} onChange={setMarketingInsights} />
          </div>
        </div>
      </section>

      <section className="rounded-[20px] border border-red-200 bg-red-50 p-5 shadow-sm sm:p-6">
        <h2 className="text-2xl font-bold text-red-700">Danger Zone</h2>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-6 text-red-700/80">Deactivating your account will disable your access and hide your profile from other users.</p>
          <button type="button" onClick={handleDeactivate} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">Deactivate</button>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 text-sm font-semibold text-[#0d5c5d]">
        <button type="button" onClick={onBackHome}>Dashboard</button>
        <button type="button" onClick={onOpenFoundyCard}>Foundy card</button>
        <button type="button" onClick={onOpenChat}>Messages</button>
      </div>
    </div>
  );
}
