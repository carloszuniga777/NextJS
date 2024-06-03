'use server'

import prisma from '@/app/lib/prisma';
import { getUserServerSession } from '@/auth/actions/auth-actions';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

//Sleep: espera la cantidad de segundos indicada antes de continuar con la funcion
export const sleep = async(seconds: number = 0)=>{
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve(true)    
        },seconds * 100)
    })
}



//Actualizar Todo
export const toggleTodo = async (id: string, complete: boolean) : Promise<Todo> =>{
    const todo = await prisma.todo.findFirst({ where: {id}})

    await sleep(3)                                          //Delay de 3 segundo para useOptimistic (Archivo TodoItem) 


    if(!todo) throw `Todo con id ${id} no encontrado`

    const updatedTodo = await prisma.todo.update({ 
        where: {id},
        data: {complete}
    })

    revalidatePath('/dashboard/server-todos')            //Sirve para cambiar el componente en especifico que cambio en la url indicada | refresh

    return updatedTodo

}


//Crear nuevo Todo
export const addTodo = async(description: string)=>{

    try{
         
         const user = await getUserServerSession()          //obtiene el usuario mediante la session

        const todo = await prisma.todo.create({ data: { description, userId: user!.id } });   //Inserta un registro en la base de datos
      

         revalidatePath('/dashboard/server-todos')                       //Refrescar     |    Solo se puede llamar del server action, y no desde front end     

         return todo
  
    }catch(error){
      return {
                message: 'Error creando todo'
             }
    } 
  
}



//borrar todo
export const deleteCompleted = async(): Promise<void> =>{

    try{
        const user = await getUserServerSession()          //obtiene el usuario mediante la session

        await prisma.todo.deleteMany({ where:{ complete: true, userId: user!.id}})
          
        revalidatePath('/dashboard/server-todos') 

    }catch(error){
        console.log({message: 'Error eliminando todo'})
    }
}