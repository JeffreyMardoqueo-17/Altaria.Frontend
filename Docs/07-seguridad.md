# Seguridad

## Sesion administrativa

La sesion usa JWT firmado en backend y una cookie:

- `HttpOnly`: JavaScript no puede leerla.
- `Secure` en produccion: solo via HTTPS.
- `SameSite=Lax`: reduce solicitudes cross-site no deseadas.
- Expiracion limitada: ocho horas en la configuracion actual.

El frontend no usa `localStorage`, no muestra el JWT y no envia `X-Admin-Key`.

## Credenciales

- La contrasena administrativa se almacena como hash PBKDF2 con sal aleatoria.
- PostgreSQL se configura desde `.env`.
- Los secretos reales no deben escribirse en Markdown, `appsettings.json`, Dockerfile ni codigo fuente.
- Rotar las credenciales de desarrollo antes de desplegar.

## Limites del flujo publico

La activacion publica no concede acceso administrativo. Solo puede vincular un display disponible identificado por su propio QR.

Los endpoints de inventario, usuarios, negocios y fabricacion requieren rol `Admin`.

## Protecciones operativas recomendadas

- Publicar la API detras de HTTPS y un reverse proxy.
- Aplicar rate limiting al login y a la activacion publica.
- Registrar intentos fallidos sin registrar contrasenas ni cookies.
- Revisar periodicamente displays desactivados y URLs de Google Reviews.
- Mantener dependencias y la imagen de .NET actualizadas.
