'use client'

//snippet rafc
import {startTransition, useOptimistic} from 'react'
import { Todo } from "@prisma/client"
import styles from '@/todos/components/TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { boolean } from 'yup';

interface Props{
    todo: Todo;
    toggleTodo: (id: string, complete: boolean) => Promise<Todo|void>
}



export const TodoItem = ({todo, toggleTodo}: Props) => {
 
  
  /*-----------------------------------------------------------
          USE OPTIMISTIC
  /-----------------------------------------------------------*/
  //Esta funcion permite refrescar la pagina de manera optima cada vez que hay un cambio
  //Funciona parecido al useState
  const [ todoOptimistic, toggleTodoOptimistic] = useOptimistic(
                                                                  todo,                   //Recibe el parametro todo
                                                                  (states, newCompleteValue: boolean) => ({...states, complete: newCompleteValue})
                                                               )

 const onToggleTodo = async()=>{
    try{
        startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete) )      //Se manda el opuesto, si estaba (chequeado) en true se envia el false 
       
        await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
        
    }catch(error){
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete) )  
    }
 }

//-------------------------------------------------------------------------


  return (
    <div  //onClick={()=> toggleTodo(todoOptimistic.id, !todoOptimistic.complete)} 
        onClick={onToggleTodo} 
        className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
        
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div className={` flex p-2 rounded-md cursor-pointer hover:bg-opacity-60  ${ todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'} `}>
              {
                todoOptimistic.complete ? <IoCheckboxOutline size={30}/> : <IoSquareOutline size={30}/>
              }
            </div>
        </div>
        <div className="text-center sm:text-left">
            {todoOptimistic.description}
        </div>
    </div>
  )
}
