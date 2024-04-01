<!-- Conectar Prisma con NextJS:

     1. Se configura el docker-compose.yml y luego se ejecuta en el comando:  
        >> docker compose up -d 
        
        Nota: Todo los comandos son ejecutados en el directorio actual del proyecto
        
        Esto descarga una imagen de Docker de la base de datos en postgres que nos va a servir para poder realizar la conexion desde pgadmin

    2. Configurar la conexion con la base de datos postgrase desde pgadmin
        Se crea una nueva conexion con los mismos parametros establecidos en el archivo docker-compose.yml   
        usuario: postgres
        contrasena: postgres
        puerto: 5432 (En mi caso use el puerto 5433)
        direccion servidor: Localhost

    3. Luego se inicializa prisma, el cual nos va a servir para realizar la conexion con la 
       base de datos
        >> npx prisma init

        Esto crea un archivo .env el cual se tiene que configurar la conexion de la base de datos   


    4. Creacion de la tabla del proyecto, para eso se tiene que ir al archivo prisma/schema.prisma
       en este caso se creo la tabla 

       model Todo{
            id          String    @id @default(uuid())
            description String
            complete    Boolean   @default(false)
            createAt    DateTime  @default(now())
            updateAt    DateTime  @updatedAt
        }

     6. Cada vez que se realice una modificacion en la base de datos, crear tabla, remover campos, agregar campos, etc. 
        se tiene que ejecutar el siguiente comando:       

        >> npx prisma migrate dev       
        >> Enter a name for the new migration: dev    (Poner un nombre, en este ejemplo puse dev)
    
    7. Generar el cliente prisma para poder realizar las manipulaciones con la base de datos, ejecutar:
         
         >>npx prisma generate 

    8. Crear un archivo app/lib/prisma.ts para crear la conexion al cliente prisma, tomando la configuracion sugerida por versel: https://vercel.com/guides/nextjs-prisma-postgres


    9. Debido a que la variable 'global' (de la configuracion de la conexion al cliente prisma) no tiene un tipo definido, ejecutar los pasos descritos en el archivo app/lib/prisma.ts

    10. Se crea el archivo SEED que sirva para insertar informacion de relleno/basura para poder trabajar en un ambiente de desarrollo con el objetivo de probar la aplicacion, de tal forma que si inserto o borro informacion sea facil recuperar la informacion. 
    Este archivo se crea en el directorio api: api/seed/router.ts


-->



# Development
Pasos para leventar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.temp a .env 
3. Reemplazar las variable de entorno
4. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed) 

# Prisma commnads
```
npx prisma init                  
npx prisma migrate dev
npx prisma generate
```

# Produccion


# Stage
