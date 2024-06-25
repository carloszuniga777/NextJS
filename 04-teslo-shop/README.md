<!--
    1. Instalacion Prisma:  https://www.prisma.io/docs/getting-started/quickstart

       1.1 npm install prisma --save-dev
       1.2. npx prisma init --datasource-provider PostgreSQL

    2. Configuracion Base de datos:
       2.1 Crear archivo .env:
            //DB_USER = tesloshop
            //DB_NAME = postgres
            //DB_PASSWORD = postgres  

            DATABASE_URL="tesloshop://tesloshop:postgres@localhost:5432/postgres?schema=tesloshop"

       2.2. Crear la conexion en base de datos


    3. Crear las tablas en el archivo Schema.prisma y una vez creado, ejecutar:
           npx prisma migrate dev --name ProductCategory

   
             

-->


# Descripción

## Correr en dev

1. Clonar el repositorio
2. Crear una copoa del arrchiv ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno
3. Instalar dependencias ```npm install```
4. Correr el proyecto ```npm run dev```


## Correr en prod

