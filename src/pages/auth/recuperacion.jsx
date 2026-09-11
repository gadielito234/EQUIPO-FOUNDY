import { useState } from 'react';

function Recuperacion({ onVolver, onContinuar }) {
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [exito, setExito] = useState(false);

    const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setExito(false);

        if (!correo.trim()) {
            setError('Please enter your email address.');
            return;
        }

        if (!validarEmail(correo)) {
            setError('Please enter a valid email address.');
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
            setError(err.message || 'There was an error sending the code. Try again.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-105 overflow-hidden rounded-[30px_30px_0_0] bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div className="h-25 rounded-b-[18px] bg-[#1b8d97] bg-[url('/images/foundy-logo.png')] bg-contain bg-center bg-no-repeat" />

                <div className="p-10">
                    <h2 className="mb-3 text-center font-bold text-[#243047]">
                        Reset your password
                    </h2>

                    <p className="mb-7.5 text-center text-gray-500">
                        Enter your email address to receive a verification code.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-4 rounded-lg border-l-4 border-red-600 bg-red-100 px-4 py-3 text-sm text-red-800">
                                {error}
                            </div>
                        )}

                        {exito && (
                            <div className="mb-4 rounded-lg border-l-4 border-green-600 bg-green-200 px-4 py-3 text-sm text-green-800">
                                Code sent successfully to your email.
                            </div>
                        )}

                        <label className="mb-2 block text-sm text-gray-500">
                            Email address:
                        </label>

                        <input
                            type="email"
                            className="w-full rounded border border-gray-300 bg-white px-3.75 py-3 text-base outline-none focus:border-[#156f77] focus:ring-2 focus:ring-[#156f77]/20"
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
                            className="mt-7.5 w-full rounded-full border-0 bg-[#156f77] p-3.5 text-lg font-semibold text-white transition hover:bg-[#125c63] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-70"
                            disabled={cargando}
                        >
                            {cargando ? 'Sending...' : 'Send code'}
                        </button>
                    </form>

                    <div className="mt-6.25 text-center">
                        <button onClick={onVolver} className="cursor-pointer border-0 bg-transparent text-base text-gray-600">
                            ← Back to sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recuperacion;
