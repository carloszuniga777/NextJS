//snippet rag

import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/app/lib/prisma';
import { object } from 'yup';
import * as yup from 'yup';
import { Todo } from '@prisma/client';

interface Segments{
    params: {
        id: string
    }
}


const getTodo= async(id: string):Promise<Todo | null> =>{

    const todo = await prisma.todo.findFirst({ where: {id} })   //Filtra la tabla todo Where = id
    return todo
}



/* Retornar una unica entrada:

   Se realiza peticion para obtener la informacion correspondiente a un id en especifico
   en este ejemplo se uso el id: 877cce40-bc3e-4c71-8efa-d5678c303ccf
   (buscar un id en la tabla todo de la base de datos)


   Se realiza la peticion con ese id: localhost:3000/api/todos/877cce40-bc3e-4c71-8efa-d5678c303ccf
    El programa busca en la tabla Todo de la base de datos, si el id existe y si existe,
    devuelve la informacion correspondiente a ese registro

*/

/*  PRUEBAS POSMAN>
    Hacer peticion GET > localhost:3000/api/todos/1d2f409b-3103-4c2c-838c-a9e343e5b7a6

    Donde, el id de la url de peticion 1d2f409b-3103-4c2c-838c-a9e343e5b7a6, es el id del registro en base de datos 

*/

export async function GET(request: Request, {params}: Segments) { 
     const { id } = params 
     const todo = await getTodo(id)

    // console.log(todo)

     if( !todo){
        return NextResponse.json({mesagge: `Todo con id ${id} no existe`}, {status: 404})
     }

    return NextResponse.json(todo)
}





/* ESQUEMA DE VALIDACION: yup: https://www.npmjs.com/package/yup
 * 
 *  Esquema de validacion, cualquier propiedad que no este definida
 *  aqui va a dar un error
 * 
 * Sirve para evitar que el usuario configure mal el json a enviar
 * 
 */
const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional()
})




//Actulizar algun registro en especifico
/*
    PRUEBAS POSMAN:
     Hacer peticion de tipo PUT localhost:3000/api/todos/1d2f409b-3103-4c2c-838c-a9e343e5b7a6
     Seleccionar > Body
     Seleccionar > Raw
     Escribir:
     {
        "complete": true,
        "description": "Desde el Endpoint"
    }
     
    Donde, el id de la url de peticion 1d2f409b-3103-4c2c-838c-a9e343e5b7a6, es el id del registro en base de datos 
*/
export async function PUT(request: Request, {params}: Segments) { 

    const { id } = params  
    const todo = await getTodo(id)

   // console.log(todo)

    if( !todo){
       return NextResponse.json({mesagge: `Todo con id ${id} no existe`}, {status: 404})
    }


    try {

        const {complete, description} = await putSchema.validate( await request.json())

       // console.log(complete, description) obtiene el body --escrita en postman

        const updateTodo= await prisma.todo.update({
            where: { id },                                         //ID del registro a actualizar         
            data: {complete, description}                          //Campo a actualizar 
        })
   

        return NextResponse.json(updateTodo)

    } catch (error) {
        return NextResponse.json(error, {status: 400} )
    }
   
}