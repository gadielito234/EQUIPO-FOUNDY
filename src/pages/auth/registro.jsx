import { useState } from 'react';
import { supabase } from '../../services/supabase.js';
function Register({ onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        usuario: '',
        tipo_usuario: '',
        correo: '',
        telefono: '',
        dui: '',
        contrasena: '',
        confirmarContrasena: '',

    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,50}$/.test(formData.nombre)) {
            setErrorMsg('El nombre debe tener entre 2 y 50 letras.');
            setLoading(false);
            return;
        }
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,50}$/.test(formData.apellidos)) {
            setErrorMsg('Los apellidos deben tener entre 2 y 50 letras.');
            setLoading(false);
            return;
        }
        if (!/^[A-Za-z0-9_]{4,20}$/.test(formData.usuario)) {
            setErrorMsg('El usuario debe tener entre 4 y 20 caracteres: letras, números o _.');
            setLoading(false);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
            setErrorMsg('Ingresa un correo electrónico válido.');
            setLoading(false);
            return;
        }
        if (!formData.tipo_usuario) {
            setErrorMsg('Selecciona un tipo de usuario.');
            setLoading(false);
            return;
        }
        if (!/^\d{8}$/.test(formData.telefono)) {
            setErrorMsg('El teléfono debe tener exactamente 8 números.');
            setLoading(false);
            return;
        }
        if (!/^\d{8}-\d$/.test(formData.dui)) {
            setErrorMsg('El DUI debe tener el formato 12345678-9.');
            setLoading(false);
            return;
        }
        if (formData.contrasena.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.contrasena)) {
            setErrorMsg('La contraseña debe tener 8 caracteres, una mayúscula, una minúscula y un número.');
            setLoading(false);
            return;
        }
        if (formData.contrasena !== formData.confirmarContrasena) {
            setErrorMsg('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }
        const duiNumerico = Number(formData.dui.replace('-', ''));
        try {
            // 1. Verificar si el usuario ya existe
            const { data: usuarioExistente, error: consultaError } = await supabase
                .from('Usuario')
                .select('dui')
                .eq('dui', duiNumerico)
                .maybeSingle();
            if (consultaError) throw consultaError;
            if (usuarioExistente) {
                setErrorMsg('El usuario ya está registrado.');
                setLoading(false);
                return;
            }
            // 2. Insertar el nuevo usuario en la tabla "Usuario"
            const { error } = await supabase
                .from('Usuario')
                .insert([
                    {
                        nombre: formData.nombre,
                        apellidos: formData.apellidos,
                        usuario: formData.usuario,
                        tipo_usuario: formData.tipo_usuario,
                        telefono: formData.telefono,
                        dui: duiNumerico,
                        correo: formData.correo,
                        contrasena: formData.contrasena,
                    },
                ]);
            if (error) throw error;
            setSuccessMsg('¡Usuario registrado con éxito!');
            setTimeout(() => {
                if (onSwitchToLogin) onSwitchToLogin();
            }, 2000);
        } catch (error) {
            setErrorMsg(error.message || 'No se pudo guardar el usuario. Verifica la conexión con Supabase.');
        }
        finally {
            setLoading(false);
        }
    };

    const fieldClass = 'mt-2 block h-11 w-full rounded-lg border border-[#d7e5e3] bg-white px-3.5 text-sm text-[#142d39] outline-none transition placeholder:text-[#9aabad] hover:border-[#8fc9c0] focus:border-[#079184] focus:ring-4 focus:ring-[#079184]/10';
    return (
        <main className="min-h-screen bg-[#f4faf8] text-[#142d39] lg:grid lg:grid-cols-[minmax(31rem,0.9fr)_1.1fr]">
            <section className="relative overflow-hidden px-6 py-7 sm:px-10 lg:flex lg:min-h-screen lg:flex-col lg:px-[clamp(2.5rem,7vw,7rem)] lg:py-10">
                <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#b9e8dd]/45" aria-hidden="true" />
                <div className="relative z-10 flex items-center justify-between">
                    <img className="h-9 w-auto object-contain brightness-0 invert" src="/images/foundy-logo.png" alt="Foundy" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5d8888]">Únete a Foundy</span>
                </div>
                <div className="relative z-10 mx-auto mt-14 w-full max-w-xl lg:my-auto lg:py-12">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#079184]">Tu próximo paso</p>
                    <h1 className="mt-3 max-w-lg text-4xl font-bold leading-[1.05] tracking-tight text-[#113b47] sm:text-5xl">Apoyando el emprendimiento Salvadoreño.</h1>
                    <p className="mt-5 max-w-md text-sm leading-6 text-[#5d7277]">Crea tu perfil y conecta con las oportunidades que pueden llevar tu idea más lejos.</p>
                    {errorMsg && <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{errorMsg}</div>}
                    {successMsg && <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" role="status">{successMsg}</div>}
                    <form className="mt-8" onSubmit={handleRegister} noValidate>
                        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                            <label className="text-xs font-semibold text-[#31515a]">Nombre<input className={fieldClass} type="text" name="nombre" minLength={2} maxLength={50} pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+" placeholder="Juan" value={formData.nombre} onChange={handleChange} required /></label>
                            <label className="text-xs font-semibold text-[#31515a]">Apellidos<input className={fieldClass} type="text" name="apellidos" minLength={2} maxLength={50} pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+" placeholder="Pérez García" value={formData.apellidos} onChange={handleChange} required /></label>
                            <label className="text-xs font-semibold text-[#31515a]">Correo<input className={fieldClass} type="email" name="correo" maxLength={100} placeholder="juan@ejemplo.com" value={formData.correo} onChange={handleChange} required /></label>
                            <label className="text-xs font-semibold text-[#31515a]">Usuario<input className={fieldClass} type="text" name="usuario" minLength={4} maxLength={20} pattern="[A-Za-z0-9_]+" placeholder="juanperez" value={formData.usuario} onChange={handleChange} required /></label>
                            <label className="text-xs font-semibold text-[#31515a]">Tipo de usuario<select className={fieldClass} name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange} required><option value="">Selecciona una opción</option><option value="Emprendedor">Emprendedor</option><option value="Inversionista">Inversionista</option></select></label>
                            <label className="text-xs font-semibold text-[#31515a]">Teléfono<input className={fieldClass} type="tel" name="telefono" placeholder="77777777" value={formData.telefono} inputMode="numeric" maxLength={8} pattern="[0-9]{8}" onChange={handleChange} required /></label>
                            <label className="text-xs font-semibold text-[#31515a]">DUI<input className={fieldClass} type="text" name="dui" placeholder="23560189-0" value={formData.dui || ''} maxLength={10} pattern="[0-9]{8}-[0-9]" onChange={handleChange} required /></label>
                            <div className="hidden sm:block" aria-hidden="true" />
                            <label className="text-xs font-semibold text-[#31515a]">Contraseña<input className={fieldClass} type="password" name="contrasena" minLength={8} maxLength={72} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}" placeholder="••••••••" value={formData.contrasena} onChange={handleChange} required /></label>
                            <label className="text-xs font-semibold text-[#31515a]">Confirmar contraseña<input className={fieldClass} type="password" name="confirmarContrasena" minLength={8} maxLength={72} placeholder="••••••••" value={formData.confirmarContrasena} onChange={handleChange} required /></label>
                        </div>
                        <button className="mt-8 h-12 w-full rounded-lg bg-[#087f78] text-sm font-bold text-white shadow-[0_8px_18px_rgba(8,127,120,0.2)] transition hover:-translate-y-0.5 hover:bg-[#066b67] focus:outline-none focus:ring-4 focus:ring-[#079184]/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none" type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Crear mi cuenta'}</button>
                    </form>
                    <p className="mt-6 text-center text-sm text-[#6d7f83]">¿Ya tienes cuenta? <button className="font-bold text-[#087f78] hover:underline" type="button" onClick={onSwitchToLogin}>Inicia sesión</button></p>
                </div>
            </section>
            <section className="relative hidden min-h-screen overflow-hidden bg-[#075d65] lg:block" aria-label="Emprendimiento y comercio local">
                <img className="absolute inset-0 h-full w-full object-cover opacity-80" src="/images/emprendedores-negocios.jpg" alt="Emprendedores y comercio local" />
                <div className="absolute inset-0 bg-[#075d65]/55" />
                <div className="absolute inset-x-12 bottom-14 max-w-lg text-white">
                    <div className="mb-7 h-1 w-16 bg-[#64d2b8]" />
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8f0df]">Ideas que encuentran impulso</p>
                    <h2 className="mt-4 text-5xl font-bold leading-[1.02] tracking-tight">Tu idea merece una comunidad.</h2>
                    <p className="mt-5 max-w-sm text-base leading-7 text-white/80">Foundy conecta a quienes imaginan el futuro con quienes pueden ayudar a construirlo.</p>
                </div>
            </section>
        </main>
    );
}
export default Register