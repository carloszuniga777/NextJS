'use client';

import { addTodo, deleteCompleted } from "@/todos/actions/todo-actions";     //Manipulando la base de datos con SERVER ACTION
//import * as todosApi from "@/todos/helpers/todos";                        //Manera antigua de manipular la base de datos con REST API
//import { useRouter } from "next/navigation";                    
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";


export const NewTodo = () => { 

    //const router = useRouter();
    const [description, setDescription] = useState('')  //Valida que el usuario haya escrito algo en el input y evita que se haga submit si el input esta vacio



    const onSubmit = async(e: FormEvent) => {
        e.preventDefault()

        if( description.trim().length === 0 ) return    //Si no ha introducido el usuario algo, es decir, el input esta vacio no ejecuta nada    

        //console.log('form sumitted', description)
        
        // todosApi.createTodo(description)           //Creando el todo con REST API (Manera antigua)

        await addTodo(description)                     //Creando el todo con Server Action (nueva forma)
        setDescription('')                            //Limpia el input
       //  router.refresh()                           //Con Sever Action ya no se usa router.refresh
    } 


    /*//Borrando el todo con REST API (Manera antigua)
    const deleteCompleted = async()=>{
        await todosApi.deleteCompletedTodos()
        router.refresh()
    }
    */


  return (
    <form  onSubmit={onSubmit} className='flex w-full'>
      <input type="text"
        onChange={ (e)=> setDescription(e.target.value)}
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>

      <button type='button' onClick={()=>deleteCompleted()} className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        <span className="ml-2">Borrar completados</span>
      </button>


    </form>
  )
}