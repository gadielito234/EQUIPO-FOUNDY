import Chat from "./Chat";

function ChatInversionista({ onBackHome, onCerrarSesion, embeddedLayout, usuarioData }) {
  return (
    <Chat
      mode="investor"
      onBackHome={onBackHome}
      onCerrarSesion={onCerrarSesion}
      embeddedLayout={embeddedLayout}
      usuarioData={usuarioData}
    />
  );
}

export default ChatInversionista;
