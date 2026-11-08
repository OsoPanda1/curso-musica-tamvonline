# Auditoría de Supabase y Vercel — 2026-11-07

## Alcance comprobado

Se consultó el equipo Vercel disponible para esta sesión y el repositorio OsoPanda1/curso-musica-tamvonline.

- El repositorio configura Supabase con project_id = "bvkpecjkpvknipkbbyzt" en supabase/config.toml.
- La migración versionada vive en drizzle/migrations/, no en supabase/migrations/.
- drizzle/migrations/meta/_journal.json contiene tres entradas: 0000_migration, 0001_migration y 0002_security_hardening.
- Existen los archivos SQL 0000_migration.sql, 0001_migration.sql y 0002_security_hardening.sql.
- No existe 0003_migration.sql en la rama main inspeccionada.
- drizzle/schema.ts declara explícitamente que está vacío/autogenerado; no debe tratarse como un esquema Drizzle completo.
- El proyecto Vercel isabella-terminus-v6 que aparece en el equipo no corresponde al repositorio del curso. No expone variables SUPABASE_* en la inspección de nombres de variables y no tiene conexiones de integración por proyecto.
- La integración Supabase de Vercel está presente a nivel de cuenta/equipo, pero su lista de proyectos seleccionados está vacía. No se encontró un proyecto Vercel del curso en ese equipo.

## Qué NO se puede concluir

Esta inspección no accedió al historial de migraciones aplicado en la base de datos remota bvkpecjkpvknipkbbyzt. Por tanto, no confirma si la base remota tiene tres o cuatro migraciones aplicadas, ni si existe una cuarta migración fuera del repositorio.

## Acción segura pendiente

1. Conectar el servicio Supabase a la sesión para poder consultar el proyecto remoto correcto.
2. Leer el historial remoto de migraciones y el esquema vivo, sin ejecutar cambios.
3. Comparar ese historial con los tres SQL versionados.
4. Identificar la cuarta migración (si existe), su contenido, checksum y estado.
5. Preparar un plan de reconciliación. Solo después de validar el diff se puede decidir si falta versionarla, aplicarla o corregir el journal.

**No ejecutar db push, migration repair, SQL de pago ni cambios de RLS hasta verificar el historial remoto.** Una migración duplicada o aplicada fuera de orden puede romper la autenticación, el progreso o la concesión de acceso.
