import Home from './Home';
import "../styles/inicio.css";;
function Inicio({ usuarioData, onCerrarSesion }) {
    return (
        <Home
            usuarioData={usuarioData}
            onCerrarSesion={onCerrarSesion}
        />
    );
}

export default Inicio;