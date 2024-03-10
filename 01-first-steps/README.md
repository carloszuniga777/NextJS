This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

-----------------------------------------

Pasos para crear una imagen Docker y ejecutar:

1. Crear el archivo dockerfile

2. Contruir la imagen docker en cmd, ejecutarlo en el directorio del proyecto:

>>cd  D:\....\01-first-steps
>>docker build -t nextjs-first-steps .

  docker build -t (nombre de la imagen)  (punto: indica donde se encuentra en el archivo dockerfile en el proyecto, en este caso el archivo se encuentra en root del proyecto)


3. ejecutar la imagen para visualizar la app en el navegador:

>> docker container run -p 3000:3000 nextjs-first-steps

docker container run -p (puerto maquina):(puerto del contenedor configurado en dockerfile) (archivo)



4. Para ejecutar sin necesidad que la terminal este abierta

>>docker container run -dp 3000:3000 nextjs-first-steps


5. Cancelar ejecucion de la imagen en docker

Ir a la aplicacion de Docker >> Containers 
    Eliminar los containers que esten asociados a la imagen nextjs-first-steps



