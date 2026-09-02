import Chat from "./Chat";

function ChatEmprendedor({ usuarioData, onBackHome, onOpenProjects, onCerrarSesion, onOpenCreateProject, onOpenStatistics, onOpenSettings, onOpenFoundyCard }) {
  return (
    <Chat
      mode="entrepreneur"
      user={usuarioData?.usuario || "Entrepreneur"}
      onBackHome={onBackHome}
      onCerrarSesion={onCerrarSesion}
      onOpenCreateProject={onOpenCreateProject}
      onOpenProjects={onOpenProjects}
      onOpenStatistics={onOpenStatistics}
      onOpenSettings={onOpenSettings}
      onOpenFoundyCard={onOpenFoundyCard}
    />
  );
}

export default ChatEmprendedor;