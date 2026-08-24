import Statistics from './Statistics.jsx';
function Inicio({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome, onOpenCreateProject, onOpenChat, onOpenFoundyCard }) {
    return (
        <Statistics
            usuarioData={usuarioData}
            onCerrarSesion={onCerrarSesion}
            onOpenSettings={onOpenSettings}
            onBackHome={onBackHome}
            onOpenCreateProject={onOpenCreateProject}
            onOpenChat={onOpenChat}
            onOpenFoundyCard={onOpenFoundyCard}
        />
    );
}

export default Inicio;