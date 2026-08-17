import { useState } from 'react';
import './cssPasswords/PasswordRecovery.css';

function PasswordRecovery({ onVolver, onContinuar }) {
    const [correo, setCorreo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onContinuar) {
            onContinuar(correo);
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

                        <label className="recovery-label">
                            Email address:
                        </label>

                        <input
                            type="email"
                            className="recovery-input"
                            placeholder="nombre@ejemplo.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            className="recovery-button"
                        >
                            Enviar código
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

export default PasswordRecovery;