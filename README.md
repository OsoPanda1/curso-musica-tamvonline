# Sonora IA — Música con inteligencia artificial

Plataforma educativa en español para aprender a crear canciones con herramientas de inteligencia artificial. El producto contempla una cuenta personal, un programa de nueve módulos y una inscripción propuesta de **$500 MXN por trimestre**.

> **Estado honesto:** existe una base de interfaz, contenido educativo y autenticación Supabase. No debe considerarse lista para cobrar ni para producción hasta implementar y verificar el ciclo completo de pagos, la concesión/revocación de acceso desde el servidor y las pruebas de extremo a extremo. La migración de endurecimiento de datos está en la rama de trabajo y todavía debe aplicarse y verificarse en el proyecto Supabase real. Una pantalla o variable de entorno no constituye integración de pago.

## Funcionalidad identificada

- Landing de presentación y catálogo del curso.
- Programa de nueve módulos con contenido educativo estructurado.
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

## Bloqueadores para producción y cobros

1. **Checkout real:** seleccionar un proveedor, crear órdenes en servidor y validar importe/moneda del lado servidor. Nunca confiar en el precio enviado por el navegador.
2. **Webhook autenticado:** validar la firma del proveedor, aplicar idempotencia y confirmar el estado directamente con el proveedor. No conceder acceso por una URL de retorno del navegador.
3. **Autorización de pago:** la migración endurece las tablas y reserva los eventos de pago al rol de servicio, pero aún falta integrar un proveedor, verificar su firma de webhook y conceder/revocar vigencia desde código servidor. Un helper del cliente no es control de acceso.
4. **Modelo de datos y RLS:** proteger perfiles, suscripciones, progreso y entregas; probar aislamiento entre usuarios.
5. **Pruebas:** cubrir autenticación, permisos, pago aprobado/rechazado/duplicado, reembolso y vencimiento.
6. **Operación:** configurar secretos de producción, dominio, monitorización, límites de solicitudes, copias de seguridad, aviso de privacidad y condiciones de venta.
7. **Derechos:** revisar licencias y condiciones de las herramientas musicales y de IA que se recomiendan en el curso.

## Despliegue

El proyecto usa TanStack Start y configuración Vite de Lovable con Nitro. El destino final debe elegirse y probarse con el adaptador/runtime compatible. Antes de promover una versión, exigir workflow verde y verificar autenticación, recuperación de contraseña, acceso al curso y errores en un entorno de preview.

## Seguridad

- No guardar secretos, claves de servicio ni credenciales de pago en el repositorio.
- Las claves públicas de Supabase pueden aparecer en el cliente; la seguridad depende de Auth, RLS y validación del servidor.
- No conceder acceso mediante parámetros de URL, estado local ni redirecciones exitosas.
- No registrar contraseñas, tokens ni datos de pago sensibles.

## Lovable

Editor del proyecto: https://lovable.dev/projects/7c3a2093-a72d-4094-ba2e-b38c44da8de7
