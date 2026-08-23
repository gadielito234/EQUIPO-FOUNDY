import Statistics from './Statistics.jsx';
function Inicio({ usuarioData, onCerrarSesion }) {
    return (
        <Statistics
            usuarioData={usuarioData}
            onCerrarSesion={onCerrarSesion}
        />
    );
}

export default Inicio;