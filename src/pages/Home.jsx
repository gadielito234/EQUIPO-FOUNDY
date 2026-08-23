import '../styles/home.css';

function Home({ usuarioData, onCerrarSesion }) {

  return (
    <div className="foundy-home">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#inicio">Foundy</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Abrir navegación"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#inicio">Inicio</a>
              </li>
              <li className="nav-item"><a className="nav-link" href="#funciones">Funciones</a></li>
              <li className="nav-item"><a className="nav-link" href="#precios">Precios</a></li>
            </ul>
            <span className="navbar-text me-3">Hola, {usuarioData?.usuario || 'usuario'}</span>
            <button type="button" className="btn btn-outline-secondary" onClick={onCerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
      <main id="inicio" className="container py-5">
        <h1>Bienvenido a Foundy</h1>
        <p>Tu espacio de trabajo está listo.</p>
      </main>
    </div>
  );
}

export default Home;