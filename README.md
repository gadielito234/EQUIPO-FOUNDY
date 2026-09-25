# Foundy

Aplicación web para conectar emprendedores e inversionistas.

## Iniciar el proyecto

```bash
npm install
npm run dev
```

Configura las variables de Supabase en `.env` (puedes partir de `.env.example`):

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

## Base de datos

Ejecuta primero tu esquema base en el SQL Editor de Supabase y después ejecuta [supabase/persistence.sql](supabase/persistence.sql). Ese segundo script crea los IDs automáticos de proyectos, corrige las relaciones de inversiones y pagos, agrega preferencias, soporte, notificaciones, chat, categorías iniciales y el bucket de imágenes.

La aplicación usa actualmente la tabla `Usuario` como autenticación heredada. Para producción debes migrar el login a Supabase Auth y reemplazar las políticas públicas del bucket por políticas basadas en `auth.uid()`; la clave publishable no debe considerarse un mecanismo de seguridad.

Después de ejecutar ambos scripts, inicia con `npm run dev` y registra un usuario nuevo para comprobar registro, login, perfil, proyecto, inversión, notificaciones, chat y soporte.

## Organización

- `src/pages/auth`: registro, login y recuperación.
- `src/pages/emprendedor`: proyectos y estadísticas.
- `src/pages/inversionista`: oportunidades e inversiones.
- `src/pages/chat`: mensajería.
- `src/pages/shared`: layout y configuración común.
- `src/services`: conexión con servicios externos.
