# Activacion publica

## Objetivo

La activacion publica permite que el primer escaneo configure un display sin que el visitante conozca ni introduzca un ID interno.

## Pantalla inicial

Ruta:

```text
/activacion?serialCode=001
```

La pagina muestra el serial recibido como referencia visual y ofrece dos opciones:

- Buscar un local existente.
- Registrar un local nuevo con `Nombre del local` y `URL de Google Reviews`.

No muestra un campo `displayId`: el serial ya viene dentro del QR.

## Solicitud al backend

```http
POST /api/public/displays/{serialCode}/activate
Content-Type: application/json
```

Ejemplo de cuerpo al seleccionar un local existente:

```json
{
  "businessId": 7
}
```

Ejemplo de cuerpo al registrar un local nuevo:

```json
{
  "name": "Cafeteria Central",
  "googleReviewUrl": "https://g.page/r/ejemplo"
}
```

La ruta es publica porque el permiso para activar esta limitado por el estado del display y por el serial contenido en el QR. El endpoint no usa la sesion administrativa.

## Respuestas esperadas

- `200 OK`: local creado y display activado.
- `400 Bad Request`: faltan nombre o URL valida.
- `404 Not Found`: el serial no existe.
- `409 Conflict`: el display esta desactivado o ya fue configurado.

## Pantalla de exito

Despues de activar, la pantalla confirma que el display esta vinculado y ofrece abrir la pantalla publica.

## Reintentos

Si dos personas intentan configurar el mismo QR, la primera solicitud valida y guarda el vinculo. La siguiente recibe `409 Conflict`. Esto evita crear dos locales para un mismo display.
