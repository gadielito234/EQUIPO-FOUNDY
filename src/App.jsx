import { useState } from 'react';
import { supabase } from './supabase.js';
import Registro from './registro.jsx';
import Inicio from './inicio.jsx';
function App() {
  const [esRegistro, setEsRegistro] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
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
    } catch (err) {
      setErrorMsg('Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };
  const handleCerrarSesion = () => {
    setUsuarioLogueado(null);
    setUsuario('');
    setContrasena('');
  };
  // VISTA 1: Si hay un usuario logueado, mostramos inicio.jsx
  if (usuarioLogueado) {
    return <Inicio usuarioData={usuarioLogueado} onCerrarSesion={handleCerrarSesion} />;
  }
  // VISTA 2: Si quiere registrarse, mostramos registro.jsx
  if (esRegistro) {
    return <Registro onSwitchToLogin={() => setEsRegistro(false)} />;
  }
  // VISTA 3: Por defecto, mostramos el Login
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Iniciar sesión</h2>
          <p className="text-muted">Ingresa tus datos para continuar</p>
        </div>
        {errorMsg && (
          <div className="alert alert-danger py-2 small text-center" role="alert">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="text-center mt-4 mb-0">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            className="btn btn-link p-0 text-primary text-decoration-none fw-semibold"
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