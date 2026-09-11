# Estados y pantallas

## Available: disponible

El display existe, pero no tiene local vinculado.

Al escanear:

- Se abre la pantalla publica.
- Aparece `Este display todavia no esta activado`.
- Se ofrece `Configurar display`.
- El visitante puede buscar un local existente o registrar uno nuevo.
- El QR identifica el display; no se escribe ningun ID.

## Active: activo

El display tiene un local y una URL de Google Reviews.

Al escanear:

- Se muestra el nombre del local.
- Se muestra un mensaje de bienvenida.
- Aparece un boton para dejar una resena en Google.
- El boton abre la URL guardada en una pestana nueva.
- La URL del QR sigue siendo la misma, por ejemplo `/r/003`.

## Disabled: desactivado

El display fue bloqueado por administracion.

Al escanear:

- El backend responde `410 Gone`.
- No se permite activar ni mostrar el destino anterior.
- La interfaz informa que se debe contactar con el administrador.

## Serial inexistente

Si el QR esta roto, mal escrito o no corresponde a un display registrado:

- El backend responde `404 Not Found`.
- La interfaz muestra `Display no encontrado`.
