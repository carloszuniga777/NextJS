import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/app/lib/prisma';

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