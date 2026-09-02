# Foundy

Aplicación web para conectar emprendedores e inversionistas.

## Iniciar el proyecto

```bash
npm install
npm run dev
```

Configura las variables de Supabase en `.env`:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

## Base de datos

El archivo [supabase/persistence.sql](supabase/persistence.sql) contiene cambios adicionales para inversiones, pagos y preferencias. No se ejecuta automáticamente: debes copiarlo y ejecutarlo manualmente en el SQL Editor de Supabase.

## Organización

- `src/pages/auth`: registro, login y recuperación.
- `src/pages/emprendedor`: proyectos y estadísticas.
- `src/pages/inversionista`: oportunidades e inversiones.
- `src/pages/chat`: mensajería.
- `src/pages/shared`: layout y configuración común.
- `src/services`: conexión con servicios externos.
