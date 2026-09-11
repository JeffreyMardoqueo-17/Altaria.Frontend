# Portal administrativo de Altaria

## Acceso local

- Portal: http://localhost:3000
- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger/index.html

Las variables sensibles se configuran en `Altaria.API/.env`; no deben escribirse en este README.
El frontend usa el proxy `/api` y la cookie de sesion HttpOnly. Consulta [Docs/06-despliegue.md](Docs/06-despliegue.md).

## Flujo operativo

1. Iniciar sesión en el portal.
2. Abrir `Fabricar stock`.
3. Introducir el rango, por ejemplo `001` a `050`.
4. Descargar el ZIP con los PNG individuales.
5. Imprimir los QR. Cada uno apunta a `/r/{serial}`.
6. Escanear el QR de un display disponible.
7. Introducir nombre del local y URL de Google Reviews; el QR identifica automaticamente el display.
8. En `Locales`, asignar displays adicionales a un local ya existente si es necesario.
9. Revisar el inventario desde `Resumen`.

Un display disponible lleva al flujo de activación. Uno activo redirige a Google Reviews. Los displays desactivados quedan bloqueados.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
