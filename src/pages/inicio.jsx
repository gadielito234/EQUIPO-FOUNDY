import HomeInversionista from './HomeInversionista';

function Inicio({ usuarioData, onCerrarSesion }) {
    return (
        <HomeInversionista
            usuarioData={usuarioData}
            onCerrarSesion={onCerrarSesion}
        />
    );
}

export default Inicio;