import Chat from "./Chat";

function ChatInversionista({ onBackHome, onCerrarSesion, embeddedLayout }) {
  return (
    <Chat
      mode="investor"
      onBackHome={onBackHome}
      onCerrarSesion={onCerrarSesion}
      embeddedLayout={embeddedLayout}
    />
  );
}

export default ChatInversionista;