import { useState } from 'react';
import { supabase } from './supabase';

function Register({ onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        usuario: '',
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
            // 1. Verificar si el usuario ya existe en la base de datos
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
                        apellido: formData.apellido,
                        usuario: formData.usuario,
                        contrasena: formData.contrasena, // Recuerda encriptar en produccion (ej. bcrypt)
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
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light my-4">
            <div className="card shadow p-4" style={{ width: "420px" }}>

                <div className="text-center mb-4">
                    <h2 className="fw-bold">Crear cuenta</h2>
                    <p className="text-muted">
                        Ingresa tus datos para registrarte
                    </p>
                </div>

                {/* Alerta de Error */}
                {errorMsg && (
                    <div className="alert alert-danger py-2 small text-center" role="alert">
                        {errorMsg}
                    </div>
                )}

                {/* Alerta de Éxito */}
                {successMsg && (
                    <div className="alert alert-success py-2 small text-center" role="alert">
                        {successMsg}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                placeholder="Juan"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label">Apellido</label>
                            <input
                                type="text"
                                name="apellido"
                                className="form-control"
                                placeholder="Pérez"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input
                            type="text"
                            name="usuario"
                            className="form-control"
                            placeholder="juanperez"
                            value={formData.usuario}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            name="contrasena"
                            className="form-control"
                            placeholder="••••••••"
                            value={formData.contrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmarContrasena"
                            className="form-control"
                            placeholder="••••••••"
                            value={formData.confirmarContrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="text-center mt-4 mb-0">
                    ¿Ya tienes cuenta?{" "}
                    <button
                        type="button"
                        className="btn btn-link p-0 text-primary text-decoration-none fw-semibold"
                        onClick={onSwitchToLogin}
                    >
                        Inicia sesión
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Register;