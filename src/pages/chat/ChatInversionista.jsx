import Chat from "./Chat";

function ChatInversionista({ onBackHome, onCerrarSesion }) {
  return (
    <Chat
      mode="investor"
      onBackHome={onBackHome}
      onCerrarSesion={onCerrarSesion}
    />
  );
}

export default ChatInversionista;