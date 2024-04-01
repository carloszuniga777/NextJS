/*Creacion de una conexion al cliente prisma: https://vercel.com/guides/nextjs-prisma-postgres */

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;



/* Soluciona el tipado de global para la configuración del cliente de prisma:
   
1. crea el archivo src/types/types.d.ts y dentro de este pega lo siguiente:

    import { PrismaClient } from '@prisma/client';
    
    declare global {
    var prisma: PrismaClient | undefined;
    }
    
2. finalmente referencia el archivo con los tipos correspondientes en tu tsconfig.json (lo encuentras en el root dir del proyecto de next)

    "files": ["src/types/types.d.ts"],

    esa linea debes ponerla a la altura de las props exclude e include, por ejemplo:

    {
    "compilerOptions": {...},
    "include": [...],
    "exclude": [...],
    "files": ["src/types/types.d.ts"],
    }

    con esto ya no deberías tener la necesidad de declarar any para las global ya que se considera una mala practica y en cualquier code review te van a devolver tus cambios.

*/
