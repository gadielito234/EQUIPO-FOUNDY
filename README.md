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

## Asistente de IA

El asesor de proyectos usa la Edge Function `chat-ai` y Gemini. Para habilitarlo, despliega la funcion y configura la clave de Gemini como secreto de Supabase; no agregues esa clave a `.env` del navegador ni al repositorio:

```bash
supabase functions deploy chat-ai
supabase secrets set GEMINI_API_KEY=tu_clave_de_gemini
```

La interfaz conserva el historial de la conversacion durante la sesion, incluye preguntas sugeridas y muestra errores de configuracion o del proveedor para facilitar el diagnostico.

## Base de datos

Ejecuta primero tu esquema base en el SQL Editor de Supabase y después ejecuta [supabase/persistence.sql](supabase/persistence.sql). Ese segundo script crea los IDs automáticos de proyectos, corrige las relaciones de inversiones y pagos, agrega preferencias, soporte, notificaciones, chat, categorías iniciales y el bucket de imágenes.

La aplicación usa actualmente la tabla `Usuario` como autenticación heredada. Para producción debes migrar el login a Supabase Auth y reemplazar las políticas públicas del bucket por políticas basadas en `auth.uid()`; la clave publishable no debe considerarse un mecanismo de seguridad.

El formulario pide al emprendedor el monto de ganancia total que proyecta para el proyecto y el plazo estimado en meses. Al publicar, ambos datos y el monto objetivo son obligatorios. El inversionista ve la proyección de su parte calculada según su participación antes de invertir. El script crea `investment_contracts` y genera una constancia cuando `pago.estado` cambia a `paid`, `completed`, `confirmed`, `confirmado`, `pagado` o `completado`; guarda el aporte, la ganancia estimada proporcional y la fecha de retorno calculada desde la confirmación del pago. El inversionista y el emprendedor pueden consultar y descargar el PDF desde sus paneles. Las ganancias y fechas son proyecciones, no rendimientos garantizados; el documento debe ser revisado y firmado por ambas partes. El flujo actual solo registra pagos pendientes: conecta el proveedor de pagos para actualizar `pago.estado` tras confirmar realmente una transacción. No marques el pago como confirmado antes de recibir esa confirmación.

Después de ejecutar ambos scripts, inicia con `npm run dev` y registra un usuario nuevo para comprobar registro, login, perfil, proyecto, inversión, notificaciones, chat y soporte.

## Organización

- `src/pages/auth`: registro, login y recuperación.
- `src/pages/emprendedor`: proyectos y estadísticas.
- `src/pages/inversionista`: oportunidades e inversiones.
- `src/pages/chat`: mensajería.
- `src/pages/shared`: layout y configuración común.
- `src/services`: conexión con servicios externos.
