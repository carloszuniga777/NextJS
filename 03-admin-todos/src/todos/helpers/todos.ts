/** En este archivo se encuentran los fetch que se van a realizar a la base de datos
 *  Los fetch se hacen a los End-point contruidos previamente desde la carpeta API/TODO
*/

import { Todo } from "@prisma/client";



//Fetch para actualizar un registro a la base de datos
export const updateTodo = async(id: string, complete: boolean):Promise<Todo> =>{
    const body = { complete }


    const todo = await fetch(`/api/todos/${ id }`, 
        {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Contet-Type': 'application/json'
            }
        }
    ).then(res => res.json())


    console.log({todo})


    return todo
} 




//Fetch para crear un registro en la base de datos
export const createTodo = async(description: string):Promise<Todo> =>{
    const body = { description }


    const todo = await fetch(`/api/todos`, 
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Contet-Type': 'application/json'
            }
        }
    ).then(res => res.json())


    console.log({todo})


    return todo
} 