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
        // Validar que las contraseñas coincidan
        if (formData.contrasena !== formData.confirmarContrasena) {
            setErrorMsg('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }
        try {
            // 1. Verificar si el usuario ya existe
            const { data: usuarioExistente } = await supabase
                .from('Usuario')
                .select('usuario')
                .eq('usuario', formData.usuario)
                .maybeSingle();
            if (usuarioExistente) {
                setErrorMsg('El nombre de usuario ya está registrado.');
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
                        dui: formData.dui,
                        correo: formData.correo,
                        contrasena: formData.contrasena,
                    },
                ]);
            if (error) throw error;
            setSuccessMsg('¡Usuario registrado con éxito!');
            setTimeout(() => {
                if (onSwitchToLogin) onSwitchToLogin();
            }, 2000);
        } catch (err) {
            if (err.code === '23505' || err.constraint === 'Usuario_pkey') {
                setErrorMsg('El nombre de usuario ya está registrado.');
            } else {
                setErrorMsg(err.message || 'Error al registrar el usuario.');
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="grid min-h-screen grid-cols-1 bg-white text-[#11133f] min-[701px]:grid-cols-[38%_62%]">
            <section className="min-h-auto overflow-y-auto bg-[#05656c] px-6 py-8 min-[701px]:min-h-screen min-[701px]:px-9.5 min-[701px]:pt-9.5 min-[701px]:pb-7">
                <img className="mx-auto mb-7 block w-31.5 max-w-[54%] min-[701px]:mb-8.5" src="/images/foundy-logo.png" alt="Foundy" />
                <div className="mx-auto w-full max-w-107.5">
                    <h1 className="sr-only">Create your account</h1>
                    <p className="hidden">Join Foundy and start building your future.</p>
                    {errorMsg && <div className="mb-4 rounded bg-[#ffe4e4] px-2.5 py-2 text-center text-[11px] text-[#9b2020]" role="alert">{errorMsg}</div>}
                    {successMsg && <div className="mb-4 rounded bg-[#d8f4df] px-2.5 py-2 text-center text-[11px] text-[#17622c]" role="status">{successMsg}</div>}
                    <form onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 min-[701px]:grid-cols-2">
                            <label className="block text-[10px] leading-tight text-[#f6ffff]">Nombre<input className="mt-1.5 block h-8.5 w-full rounded bg-white px-2.75 text-[12px] text-[#1c2449] outline-none placeholder:text-[#a0a5ad] focus:ring-[3px] focus:ring-white/30" type="text" name="nombre" placeholder="Juan" value={formData.nombre} onChange={handleChange} required /></label>
                            <label className="block text-[10px] leading-tight text-[#f6ffff]">Apellidos<input className="mt-1.5 block h-8.5 w-full rounded bg-white px-2.75 text-[12px] text-[#1c2449] outline-none placeholder:text-[#a0a5ad] focus:ring-[3px] focus:ring-white/30" type="text" name="apellidos" placeholder="Pérez García" value={formData.apellidos} onChange={handleChange} required /></label>
                            <label className="block text-[10px] leading-tight text-[#f6ffff]">Correo<input className="mt-1.5 block h-8.5 w-full rounded bg-white px-2.75 text-[12px] text-[#1c2449] outline-none placeholder:text-[#a0a5ad] focus:ring-[3px] focus:ring-white/30" type="text" name="correo" placeholder="@perezgarcia" value={formData.correo} onChange={handleChange} required /></label>
                            <label className="block text-[10px] leading-tight text-[#f6ffff]">Usuario<input className="mt-1.5 block h-8.5 w-full rounded bg-white px-2.75 text-[12px] text-[#1c2449] outline-none placeholder:text-[#a0a5ad] focus:ring-[3px] focus:ring-white/30" type="text" name="usuario" placeholder="juanperez" value={formData.usuario} onChange={handleChange} required /></label>
                            <label className="block text-[10px] leading-tight text-[#f6ffff]">Tipo de usuario<select className="mt-1.5 block h-8.5 w-full rounded bg-white px-2.75 text-[12px] text-[#1c2449] outline-none focus:ring-[3px] focus:ring-white/30" name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange} required><option value="">Selecciona una opción</option><option value="Emprendedor">Emprendedor</option><option value="Inversionista">Inversionista</option></select></label>
                            <label className="block text-[10px] leading-tight text-[#f6ffff]">Teléfono<input className="mt-1.5 block h-8.5 w-full rounded bg-white px-2.75 text-[12px] text-[#1c2449] outline-none placeholder:text-[#a0a5ad] focus:ring-[3px] focus:ring-white/30" type="tel" name="telefono" placeholder="5512345678" value={formData.telefono} onChange={handleChange} required /></label>
                            <label className="block text-[10px] leading-tight text-[#f6ffff]">DUI<input className="mt-1.5 block h-8.5 w-full rounded bg-white px-2.75 text-[12px] text-[#1c2449] outline-none placeholder:text-[#a0a5ad] focus:ring-[3px] focus:ring-white/30" type="text" name="dui" placeholder="23560189-0" value={formData.dui || ''} onChange={handleChange} required /></label>
                            <label className="block text-[10px] leading-tight text-[#f6ffff]">Contraseña<input className="mt-1.5 block h-8.5 w-full rounded bg-white px-2.75 text-[12px] text-[#1c2449] outline-none placeholder:text-[#a0a5ad] focus:ring-[3px] focus:ring-white/30" type="password" name="contrasena" placeholder="••••••••" value={formData.contrasena} onChange={handleChange} required /></label>
                            <label className="block text-[10px] leading-tight text-[#f6ffff]">Confirmar contraseña<input className="mt-1.5 block h-8.5 w-full rounded bg-white px-2.75 text-[12px] text-[#1c2449] outline-none placeholder:text-[#a0a5ad] focus:ring-[3px] focus:ring-white/30" type="password" name="confirmarContrasena" placeholder="••••••••" value={formData.confirmarContrasena} onChange={handleChange} required /></label>
                        </div>
                        <button className="mx-auto mt-6.25 block h-8.5 w-32 rounded bg-[#197e8c] text-[12px] text-white transition hover:-translate-y-px hover:bg-[#2698a5] disabled:cursor-not-allowed disabled:opacity-65 disabled:transform-none" type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Register'}</button>
                    </form>
                    <p className="mt-4.5 text-center text-[11px] text-white/80">¿Ya tienes cuenta? <button className="p-0 font-bold text-white hover:underline" type="button" onClick={onSwitchToLogin}>Inicia sesión</button></p>
                </div>
            </section>
            <section className="relative min-h-95 bg-[url('/images/emprendedores-negocios.jpg')] bg-cover bg-center min-[701px]:min-h-screen" aria-label="Emprendimiento y comercio local">
                <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[9px] bg-white px-6 py-6.5 text-center text-[24px] font-extrabold leading-[1.22] text-[#11133f] shadow-[0_12px_24px_rgba(17,19,63,0.12)] min-[701px]:w-[56%] min-[701px]:max-w-105 min-[701px]:text-[clamp(22px,2.1vw,34px)]">Today a small<br />investment can<br />become a great<br />future</div>
            </section>
        </main>
    );
}
export default Register