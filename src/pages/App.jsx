import { useState } from 'react';
import { supabase } from '../services/supabase.js';
import Recuperacion from './recuperacion.jsx';
import Registro from './registro.jsx';
import Inicio from './inicio.jsx';
import Landing from './landing.jsx';
import FoundyCard from './foundyCard.jsx';

import PerfilConfiguracion from './PerfilConfiguracion.jsx';
import CrearProyecto from './emprendedor/CrearProyecto.jsx';
import ChatEmprendedor from './chat/ChatEmprendedor.jsx';
import ChatInversionista from './chat/ChatInversionista.jsx';
function App() {
  // LÍNEA TEMPORAL PARA PROBAR TU PANTALLA:
  return <FoundyCard />;

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
      if (error || !data) {
        setErrorMsg('El usuario no existe.');
        setLoading(false);
        return;
      }
      if (data.contrasena !== contrasena) {
        setErrorMsg('Contraseña incorrecta.');
        setLoading(false);
        return;
      }
      // Guarda los datos del usuario encontrado
      setUsuarioLogueado(data);
    } catch {
      setErrorMsg('Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };
  const handleCerrarSesion = () => {
    setUsuarioLogueado(null);
    setPantallaLogueado('home');
    setUsuario('');
    setContrasena('');
  };

  const irAHome = () => setPantallaLogueado('home');
  const irAConfiguracion = () => setPantallaLogueado('settings');

  // VISTA 1: Si hay un usuario logueado, mostramos la vista interna correspondiente
  if (window.location.pathname === '/crear-proyecto') {
    return <CrearProyecto nombreUsuario="Entrepreneur" />;
  }
  if (window.location.pathname === '/chat-emprendedor') {
    return <ChatEmprendedor />;
  }
  if (window.location.pathname === '/chat-inversionista') {
    return <ChatInversionista />;
  }
  // VISTA 1: Si hay un usuario logueado, mostramos inicio.jsx
  if (usuarioLogueado) {
    if (pantallaLogueado === 'settings') {
      return (
        <PerfilConfiguracion
          usuarioData={usuarioLogueado}
          onCerrarSesion={handleCerrarSesion}
          onBackHome={irAHome}
        />
      );
    }

    return (
      <Inicio
        usuarioData={usuarioLogueado}
        onCerrarSesion={handleCerrarSesion}
        onOpenSettings={irAConfiguracion}
        onBackHome={irAHome}
      />
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
  // VISTA 2: Si quiere registrarse, mostramos registro.jsx
  if (esRegistro) {
    return <Registro onSwitchToLogin={() => setEsRegistro(false)} />;

  }
  // VISTA 3: Si quiere recuperar contraseña, mostramos recuperacion.jsx
  if (esRecuperacion) {
    return (
      <Recuperacion
        onVolver={() => setEsRecuperacion(false)}
        onContinuar={(correo) => {
          // Aquí puedes manejar la lógica para enviar el correo de recuperación
          console.log('Correo para recuperación:', correo);
          setEsRecuperacion(false);
        }}
      />
    );
  }
  // VISTA 4: Por defecto, mostramos el Login
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-slate-500">Ingresa tus datos para continuar</p>
        </div>
        
        {errorMsg && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-center text-sm text-red-700" role="alert">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">Usuario</label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              placeholder="Tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
            <input
              type="password"
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              placeholder="••••••••"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-teal-700 px-4 py-2.5 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          ¿Olvidaste tu contraseña?{" "}
          <button
            type="button"
            className="p-0 font-semibold text-teal-700 hover:underline"
            onClick={() => setEsRecuperacion(true)}
            
          >
            Recupérala aquí
          </button>
        </p>
        <p className="mt-3 text-center text-sm text-slate-600">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            className="p-0 font-semibold text-teal-700 hover:underline"
            onClick={() => setEsRegistro(true)}
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}


export default App;