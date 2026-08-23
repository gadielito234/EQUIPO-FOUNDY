import { useState } from 'react';
import { supabase } from '../services/supabase';
function Register({ onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        usuario: '',
        tipo_usuario: '',
        telefono: '',
        dui: '',
        contrasena: '',
        confirmarContrasena: '',
        telefono: '',
        dui: '',
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
c
                    },
                ]);
            if (error) throw error;
            setSuccessMsg('¡Usuario registrado con éxito!');
            setTimeout(() => {
                if (onSwitchToLogin) onSwitchToLogin();
            }, 2000);
        } catch (err) {
            setErrorMsg(err.message || 'Error al registrar el usuario.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
            <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Crear cuenta</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Ingresa tus datos para registrarte
                    </p>
                </div>
                {/* Alerta de Error */}
                {errorMsg && (
                    <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-center text-sm text-red-700" role="alert">
                        {errorMsg}
                    </div>
                )}
                {/* Alerta de Éxito */}
                {successMsg && (
                    <div className="mb-4 rounded-md bg-green-50 px-3 py-2 text-center text-sm text-green-700" role="alert">
                        {successMsg}
                    </div>
                )}
                <form onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                placeholder="Juan"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Apellidos</label>
                            <input
                                type="text"
                                name="apellidos"
                                className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                placeholder="Pérez García"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="mb-1 block text-sm font-medium text-slate-700">Usuario</label>
                        <input
                            type="text"
                            name="usuario"
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                            placeholder="juanperez"
                            value={formData.usuario}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tipo de usuario</label>
                        <select
                            name="tipo_usuario"
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                            value={formData.tipo_usuario}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Emprendedor">Emprendedor</option>
                            <option value="Inversionista">Inversionista</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="mb-1 block text-sm font-medium text-slate-700">Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                            placeholder="5512345678"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Esto fue lo que Venus, Iveth y Zoar añadieron */}
                    <div className="mt-4">
                        <label className="mb-1 block text-sm font-medium text-slate-700">DUI</label>
                        <input
                            type="text"
                            name="dui"
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                            placeholder="23560189-0"
                            value={formData.dui}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
                        <input
                            type="password"
                            name="contrasena"
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                            placeholder="••••••••"
                            value={formData.contrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="mb-1 block text-sm font-medium text-slate-700">Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmarContrasena"
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                            placeholder="••••••••"
                            value={formData.confirmarContrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-6 w-full rounded-md bg-teal-700 px-4 py-2.5 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                <p className="mt-5 text-center text-sm text-slate-600">
                    ¿Ya tienes cuenta?{" "}
                    <button
                        type="button"
                        className="p-0 font-semibold text-teal-700 hover:underline"
                        onClick={onSwitchToLogin}
                    >
                        Inicia sesión
                    </button>
                </p>
            </div>
        </div>
    );
}
export default Register