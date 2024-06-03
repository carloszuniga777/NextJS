//snippet rag
import prisma from '@/app/lib/prisma'

import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

//elimina todos los registros de la tabla
await prisma.todo.deleteMany()  // delete * from todo
await prisma.user.deleteMany() 


const user = await prisma.user.create({
  data: {
    email: 'test1@google.com',
    password: bcrypt.hashSync('123'),
    roles: ['admin', 'client', 'super-user'],
    todos: {
      create: [
        { description: 'Hola mundo', complete: true},
        { description: 'Primer hola mundo'},
        { description: 'Segundo hola mundo'}, 
        { description: 'Tercer hola mundo'}, 
        { description: 'Cuarto hola mundo'}, 
      ]
    }
  }
})








//inserta un registro en la tabla cada que se haga una peticion localhost:3000/api/seed
/*const todo = await prisma.todo.create({
  data:  {description: 'Hola mundo', complete: true}
})

 console.log(todo)
*/

//inserta multiples registro en la tabla cada que se haga una peticion localhost:3000/api/seed
 /*await prisma.todo.createMany({
  data: [{ description: 'Hola mundo', complete: true},
         { description: 'Primer hola mundo'},
         { description: 'Segundo hola mundo'}, 
         { description: 'Tercer hola mundo'}, 
         { description: 'Cuarto hola mundo'}, 
  ]
 })*/
 
 

 
  return NextResponse.json({
    messege: 'Seed Exected'
  })
}