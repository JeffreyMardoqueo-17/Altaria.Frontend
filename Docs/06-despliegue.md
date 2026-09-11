# Despliegue y configuracion

## Frontend

Configurar la URL interna de la API para el servidor de Next:

```env
API_INTERNAL_URL=http://altaria-api:8080
```

En desarrollo local puede ser:

```env
API_INTERNAL_URL=http://localhost:8080
```

El frontend usa el proxy `/api/*` de Next para mantener la cookie en el mismo origen del portal.

## Backend

Configurar en el entorno del backend:

```env
AUTH_JWT_SECRET=un_secreto_aleatorio_de_al_menos_32_bytes
AUTH_JWT_ISSUER=altaria-api
AUTH_JWT_AUDIENCE=altaria-admin-portal
FRONTEND_ORIGIN=https://tu-dominio.com
```

Tambien son necesarias las variables de PostgreSQL, la identidad administrativa y las URLs publicas definidas en `Altaria.API/.env.example`.

## Arranque

Desde `Altaria.API`:

```powershell
docker compose up -d --build
```

El backend espera a PostgreSQL, aplica las migraciones pendientes y arranca la API.

## Produccion

- Usar HTTPS en frontend y API.
- Usar un `AUTH_JWT_SECRET` nuevo y aleatorio.
- No subir `.env` al repositorio.
- Mantener `.env` fuera del contexto Docker.
- Configurar `FRONTEND_ORIGIN` con el origen exacto, sin comodines.
- Respaldar el volumen de PostgreSQL.
