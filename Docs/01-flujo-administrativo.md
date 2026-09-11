# Flujo administrativo

## 1. Iniciar sesion

1. El administrador abre el portal administrativo.
2. Introduce su correo y contrasena.
3. El backend valida las credenciales.
4. El backend crea un JWT y lo guarda en una cookie `HttpOnly`.
5. El navegador nunca recibe el JWT en el JSON, nunca lo guarda en `localStorage` y nunca lo envia como header manual.

Si ya existe una cookie valida, el servidor renderiza directamente el dashboard. No debe aparecer primero la pantalla de login.

## 2. Fabricar stock

1. Entrar en `Fabricar stock`.
2. Indicar la cantidad de displays.
3. Indicar el identificador del lote.
4. Generar y descargar el ZIP.
5. El ZIP contiene un PNG por display.
6. Cada PNG apunta a `/r/{serialCode}`.

La secuencia de seriales se calcula en el backend. El administrador no asigna manualmente los seriales.

## 3. Activar un display mediante su QR

El panel administrativo no pide un ID para crear un local. Esa accion se realiza mediante el QR:

1. Se imprime un QR de un display disponible.
2. El cliente escanea el QR.
3. La pantalla publica permite buscar un local existente o registrar uno nuevo.
4. El backend vincula automaticamente el display cuyo serial estaba en el QR.

El administrador no escribe el ID del display durante esta activacion.

## 4. Reutilizar un local

Cuando ya existe un local, el administrador puede seleccionar ese local en `Locales` y asignarle otros displays disponibles introduciendo los IDs internos de esos displays separados por comas.

Esta asignacion es una operacion administrativa posterior. No forma parte de la primera activacion publica.

## 5. Consultar inventario

`Resumen` muestra:

- Displays disponibles.
- Displays activos.
- Displays desactivados.
- Locales registrados.
- Ultimos displays y su ruta publica.

La vista `Displays` muestra todo el inventario paginado. La paginacion evita cargar o mostrar solo una cantidad fija de registros.

La vista `Locales` muestra los locales paginados. Al seleccionar uno se abre su detalle con todos sus displays, su ruta fija y su estado.

La vista `Lotes` agrupa los displays por identificador de lote y muestra cantidades disponibles, activas y desactivadas con paginación.

Desde el detalle de un local el administrador puede:

- Editar nombre y URL de Google Reviews.
- Activar todos los displays vinculados.
- Desactivar todos los displays vinculados de una sola vez.
- Revisar los displays vinculados con paginacion.
- Asignar opcionalmente un lote completo al local, sin seleccionar los displays uno por uno.

## Asignar un lote completo

En el detalle de un local aparece la accion `Asignar un lote`. El administrador selecciona un lote y confirma. El backend vincula todos los displays disponibles de ese lote al local y los marca como activos.

La accion es administrativa y opcional. Si un display del lote esta desactivado o pertenece a otro local, la operacion se rechaza para evitar asignaciones parciales.

Todas las consultas administrativas requieren una sesion valida.

## 6. Cerrar sesion

El boton `Cerrar sesion` llama al backend, que elimina la cookie de sesion. El estado del frontend vuelve al login sin recargar la pagina.
