import { useState } from 'react';

function Recuperacion({ onVolver, onContinuar }) {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
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

        if (contrasena.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(contrasena)) {
            setError('Password must have 8 characters, an uppercase letter, a lowercase letter, and a number.');
            return;
        }

        if (contrasena !== confirmarContrasena) {
            setError('Passwords do not match.');
            return;
        }

        setCargando(true);

        try {
            if (onContinuar) {
                await onContinuar(correo.trim(), contrasena);
                setExito(true);
                setCorreo('');
                setContrasena('');
                setConfirmarContrasena('');
            }
        } catch (err) {
            setError(err.message || 'There was an error changing your password. Try again.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f4faf8] text-[#142d39] lg:grid lg:grid-cols-[0.92fr_1.08fr]">
            <section className="relative flex min-h-screen flex-col overflow-hidden px-6 py-7 sm:px-10 lg:px-[clamp(2.5rem,7vw,7rem)] lg:py-10">
                <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#b9e8dd]/45" aria-hidden="true" />
                <div className="relative z-10 flex items-center justify-between">
                    <img className="h-9 w-auto object-contain brightness-0 invert" src="/images/foundy-logo.png" alt="Foundy" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5d8888]">Account access</span>
                </div>

                <div className="relative z-10 mx-auto my-auto w-full max-w-md py-12">
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d9f1e9] text-[#087f78] shadow-[0_8px_20px_rgba(8,127,120,0.1)]" aria-hidden="true">
                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M7 10V8a5 5 0 0 1 10 0v2" strokeLinecap="round" />
                            <rect x="4" y="10" width="16" height="11" rx="2" />
                            <path d="M12 14v3" strokeLinecap="round" />
                        </svg>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#079184]">Account recovery</p>
                    <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-[#113b47] sm:text-5xl">Create a fresh start.</h1>
                    <p className="mt-5 max-w-md text-sm leading-6 text-[#5d7277]">Use the email connected to your account and choose a new password to get back to your opportunities.</p>

                    <form className="mt-8" onSubmit={handleSubmit} noValidate>
                        {error && <div className="mb-5 flex gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700" role="alert"><span className="font-bold">!</span><span>{error}</span></div>}
                        {exito && <div className="mb-5 flex gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700" role="status"><span className="font-bold">OK</span><span>Password changed successfully. You can now sign in.</span></div>}

                        <label className="block text-xs font-semibold text-[#31515a]">
                            Email address
                            <input type="email" className="mt-2 block h-12 w-full rounded-lg border border-[#d7e5e3] bg-white px-3.5 text-sm text-[#142d39] outline-none transition placeholder:text-[#9aabad] hover:border-[#8fc9c0] focus:border-[#079184] focus:ring-4 focus:ring-[#079184]/10 disabled:cursor-not-allowed disabled:bg-[#eef5f2]" placeholder="name@example.com" value={correo} onChange={(e) => { setCorreo(e.target.value); setError(''); }} disabled={cargando || exito} required />
                        </label>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <label className="block text-xs font-semibold text-[#31515a]">
                                New password
                                <input type="password" minLength={8} className="mt-2 block h-12 w-full rounded-lg border border-[#d7e5e3] bg-white px-3.5 text-sm text-[#142d39] outline-none transition placeholder:text-[#9aabad] hover:border-[#8fc9c0] focus:border-[#079184] focus:ring-4 focus:ring-[#079184]/10 disabled:cursor-not-allowed disabled:bg-[#eef5f2]" placeholder="8+ characters" value={contrasena} onChange={(e) => { setContrasena(e.target.value); setError(''); }} disabled={cargando || exito} required />
                            </label>
                            <label className="block text-xs font-semibold text-[#31515a]">
                                Confirm password
                                <input type="password" minLength={8} className="mt-2 block h-12 w-full rounded-lg border border-[#d7e5e3] bg-white px-3.5 text-sm text-[#142d39] outline-none transition placeholder:text-[#9aabad] hover:border-[#8fc9c0] focus:border-[#079184] focus:ring-4 focus:ring-[#079184]/10 disabled:cursor-not-allowed disabled:bg-[#eef5f2]" placeholder="Repeat password" value={confirmarContrasena} onChange={(e) => { setConfirmarContrasena(e.target.value); setError(''); }} disabled={cargando || exito} required />
                            </label>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-xs text-[#718486]"><span className="h-1.5 w-1.5 rounded-full bg-[#64c9a9]" />At least 8 characters, one uppercase letter, one lowercase letter and one number.</div>
                        <button type="submit" className="mt-7 h-12 w-full rounded-lg bg-[#087f78] text-sm font-bold text-white shadow-[0_8px_18px_rgba(8,127,120,0.2)] transition hover:-translate-y-0.5 hover:bg-[#066b67] focus:outline-none focus:ring-4 focus:ring-[#079184]/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none" disabled={cargando || exito}>{cargando ? 'Changing password...' : 'Change password'}</button>
                    </form>

                    <button onClick={onVolver} className="mt-7 flex w-full items-center justify-center gap-2 border-0 bg-transparent text-sm font-bold text-[#087f78] transition hover:text-[#066b67]" type="button"><span aria-hidden="true">&larr;</span> Back to sign in</button>
                </div>
            </section>

            <section className="relative hidden min-h-screen overflow-hidden bg-[#075d65] lg:block" aria-label="Foundy account recovery">
                <img className="absolute inset-0 h-full w-full object-cover opacity-80" src="/images/emprendedores-negocios.jpg" alt="Entrepreneurs working together" />
                <div className="absolute inset-0 bg-[#075d65]/60" />
                <div className="absolute inset-x-12 bottom-14 max-w-lg text-white">
                    <div className="mb-7 h-1 w-16 bg-[#64d2b8]" />
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8f0df]">Your next chapter</p>
                    <h2 className="mt-4 text-5xl font-bold leading-[1.02] tracking-tight">Your ideas are still waiting.</h2>
                    <p className="mt-5 max-w-sm text-base leading-7 text-white/80">Secure your account and continue building the opportunities that matter to you.</p>
                </div>
            </section>
        </main>
    );
}

export default Recuperacion;
