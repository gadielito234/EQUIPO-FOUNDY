import Home from './Home';
function Inicio({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome }) {
    return (
        <Home
            usuarioData={usuarioData}
            onCerrarSesion={onCerrarSesion}
            onOpenSettings={onOpenSettings}
            onBackHome={onBackHome}
        />
    );
}

export default Inicio;