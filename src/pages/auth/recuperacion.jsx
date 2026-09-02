import { useState } from 'react';

function Recuperacion({ onVolver, onContinuar }) {
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [exito, setExito] = useState(false);

    const validarEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-[420px] overflow-hidden rounded-[30px_30px_0_0] bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">

                <div className="h-[100px] rounded-b-[18px] bg-[#1b8d97] bg-[url('/images/foundy-logo.png')] bg-contain bg-center bg-no-repeat">
                </div>

                <div className="p-10">

                    <h2 className="mb-3 text-center font-bold text-[#243047]">
                        Restablecer contraseña
                    </h2>

                    <p className="mb-[30px] text-center text-gray-500">
                        Introduce tu correo electrónico para recibir
                        un código de verificación.
                    </p>

                    <form onSubmit={handleSubmit}>

                        {error && (
                            <div className="mb-4 rounded-lg border-l-4 border-red-600 bg-red-100 px-4 py-3 text-sm text-red-800">
                                {error}
                            </div>
                        )}

                        {exito && (
                            <div className="mb-4 rounded-lg border-l-4 border-green-600 bg-green-200 px-4 py-3 text-sm text-green-800">
                                Código enviado exitosamente a tu correo
                            </div>
                        )}

                        <label className="mb-2 block text-sm text-gray-500">
                            Email address:
                        </label>

                        <input
                            type="email"
                            className="w-full rounded border border-gray-300 bg-white px-[15px] py-3 text-base outline-none focus:border-[#156f77] focus:ring-2 focus:ring-[#156f77]/20"
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
                            className="mt-[30px] w-full rounded-full border-0 bg-[#156f77] p-3.5 text-lg font-semibold text-white transition hover:bg-[#125c63] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-70"
                            disabled={cargando}
                        >
                            {cargando ? 'Enviando...' : 'Enviar código'}
                        </button>

                    </form>

                    <div className="mt-[25px] text-center">
                        <button onClick={onVolver} className="cursor-pointer border-0 bg-transparent text-base text-gray-600">
                            ← Volver al inicio de sesión
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Recuperacion;