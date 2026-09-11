import Chat from "./Chat";

function ChatEmprendedor({ onBackHome, onCerrarSesion, embeddedLayout, usuarioData }) {
  return (
    <Chat
      mode="entrepreneur"
      onBackHome={onBackHome}
      onCerrarSesion={onCerrarSesion}
      embeddedLayout={embeddedLayout}
      usuarioData={usuarioData}
    />
  );
}

export default ChatEmprendedor;
