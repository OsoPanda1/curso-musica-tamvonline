# Auditoría técnica de la propuesta Play & Go

**Fecha:** 2026-11-07  
**Base revisada:** HTML entregado `interfaz_play_go_tamv_online_network.html` y aplicación `OsoPanda1/curso-musica-tamvonline`.  
**Alcance:** interfaz, comportamiento del cliente, coherencia del catálogo, seguridad de presentación y ruta de despliegue. No sustituye una prueba de penetración ni una validación end-to-end de servicios externos.

## Hallazgos del HTML entregado

| Severidad | Hallazgo | Riesgo / corrección |
| --- | --- | --- |
| Crítica funcional | `simulateAuth()` muestra un `alert()` y cierra el modal; no crea ni valida cuentas. | Se evita trasladar esa falsa autenticación. La nueva portada usa la ruta real `/auth` de la aplicación, que depende de Supabase. |
| Alta funcional | `startModuleLesson()` solo muestra una alerta que simula cargar sintetizadores. | La nueva portada enlaza a la ruta real de lecciones y al catálogo existente. |
| Alta coherencia | La propuesta declara 10 módulos, mientras que el producto real contiene 9 módulos y 22 lecciones. | La interfaz se alimenta de `COURSE` y `ALL_LESSONS`; no se inventa un décimo módulo ni lecciones adicionales. |
| Alta funcional | `renderDrawerContent(sectionFilter)` recibe un filtro, pero construye el listado con todos los módulos sin aplicar el filtro. | El nuevo catálogo permite búsqueda real por título, objetivo y títulos de lecciones. |
| Alta producto | El perfil del HTML usa un ID fijo, avance fijo `0/10` y membresía estática. | No se trasladan esos datos de muestra a la interfaz renovada. El perfil real debe seguir usando el estado de cuenta del servidor. |
| Media accesibilidad | Tarjetas interactivas basadas en `div onclick`, sin semántica de botón/enlace ni soporte de teclado inherente. | La nueva interfaz utiliza enlaces, botones y controles etiquetados. |
| Media rendimiento | El canvas anima 300 partículas indefinidamente y no contempla `prefers-reduced-motion`; puede consumir batería/CPU en móviles. | La nueva portada no necesita un canvas perpetuo; se reduce movimiento decorativo y se prioriza el contenido. |
| Media dependencias | Tailwind, Lucide, Font Awesome y fuentes se cargan por CDN en el HTML. | La aplicación usa sus dependencias del proyecto y `lucide-react`; se reducen dependencias externas de runtime para la UI principal. |
| Media evidencia | Los DOI y etiquetas como “ORCID verificado” se muestran sin comprobación dentro del HTML. | Los enlaces de referencia se marcan explícitamente como registros aportados que deben verificarse en sus fuentes. |
| Media despliegue | El HTML es un documento estático con scripts inline; no integra por sí solo auth, pagos, RLS ni rutas de servidor. | La implementación se integra en la aplicación React/TanStack existente, sin reemplazar el control de acceso del servidor. |

## Cambios implementados en la rama

- Rediseño de la página principal con jerarquía visual Play & Go/TAMV, diseño adaptable, CTA de registro y acceso a la lección abierta.
- Catálogo enlazado a los módulos y lecciones reales, con búsqueda en cliente y estado vacío accesible.
- Navegación superior adaptable a móvil, con identidad Play & Go y enlaces a programa y herramientas.
- Sección de herramientas de software abierto con enlaces a sus proyectos originales y advertencia para verificar licencias/condiciones.
- Sección de registros con enlaces DOI aportados, sin presentarlos como evidencia verificada.
- `vercel.json` para seleccionar el preset de Nitro de Vercel durante build, más cabeceras de seguridad básicas.
- Guía de despliegue con variables, secretos, autenticación, pagos, webhooks, RLS y checklist de producción.
- README actualizado para documentar los cambios y la puerta de salida a producción.

## Riesgos que siguen requiriendo verificación

1. **Build real:** no se ha podido ejecutar una compilación local en este entorno. Los runs de GitHub Actions consultados terminan en fallo sin pasos registrados; también aparece fallo en el commit base. Eso no permite atribuir el fallo al cambio de interfaz. Debe recuperarse un run con logs útiles y conseguir una ejecución verde.
2. **Adaptador de Vercel:** confirmar que Nitro genera el artefacto Vercel esperado y que las rutas de servidor responden en Preview. El `vercel.json` no prueba por sí solo el despliegue.
3. **Supabase:** comprobar variables, redirect URLs, migración aplicada, políticas RLS y recuperación de contraseña en el proyecto real.
4. **Mercado Pago:** probar en sandbox creación de preferencia, firma de webhook, consulta canónica del pago, idempotencia, rechazo y reembolso. No habilitar cobros reales hasta superar esas pruebas.
5. **Contenido y activos:** confirmar que los registros DOI existen y corresponden exactamente a los títulos mostrados; verificar derechos, licencias y términos de herramientas/modelos recomendados.
6. **Cumplimiento:** publicar aviso de privacidad, términos, política de reembolso y contacto operativo antes de cobrar.

## Criterio de aceptación

No declarar “100 % producción” hasta que lint, pruebas, build, Preview, auth, permisos de lecciones y flujo de pagos hayan sido verificados con evidencia reproducible. La portada está implementada en la rama de trabajo; la disponibilidad productiva de servicios externos y el despliegue final permanecen pendientes de comprobación.
