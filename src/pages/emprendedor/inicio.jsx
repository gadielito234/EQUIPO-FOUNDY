import Statistics from './Statistics.jsx';
function Inicio({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome, onOpenCreateProject, onOpenProjects, onOpenStatistics, onOpenChat, onOpenFoundyCard }) {
    return (
        <Statistics
            usuarioData={usuarioData}
            active="home"
            onCerrarSesion={onCerrarSesion}
            onOpenSettings={onOpenSettings}
            onBackHome={onBackHome}
            onOpenCreateProject={onOpenCreateProject}
            onOpenProjects={onOpenProjects}
            onOpenStatistics={onOpenStatistics}
            onOpenChat={onOpenChat}
            onOpenFoundyCard={onOpenFoundyCard}
        />
    );
}

export default Inicio;