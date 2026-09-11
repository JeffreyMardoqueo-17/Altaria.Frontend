# Rutas de la aplicacion

## Frontend

| Ruta | Acceso | Funcion |
| --- | --- | --- |
| `/` | Publica | Landing de Altaria |
| `/administracion` | Administradores | Login o dashboard segun la cookie de sesion |
| `/activacion?serialCode=...` | Publica | Buscar un local o registrar uno nuevo desde el QR |
| `/display?serialCode=...` | Publica | Mostrar el estado y destino del display |

## Backend publico

| Metodo | Ruta | Funcion |
| --- | --- | --- |
| `GET` | `/r/{serialCode}` | Resolver el QR y redirigir a la pantalla publica |
| `GET` | `/api/displays/{serialCode}` | Obtener el estado publico del display |
| `GET` | `/api/displays/summary` | Obtener los totales reales de todos los estados |
| `GET` | `/api/public/businesses` | Obtener locales seleccionables durante la activacion |
| `POST` | `/api/public/displays/{serialCode}/activate` | Crear y vincular el primer local |

## Backend de autenticacion

| Metodo | Ruta | Funcion |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Validar credenciales y emitir cookie HttpOnly |
| `GET` | `/api/auth/me` | Comprobar la sesion actual |
| `POST` | `/api/auth/logout` | Eliminar la cookie de sesion |

## Backend administrativo

Todas estas rutas requieren cookie JWT valida con rol `Admin`:

- `/api/displays`
- `/api/displays?page=1&pageSize=20`
- `/api/displays/batches?page=1&pageSize=12`
- `/api/businesses`
- `/api/businesses?page=1&pageSize=12`
- `/api/businesses/{id}/displays?page=1&pageSize=20`
- `PUT /api/businesses/{id}`
- `PATCH /api/businesses/{id}/displays/status`
- `/api/users`
- `/api/admin/displays/generate`
- `/api/admin/displays/businesses/{businessId}/assign`
- `/api/admin/displays/businesses/{businessId}/assign-batch/{batchNumber}`
- `/api/admin/displays/normalize-sequence`

El frontend llama a estas rutas con `credentials: include`. No adjunta tokens manualmente.

Las respuestas paginadas tienen esta forma:

```json
{
	"items": [],
	"page": 1,
	"pageSize": 20,
	"totalItems": 100,
	"totalPages": 5
}
```
