/* 
    -------- Creacion de Seed ---------------
    
    1. Instalar Ts-Node para ejecutar TypeScript directamente en Node
        npm i -D ts-node

    2. Agregar en el package.json en el script:
        "seed": "ts-node src/seed/seed-database.ts"   

    3. Crear el archivo tsconfig.json:
           3.1 ir al directorio seed: cd .\src\seed\
           3.2 ejecutar: npx tsc --init

    -------Ejecucion del Seed----------------
    
    Para ejecutar el archivo seed desde Node:
    
    4. Ejecutar: npm run seed    
    

    -----------------------------------
    
*/

import { initialData } from "./seed";
import prisma from '../lib/prisma'

async function main(){

    //console.log(initialData)

    //Para ejecutar todo a la misma vez se ocupa Promise.all
    await Promise.all([

         //Borrando la inforamcion de las tablas
         prisma.productImage.deleteMany(),
         prisma.product.deleteMany(),
         prisma.category.deleteMany(),
    ])

    console.log('Seed ejecutado correctamente')
}


(()=>{

    if(process.env.NODE_ENV === 'production') return                //Si estamos en produccion no pueda ejecutarse

    main()
})();