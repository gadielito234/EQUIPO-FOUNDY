import Chat from "./Chat";

function ChatEmprendedor({ onBackHome, onCerrarSesion }) {
  return (
    <Chat
      mode="entrepreneur"
      onBackHome={onBackHome}
      onCerrarSesion={onCerrarSesion}
    />
  );
}

export default ChatEmprendedor;