# Sonora IA — Música con inteligencia artificial

Plataforma educativa en español para aprender a crear canciones con herramientas de inteligencia artificial. El producto contempla una cuenta personal, un programa de nueve módulos y una inscripción propuesta de **$500 MXN por trimestre**.

> **Estado honesto:** existe una base de interfaz, contenido educativo y autenticación Supabase. No debe considerarse lista para cobrar ni para producción hasta implementar y verificar el ciclo completo de pagos, la concesión/revocación de acceso desde el servidor y las pruebas de extremo a extremo. La migración de endurecimiento de datos está en la rama de trabajo y todavía debe aplicarse y verificarse en el proyecto Supabase real. Una pantalla o variable de entorno no constituye integración de pago.

## Funcionalidad identificada

- Landing de presentación y catálogo del curso.
- Programa de nueve módulos con catálogo público y contenido de lecciones servido por endpoint autenticado; los cuerpos completos no se incluyen en el catálogo enviado al navegador.
- Registro e inicio de sesión por correo/contraseña mediante Supabase.
- Recuperación de contraseña.
- Opción de autenticación con Google mediante la integración de Lovable.
- Cálculo de insignias y helper de dominio para comprobar vigencia de acceso.
- Stack: React, TypeScript, TanStack Start/Router, Vite, Tailwind CSS y Supabase.

## Requisitos y ejecución local

Se utiliza Bun y el lockfile `bun.lock`.

```sh
git clone https://github.com/OsoPanda1/m-sica-con-ia.git
cd m-sica-con-ia
bun install --frozen-lockfile
cp .env.example .env
bun run dev
```

Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` con los valores públicos del proyecto Supabase. Configura los proveedores de autenticación y las URL permitidas de redirección. No incluyas claves privadas en variables `VITE_*` ni en Git.

## Validación

```sh
bun run lint
bun run build
```

Se añadió un workflow de GitHub Actions para ejecutar instalación reproducible, lint, pruebas unitarias y build en pushes y pull requests. El resultado debe verificarse en GitHub; no se afirma que haya pasado hasta observar una ejecución verde.

## Cobros: implementación y requisitos restantes

1. **Checkout implementado:** el servidor crea la preferencia de Mercado Pago con precio fijo de $500 MXN; el navegador no decide el importe. Requiere `MP_ACCESS_TOKEN` y `APP_BASE_URL`.
2. **Webhook implementado:** valida HMAC, consulta el pago canónico con Mercado Pago y compara usuario, producto, importe y moneda. Requiere `MP_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY` y URL pública HTTPS.
3. **Concesión idempotente:** `apply_verified_payment` registra eventos y otorga tres meses una sola vez por pago; las notificaciones repetidas no duplican el acceso.
4. **Entrega protegida:** los cuerpos de las lecciones se mantienen en un módulo de servidor y se entregan por un endpoint que verifica la sesión y la vigencia de la inscripción. RLS también limita el progreso de lecciones pagadas.
5. **Reembolso/contracargo:** la función revierte la vigencia de ese evento si sigue siendo la vigencia activa. Si una compra posterior ya extendió el acceso, requiere conciliación manual para no revocar una compra distinta.
6. **Pendiente antes de producción:** aplicar y verificar la migración en el proyecto Supabase real, configurar los secretos en el hosting, configurar la URL de notificaciones en Mercado Pago y ejecutar pruebas de integración en sandbox, incluyendo reintentos y reembolsos.
7. **Operación y cumplimiento:** configurar dominio, monitorización, límites de solicitudes, copias de seguridad, aviso de privacidad, condiciones de venta y revisar las licencias de las herramientas musicales recomendadas.
## Despliegue

El proyecto usa TanStack Start y configuración Vite de Lovable con Nitro. El destino final debe elegirse y probarse con el adaptador/runtime compatible. Antes de promover una versión, exigir workflow verde y verificar autenticación, recuperación de contraseña, acceso al curso y errores en un entorno de preview.

## Seguridad

- No guardar secretos, claves de servicio ni credenciales de pago en el repositorio.
- Las claves públicas de Supabase pueden aparecer en el cliente; la seguridad depende de Auth, RLS y validación del servidor.
- No conceder acceso mediante parámetros de URL, estado local ni redirecciones exitosas.
- No registrar contraseñas, tokens ni datos de pago sensibles.

## Lovable

Editor del proyecto: https://lovable.dev/projects/7c3a2093-a72d-4094-ba2e-b38c44da8de7
