# Documentacion de Altaria

Esta carpeta describe el funcionamiento de Altaria desde dos perspectivas:

- El area administrativa: fabricar stock, descargar QR, consultar inventario y asignar displays a locales existentes.
- El flujo publico: escanear un QR, configurar el primer local y llegar a Google Reviews en los siguientes escaneos.

## Regla principal

El `serialCode` del display siempre lo aporta el QR. Ninguna persona debe introducir manualmente el ID del display durante la activacion publica.

El administrador puede asignar displays adicionales a un local ya existente desde el portal, pero la activacion inicial ocurre al escanear el QR de un display disponible. En esa pantalla se puede registrar un local nuevo o seleccionar uno existente.

## URL permanente del QR

Un QR puede imprimirse con una URL como `https://altariaa.com/r/003`. Esa URL no cambia nunca. El backend consulta el estado actual del display y decide que pantalla mostrar.

## Documentos

- [Flujo administrativo](01-flujo-administrativo.md)
- [Flujo del QR](02-flujo-del-qr.md)
- [Activacion publica](03-activacion-publica.md)
- [Estados y pantallas](04-estados-y-pantallas.md)
- [Rutas de la aplicacion](05-rutas.md)
- [Despliegue y configuracion](06-despliegue.md)
- [Seguridad](07-seguridad.md)

## Arquitectura resumida

```text
Administrador -> Portal Next.js -> Cookie de sesion HttpOnly -> API ASP.NET
Visitante -> QR /r/{serialCode} -> pantalla publica -> seleccionar/registrar local o Google Reviews
API ASP.NET -> PostgreSQL
```
