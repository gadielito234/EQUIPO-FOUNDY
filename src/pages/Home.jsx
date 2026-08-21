import '../styles/home.css';

function Home({ usuarioData, onCerrarSesion }) {
  const nombreUsuario = usuarioData?.usuario || 'usuario';

  return (
    <div className="foundy-home">
      <nav className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-4">
          <a className="text-xl font-bold text-teal-900" href="#inicio">Foundy</a>
          <div className="flex flex-1 items-center gap-6">
            <a className="font-semibold text-teal-700" href="#inicio">Inicio</a>
            <a className="text-slate-600 hover:text-teal-700" href="#funciones">Funciones</a>
            <a className="text-slate-600 hover:text-teal-700" href="#precios">Precios</a>
          </div>
          <span className="text-sm text-slate-600">Hola, {nombreUsuario}</span>
          <button type="button" className="rounded-md border border-slate-400 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100" onClick={onCerrarSesion}>
              Cerrar sesión
          </button>
        </div>
      </nav>
      <main id="inicio" className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold text-teal-900">Bienvenido a Foundy</h1>
        <p className="mt-3 text-slate-600">Tu espacio de trabajo está listo.</p>
      </main>
    </div>
  );
}

export default Home;