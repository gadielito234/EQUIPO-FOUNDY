function Inicio({ usuarioData, onCerrarSesion }) {
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow p-4 text-center" style={{ width: "400px" }}>
                <h2 className="fw-bold mb-2">
                    ¡Bienvenido, {usuarioData.nombre} Ahora eres parte de la familia FOUNDY!
                </h2>
                <p className="text-muted mb-4">
                    @{usuarioData.usuario} ({usuarioData.nombre} {usuarioData.apellidos})
                </p>
                <div className="alert alert-success py-2 small mb-4" role="alert">
                    Has iniciado sesión correctamente.
                </div>
                <button
                    className="btn btn-outline-danger w-100"
                    onClick={onCerrarSesion}
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
export default Inicio;