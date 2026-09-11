import { useState } from 'react';
import { supabase } from '../../services/supabase.js';
import Recuperacion from './recuperacion.jsx';
import Registro from './registro.jsx';
import Inicio from '../emprendedor/inicio.jsx';
import Landing from './landing.jsx';
import DashboardInversionista from '../inversionista/DashboardInversionista.jsx';
import Investments from '../inversionista/investments.jsx';
import FoundyCard from '../inversionista/FoundyCard.jsx';
import PerfilConfiguracion from '../shared/PerfilConfiguracion.jsx';
import PerfilPublicoInversionista from '../inversionista/PerfilPublicoInversionista.jsx';
import CrearProyecto from '../emprendedor/CrearProyecto.jsx';
import ChatEmprendedor from '../chat/ChatEmprendedor.jsx';
import ChatInversionista from '../chat/ChatInversionista.jsx';
import DashboardLayout from '../shared/DashboardLayout.jsx';
import Statistics from '../emprendedor/Statistics.jsx';
import Notifications from '../inversionista/Notifications.jsx';
import Support from '../shared/Support.jsx';

function App() {
  const [mostrarLanding, setMostrarLanding] = useState(true);
  const [esRegistro, setEsRegistro] = useState(false);
  const [esRecuperacion, setEsRecuperacion] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [pantallaLogueado, setPantallaLogueado] = useState('home');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase
        .from('Usuario')
        .select('*')
        .eq('usuario', usuario)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setErrorMsg('Username not found.');
        } else {
          setErrorMsg(error.message || 'Could not look up the user. Check your Supabase connection.');
        }
        return;
      }

      if (!data) {
        setErrorMsg('Username not found.');
        return;
      }

      if (data.contrasena !== contrasena) {
        setErrorMsg('Incorrect password.');
        return;
      }

      setUsuarioLogueado(data);
      setPantallaLogueado('home');
    } catch {
      setErrorMsg('An error occurred while signing in.');
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarSesion = () => {
    setUsuarioLogueado(null);
    setPantallaLogueado('home');
    setUsuario('');
    setContrasena('');
    setEsRegistro(false);
    setEsRecuperacion(false);
    setMostrarLanding(false);
  };

  const irAHome = () => setPantallaLogueado(esInversionista ? 'dashboard' : 'home');
  const irAConfiguracion = () => setPantallaLogueado('settings');
  const irAPerfilPublico = () => setPantallaLogueado('investor-profile');
  const irAEditarPerfil = () => setPantallaLogueado('profile-settings');
  const actualizarPerfilPublico = (profileData) => {
    setUsuarioLogueado((currentUser) => ({ ...currentUser, ...profileData }));
  };
  const esInversionista = usuarioLogueado?.tipo_usuario === 'Inversionista';

  const renderWithDashboardLayout = (content, options = {}) => (
    <DashboardLayout
      usuarioData={usuarioLogueado}
      onCerrarSesion={handleCerrarSesion}
      onBackHome={irAHome}
      onOpenSettings={irAConfiguracion}
      onOpenChat={() => setPantallaLogueado('chat')}
      onOpenProjects={() => setPantallaLogueado('create-project')}
      onOpenFoundyCard={() => setPantallaLogueado('foundy-card')}
      onOpenStatistics={() => setPantallaLogueado('statistics')}
      onOpenInvestments={() => setPantallaLogueado('investments')}
      onOpenNotifications={() => setPantallaLogueado('notifications')}
      onOpenSupport={() => setPantallaLogueado('support')}
      onOpenInvestorProfile={irAPerfilPublico}
      investorMode={esInversionista}
      activeNav={options.activeNav || 'dashboard'}
      showSearch={options.showSearch ?? true}
      showStatistics
    >
      {content}
    </DashboardLayout>
  );

  if (usuarioLogueado) {
    if (pantallaLogueado === 'notifications') {
      return renderWithDashboardLayout(
        <Notifications user={usuarioLogueado} role={usuarioLogueado?.tipo_usuario} onBack={() => setPantallaLogueado(esInversionista ? 'dashboard' : 'home')} />,
        { activeNav: 'notifications', showSearch: true }
      );
    }

    if (pantallaLogueado === 'support') {
      return renderWithDashboardLayout(
        <Support onBack={irAHome} onOpenChat={() => setPantallaLogueado('chat')} />,
        { activeNav: 'support', showSearch: true }
      );
    }

    if (pantallaLogueado === 'statistics') {
      return renderWithDashboardLayout(
        <Statistics
          usuarioData={usuarioLogueado}
          onCerrarSesion={handleCerrarSesion}
          onBackHome={irAHome}
          onOpenSettings={irAConfiguracion}
          onOpenChat={() => setPantallaLogueado('chat')}
          onOpenFoundyCard={() => setPantallaLogueado('foundy-card')}
          embeddedLayout
        />,
        { activeNav: 'statistics', showSearch: true }
      );
    }

    if (pantallaLogueado === 'settings') {
      return renderWithDashboardLayout(
        <PerfilConfiguracion
          usuarioData={usuarioLogueado}
          onCerrarSesion={handleCerrarSesion}
          onBackHome={irAHome}
          onOpenFoundyCard={() => setPantallaLogueado('foundy-card')}
          showSidebar={false}
          embeddedLayout
          onOpenChat={() => setPantallaLogueado('chat')}
          onSavePublicProfile={actualizarPerfilPublico}
          mode="platform"
        />,
        { activeNav: 'settings', showSearch: true }
      );
    }

    if (pantallaLogueado === 'profile-settings') {
      return renderWithDashboardLayout(
        <PerfilConfiguracion
          usuarioData={usuarioLogueado}
          onCerrarSesion={handleCerrarSesion}
          onBackHome={irAHome}
          onOpenFoundyCard={() => setPantallaLogueado('foundy-card')}
          showSidebar={false}
          embeddedLayout
          onOpenChat={() => setPantallaLogueado('chat')}
          onSavePublicProfile={actualizarPerfilPublico}
          mode="profile"
        />,
        { activeNav: 'profile-settings', showSearch: true }
      );
    }

    if (pantallaLogueado === 'investor-profile') {
      return renderWithDashboardLayout(
        <PerfilPublicoInversionista
          usuarioData={usuarioLogueado}
          onBackHome={irAHome}
          onOpenProfileSettings={irAEditarPerfil}
          onSavePublicProfile={actualizarPerfilPublico}
        />,
        { activeNav: 'investor-profile', showSearch: true }
      );
    }

    if (pantallaLogueado === 'create-project' && !esInversionista) {
      return renderWithDashboardLayout(
        <CrearProyecto usuarioData={usuarioLogueado} onCerrarSesion={handleCerrarSesion} onBackHome={irAHome} embeddedLayout />,
        { activeNav: 'projects', showSearch: true }
      );
    }

    if (pantallaLogueado === 'chat') {
      const ChatPage = usuarioLogueado.tipo_usuario === 'Inversionista' ? ChatInversionista : ChatEmprendedor;
      return renderWithDashboardLayout(
        <ChatPage onBackHome={irAHome} onCerrarSesion={handleCerrarSesion} embeddedLayout />,
        { activeNav: 'messages', showSearch: true }
      );
    }

    if (pantallaLogueado === 'foundy-card' && esInversionista) {
      return renderWithDashboardLayout(
        <FoundyCard usuarioData={usuarioLogueado} onBackHome={irAHome} onOpenInvestments={() => setPantallaLogueado('investments')} />,
        { activeNav: 'foundy-card', showSearch: true }
      );
    }

    if (pantallaLogueado === 'investments' && esInversionista) {
      return renderWithDashboardLayout(
        <Investments
          usuarioData={usuarioLogueado}
          embeddedLayout
          onCerrarSesion={handleCerrarSesion}
          onBackHome={irAHome}
          onOpenSettings={irAConfiguracion}
          onOpenChat={() => setPantallaLogueado('chat')}
          onOpenFoundyCard={() => setPantallaLogueado('foundy-card')}
        />,
        { activeNav: 'investments', showSearch: true }
      );
    }

    if (pantallaLogueado === 'dashboard' || (pantallaLogueado === 'home' && esInversionista)) {
      return renderWithDashboardLayout(
        <DashboardInversionista
          usuarioData={usuarioLogueado}
          onCerrarSesion={handleCerrarSesion}
          onBackHome={irAHome}
          showSidebar={false}
          embeddedLayout
          onOpenSettings={irAConfiguracion}
          onOpenChat={() => setPantallaLogueado('chat')}
          onOpenInvestments={() => setPantallaLogueado('investments')}
          onOpenFoundyCard={() => setPantallaLogueado('foundy-card')}
          onVerDetalle={(negocio) => console.log('Detalle de oportunidad:', negocio)}
        />,
        { activeNav: 'dashboard', showSearch: true }
      );
    }

    if (pantallaLogueado === 'foundy-card') {
      return renderWithDashboardLayout(
        <FoundyCard usuarioData={usuarioLogueado} onLogout={handleCerrarSesion} onBackHome={irAHome} onOpenSettings={irAConfiguracion} onOpenChat={() => setPantallaLogueado('chat')} embeddedLayout />,
        { activeNav: 'foundy-card', showSearch: true }
      );
    }

    return renderWithDashboardLayout(
      <Inicio
        usuarioData={usuarioLogueado}
        onCerrarSesion={handleCerrarSesion}
        showSidebar={false}
        onOpenSettings={irAConfiguracion}
        onBackHome={irAHome}
        onOpenCreateProject={() => setPantallaLogueado('create-project')}
        onOpenChat={() => setPantallaLogueado('chat')}
        onOpenFoundyCard={() => setPantallaLogueado('foundy-card')}
      />,
      { activeNav: 'dashboard', showSearch: true }
    );
  }

  if (mostrarLanding) {
    return (
      <Landing
        onLogin={() => setMostrarLanding(false)}
        onRegister={() => {
          setMostrarLanding(false);
          setEsRegistro(true);
        }}
      />
    );
  }

  if (esRegistro) {
    return <Registro onSwitchToLogin={() => setEsRegistro(false)} />;
  }

  if (esRecuperacion) {
    return (
      <Recuperacion
        onVolver={() => setEsRecuperacion(false)}
        onContinuar={(correo) => {
          console.log('Recovery email:', correo);
          setEsRecuperacion(false);
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#f4faf8] text-[#142d39] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative flex min-h-screen flex-col overflow-hidden px-6 py-7 sm:px-10 lg:px-[clamp(2.5rem,7vw,7rem)] lg:py-10">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#b9e8dd]/45" aria-hidden="true" />
        <div className="relative z-10 flex items-center justify-between">
          <img className="h-9 w-auto object-contain brightness-0 invert" src="/images/foundy-logo.png" alt="Foundy" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5d8888]">Welcome</span>
        </div>
        <div className="relative z-10 mx-auto my-auto w-full max-w-md py-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#079184]">Your opportunity space</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-[#113b47] sm:text-5xl">Reconnect with your ideas.</h1>
          <p className="mt-5 text-sm leading-6 text-[#5d7277]">Sign in to keep building new opportunities.</p>
          {errorMsg && <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{errorMsg}</div>}
          <form className="mt-8" onSubmit={handleLogin}>
            <label className="block text-xs font-semibold text-[#31515a]">
              Username
              <input type="text" className="mt-2 block h-12 w-full rounded-lg border border-[#d7e5e3] bg-white px-3.5 text-sm text-[#142d39] outline-none transition placeholder:text-[#9aabad] hover:border-[#8fc9c0] focus:border-[#079184] focus:ring-4 focus:ring-[#079184]/10" placeholder="Your username" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
            </label>
            <label className="mt-5 block text-xs font-semibold text-[#31515a]">
              Password
              <input type="password" className="mt-2 block h-12 w-full rounded-lg border border-[#d7e5e3] bg-white px-3.5 text-sm text-[#142d39] outline-none transition placeholder:text-[#9aabad] hover:border-[#8fc9c0] focus:border-[#079184] focus:ring-4 focus:ring-[#079184]/10" placeholder="••••••••" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
            </label>
            <button type="submit" className="mt-8 h-12 w-full rounded-lg bg-[#087f78] text-sm font-bold text-white shadow-[0_8px_18px_rgba(8,127,120,0.2)] transition hover:-translate-y-0.5 hover:bg-[#066b67] focus:outline-none focus:ring-4 focus:ring-[#079184]/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
          </form>
          <div className="mt-6 flex flex-col gap-3 text-center text-sm text-[#6d7f83] sm:flex-row sm:justify-between">
            <span>Forgot your password? <button type="button" className="font-bold text-[#087f78] hover:underline" onClick={() => setEsRecuperacion(true)}>Reset it</button></span>
            <span>Need an account? <button type="button" className="font-bold text-[#087f78] hover:underline" onClick={() => setEsRegistro(true)}>Sign up</button></span>
          </div>
        </div>
      </section>
      <section className="relative hidden min-h-screen overflow-hidden bg-[#075d65] lg:block" aria-label="Conexiones y oportunidades de Foundy">
        <img className="absolute inset-0 h-full w-full object-cover opacity-80" src="/images/maxresdefault.jpg" alt="People collaborating on a project" />
        <div className="absolute inset-0 bg-[#075d65]/55" />
        <div className="absolute inset-x-12 bottom-14 max-w-lg text-white">
          <div className="mb-7 h-1 w-16 bg-[#64d2b8]" />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8f0df]">Conecta. Crece. Hazlo posible.</p>
          <h2 className="mt-4 text-5xl font-bold leading-[1.02] tracking-tight">Las grandes ideas no crecen solas.</h2>
          <p className="mt-5 max-w-sm text-base leading-7 text-white/80">Find the people and opportunities that can move your next step forward.</p>
        </div>
      </section>
    </main>
  );
}

export default App;
