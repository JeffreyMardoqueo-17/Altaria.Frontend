# Flujo del QR

## URL impresa

Cada QR contiene una URL con esta forma:

```text
https://altariaa.com/r/003
```

El numero es un ejemplo. Cada display tiene su propio `serialCode`.

## Primera lectura

1. El visitante escanea el QR.
2. El backend recibe `/r/{serialCode}`.
3. Busca el display por su serial.
4. Si esta disponible, redirige a la pantalla publica `/display?serialCode={serialCode}`.
5. La pantalla indica que aun no esta activado y ofrece `Configurar display`.
6. El enlace lleva a `/activacion?serialCode={serialCode}`.

El serial viaja en la URL y no se solicita al usuario en un campo de formulario.

## Configuracion desde el QR

En `/activacion` se puede elegir una de estas opciones:

- Buscar y seleccionar un local existente.
- Registrar un local nuevo con nombre y URL de Google Reviews.

Al confirmar, el frontend envia esos datos junto con el `serialCode` que obtuvo del QR. El backend:

1. Verifica que el display existe.
2. Rechaza displays desactivados.
3. Rechaza displays que ya tienen local.
4. Usa el local seleccionado o crea uno nuevo.
5. Vincula el display.
6. Cambia su estado a `Active`.

## Lecturas posteriores

Al escanear el mismo QR despues de la activacion:

1. `/r/{serialCode}` localiza el display activo.
2. Redirige a `/display?serialCode={serialCode}`.
3. La pantalla muestra el nombre del local.
4. El boton lleva a la URL de Google Reviews guardada.

El QR no se regenera despues de activar el display. La URL `/r/{serialCode}` sigue siendo exactamente la misma; solo cambia la pantalla que aparece.

## Display desactivado

Si el administrador desactiva el display, el backend responde `410 Gone` desde `/r/{serialCode}` y no permite continuar al flujo publico.
