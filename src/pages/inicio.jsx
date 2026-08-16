import Home from './Home';

function Inicio({ usuarioData, onCerrarSesion }) {
    return (
        <Home
            usuarioData={usuarioData}
            onCerrarSesion={onCerrarSesion}
        />
    );
}

export default Inicio;