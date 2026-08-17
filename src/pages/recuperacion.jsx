import { useState } from 'react';
import '../styles/recuperacion.css';

function Recuperacion({ onVolver, onContinuar }) {
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [exito, setExito] = useState(false);

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setExito(false);

        if (!correo.trim()) {
            setError('Por favor ingresa tu correo electrónico');
            return;
        }

        if (!validarEmail(correo)) {
            setError('Por favor ingresa un correo electrónico válido');
            return;
        }

        setCargando(true);

        try {
            if (onContinuar) {
                await onContinuar(correo);
                setExito(true);
                setCorreo('');
                setTimeout(() => {
                    setExito(false);
                }, 3000);
            }
        } catch (err) {
            setError(err.message || 'Error al enviar el código. Intenta de nuevo.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="recovery-container">
            <div className="recovery-card">

                <div className="recovery-header">
                    <div className="recovery-logo">
                        ↗
                    </div>
                    <h1>FOUNDY</h1>
                </div>

                <div className="recovery-body">

                    <h2 className="recovery-title">
                        Restablecer contraseña
                    </h2>

                    <p className="recovery-description">
                        Introduce tu correo electrónico para recibir
                        un código de verificación.
                    </p>

                    <form onSubmit={handleSubmit}>

                        {error && (
                            <div className="recovery-error">
                                {error}
                            </div>
                        )}

                        {exito && (
                            <div className="recovery-success">
                                Código enviado exitosamente a tu correo
                            </div>
                        )}

                        <label className="recovery-label">
                            Email address:
                        </label>

                        <input
                            type="email"
                            className="recovery-input"
                            placeholder="nombre@ejemplo.com"
                            value={correo}
                            onChange={(e) => {
                                setCorreo(e.target.value);
                                setError('');
                            }}
                            disabled={cargando}
                            required
                        />

                        <button
                            type="submit"
                            className="recovery-button"
                            disabled={cargando}
                        >
                            {cargando ? 'Enviando...' : 'Enviar código'}
                        </button>

                    </form>

                    <div className="recovery-back">
                        <button onClick={onVolver}>
                            ← Volver al inicio de sesión
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Recuperacion;