import Statistics from './Statistics.jsx';
function Inicio({ usuarioData, onCerrarSesion }) {
    return (
        <Statistics
            usuarioData={usuarioData}
            onCerrarSesion={onCerrarSesion}
            onOpenSettings={onOpenSettings}
            onBackHome={onBackHome}
        />
    );
}

export default Inicio;