/**Paginacion simple: 
 *  https://www.prisma.io/docs/orm/prisma-client/queries/pagination
 *  https://nextjs.org/docs/app/building-your-application/routing/route-handlers
 * 
 */

//snippet rag
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/app/lib/prisma';
import * as yup from 'yup';

export async function GET(request: Request) { 

    //Obtiene la url de la peticion y toma el valor de take (url: localhost:3000/api/todos?take=2)
    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')     
    const skip = Number(searchParams.get('skip') ?? '0')    
    
    //Si no es un numero devuelve un error 404 
    if(isNaN(take)){
        return NextResponse.json({mesagge: 'Take tiene que ser un numero'}, {status: 400})
    }

    if(isNaN(skip)){
        return NextResponse.json({mesagge: 'Skip tiene que ser un numero'}, {status: 400})
    }
    


  /*
    Devuelve todos los registros de la tabla todo de la base de datos al hacer la peticion htpp: localhost:3000/api/todos
    Filta la consulta para que devuelva los registros seleccionados, en este ejemplo take = 2, por tanto, solo trae 2 registros
  */
   const todos = await prisma.todo.findMany({
     take: take, 
     skip: skip 
    })

  return NextResponse.json(todos)
}

/* ESQUEMA DE VALIDACION: yup: https://www.npmjs.com/package/yup
 * 
 *  Esquema de validacion, cualquier propiedad que no este definida
 *  aqui va a dar un error
 * 
 * Sirve para evitar que el usuario configure mal el json a enviar
 * 
 */
const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)
})


//Crear un nuevo registro
/*
    PRUEBAS POSMAN:
     Hacer peticion de tipo POST localhost:3000/api/todos/
     Seleccionar > Body
     Seleccionar > Raw
     Escribir:
     {
        // "id": "d06b606f-897e-4cba-9106-bea7f4e17c149", 
        "description": "Sexto hola mundo",
        "complete": true,
        //"otrapropiedad":123
      }
  
*/

export async function POST(request: Request) { 

  //body = await await request.json()

  try{

      const { description, complete } = await postSchema.validate(await request.json()) //Se realiza la peticion POST localhost:3000/api/todos/ y se obtiene el body
    
       const todo = await prisma.todo.create({data: { description, complete } })   //Inserta un registro en la base de datos
    
      return NextResponse.json(todo)

  }catch(error){
    return NextResponse.json(error, { status: 400} )
  } 

}



