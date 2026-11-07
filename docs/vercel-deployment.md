# Despliegue de Sonora IA / Play & Go en Vercel

## Arquitectura y principio de despliegue

La aplicación es una aplicación React + TypeScript basada en TanStack Start/Router y Vite, con rutas de servidor para checkout, webhooks y entrega de lecciones protegidas. No debe desplegarse como un sitio estático puro: las rutas de servidor son parte del control de acceso y de la integración de pagos.

El archivo `vercel.json` fija el preset de Nitro a `vercel` durante el build y usa Bun con el lockfile existente. La compatibilidad final debe confirmarse en el build de Vercel y mediante pruebas en la URL desplegada; el archivo de configuración por sí solo no prueba que producción esté lista.

## Preparación en Vercel

1. Importa el repositorio `OsoPanda1/curso-musica-tamvonline` desde GitHub.
2. Usa la raíz del repositorio como **Root Directory**.
3. No fuerces un directorio de salida estático. El adaptador de Nitro debe producir el artefacto de despliegue compatible con Vercel.
4. Usa los comandos definidos en `vercel.json`: `bun install --frozen-lockfile` y `NITRO_PRESET=vercel bun run build`.
5. Configura las variables por ambiente (Development, Preview y Production) según la matriz siguiente. No pongas secretos en variables `VITE_*`.
6. Añade el dominio definitivo en Vercel y configura las URL permitidas de redirección en Supabase.
7. Despliega primero a Preview y ejecuta la lista de validación antes de promover a Production.

## Variables de entorno

| Variable | Uso | Exposición |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | URL del proyecto Supabase usado por el navegador | Pública |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clave publicable de Supabase | Pública; la seguridad depende de RLS y políticas correctas |
| `SUPABASE_URL` | Cliente Supabase de servidor | Privada/configuración |
| `SUPABASE_PUBLISHABLE_KEY` | Clave publicable usada por tareas de servidor que la requieren | Pública/configuración |
| `SUPABASE_SERVICE_ROLE_KEY` | Operaciones privilegiadas de servidor/webhook | **Secreto crítico; nunca exponer al cliente** |
| `MP_ACCESS_TOKEN` | Crear y consultar pagos de Mercado Pago | **Secreto crítico** |
| `MP_WEBHOOK_SECRET` | Validación de firma de notificaciones de Mercado Pago | **Secreto crítico** |
| `APP_BASE_URL` | URL HTTPS canónica de la aplicación | Configuración; sin barra final preferentemente |

Copia los nombres exactos de `.env.example`. No añadas valores de producción a Git, tickets, capturas ni logs. Si un secreto se ha publicado por accidente, rótalo de inmediato.

## Verificación antes de producción

### Build y calidad

```bash
bun install --frozen-lockfile
bun run lint
bun run test
NITRO_PRESET=vercel bun run build
```

En el proveedor, confirma que el build termina correctamente y revisa el artefacto/registro de Nitro para comprobar que se generó el destino Vercel, no el preset predeterminado de otro proveedor.

### Autenticación y navegación

- [ ] Inicio, registro, cierre de sesión y persistencia de sesión funcionan.
- [ ] Recuperación de contraseña y enlaces de retorno usan el dominio correcto.
- [ ] La ruta de curso requiere sesión cuando corresponde.
- [ ] El contenido de lecciones protegidas no está incluido en el bundle público.
- [ ] Una sesión caducada no conserva acceso a endpoints protegidos.
- [ ] Las rutas inexistentes y los errores muestran una salida útil.

### Pagos

- [ ] Probar checkout con credenciales sandbox de Mercado Pago.
- [ ] Confirmar que el importe y la moneda se calculan en el servidor.
- [ ] Validar la firma del webhook y consultar el pago canónico al proveedor.
- [ ] Reintentar el mismo webhook y comprobar que no duplica la inscripción.
- [ ] Probar pago rechazado, pendiente, reembolso y notificación malformada.
- [ ] Aplicar y verificar la migración SQL en el proyecto Supabase real.
- [ ] Confirmar que el acceso se concede solo después de la verificación server-side.
- [ ] Confirmar que las URL de notificación apuntan al dominio desplegado.

### Seguridad, privacidad y observabilidad

- [ ] Revisar RLS para perfiles, progreso, pagos e inscripciones.
- [ ] Verificar que ningún endpoint privilegiado confía en el precio o el usuario enviado por el navegador.
- [ ] Añadir aviso de privacidad, términos del servicio, política de reembolso y contacto operativo antes de cobrar.
- [ ] Configurar límites de solicitudes y monitorización de errores.
- [ ] Confirmar estrategia de respaldo y recuperación de Supabase.
- [ ] Auditar licencias, marcas, derechos de voz, datasets y términos de cada herramienta/modelo musical.

## Límites honestos

La portada mejorada no constituye una integración de autenticación ni de pago: esas funciones dependen de las rutas de servidor, Supabase, Mercado Pago, secretos válidos y políticas de base de datos. No declares el proyecto listo para cobrar hasta completar las pruebas anteriores y verificar una ejecución verde de CI y del build de Vercel.
