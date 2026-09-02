import { useState } from 'react';

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

export default function PerfilConfiguracion({ usuarioData, onCerrarSesion, onBackHome, onOpenFoundyCard, onOpenChat }) {
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [marketingInsights, setMarketingInsights] = useState(false);

  const displayName = usuarioData?.usuario || 'Maya Johnson';
  const profilePicture = usuarioData?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80';

  const handleDeactivate = () => {
    const confirmed = window.confirm('Are you sure you want to deactivate your account? This action cannot be undone.');
    if (confirmed) {
      onCerrarSesion();
      onBackHome();
    }
  };

  return (
    <>
      <div className="space-y-6">
        <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <h2 className="text-2xl font-bold text-slate-800">Profile Photo</h2>
          <div className="mt-6 flex flex-col items-center gap-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <img src={profilePicture} alt={displayName} className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-sm" />
    <div className="min-h-screen bg-[#f4f6f4] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-[#f8faf8] lg:w-70 lg:border-b-0 lg:border-r lg:border-slate-200">
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
                <p className="text-base font-semibold text-slate-700">Update your profile picture</p>
                <p className="mt-1 max-w-md text-sm text-slate-500">A great photo helps people recognize you and builds trust with your network.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="rounded-full bg-[#0d5c5d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a4b4d]">
                Upload New
              </button>
              <button type="button" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                Remove
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 md:col-span-2">
              <span className="mb-2 block">Email Address</span>
              <input
                type="email"
                defaultValue="jane@foundy.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#1ca38b] focus:bg-white focus:ring-2 focus:ring-[#dff5f0]"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 md:col-span-2">
              <span className="mb-2 block">Display Name</span>
              <input
                type="text"
                defaultValue={displayName}
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
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBackHome}
                  className="flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-bold text-[#0d5c5d] transition hover:bg-[#0d5c5d]/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d5c5d]/30"
                  aria-label="Volver al panel"
                  title="Volver al panel"
                >
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP.w171eC9ZBI8OTweGWM7G0gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt=""
                    className="h-7 w-7 object-contain"
                  />
                  <span className="hidden sm:inline">Volver</span>
                </button>
                <img src="/images/foundy-logo.png" alt="Foundy" className="h-8 w-auto object-contain" />
                <span className="text-xl font-bold text-[#0d5c5d]">Foundy</span>
              </div>

              <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
                <button type="button" onClick={onBackHome} className="transition hover:text-[#0d5c5d]">Dashboard</button>
                <button type="button" onClick={onBackHome} className="transition hover:text-[#0d5c5d]">Statistics</button>
                <button type="button" onClick={onOpenFoundyCard} className="transition hover:text-[#0d5c5d]">Foundy card</button>
              </nav>

              <div className="flex items-center justify-between gap-3 md:justify-end">
                <label className="hidden min-w-55 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <circle cx="11" cy="11" r="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 16L21 21" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input type="text" placeholder="Search" className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none" />
                </label>
                <img
                  src={profilePicture}
                  alt={displayName}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-[#dfece7]"
                />
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
        </section>
      </div>
    </>
  );
}
