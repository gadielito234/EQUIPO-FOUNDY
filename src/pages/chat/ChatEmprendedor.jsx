import Chat from "./Chat";

function ChatEmprendedor({ onBackHome, onCerrarSesion, embeddedLayout }) {
  return (
    <Chat
      mode="entrepreneur"
      onBackHome={onBackHome}
      onCerrarSesion={onCerrarSesion}
      embeddedLayout={embeddedLayout}
    />
  );
}

export default ChatEmprendedor;
