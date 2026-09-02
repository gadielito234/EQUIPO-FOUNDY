import Statistics from './Statistics.jsx';
function Inicio({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome, onOpenCreateProject, onOpenChat, onOpenFoundyCard, onOpenNotifications }) {
    return (
        <Statistics
            usuarioData={usuarioData}
            onCerrarSesion={onCerrarSesion}
            onOpenSettings={onOpenSettings}
            onBackHome={onBackHome}
            onOpenCreateProject={onOpenCreateProject}
            onOpenChat={onOpenChat}
            onOpenFoundyCard={onOpenFoundyCard}
            onOpenNotifications={onOpenNotifications}
        />
    );
}

export default Inicio;