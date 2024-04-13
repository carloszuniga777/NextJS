'use client';

//snippet rafc
import {Todo} from '@prisma/client'
import { TodoItem } from './TodoItem';

//import * as todosApi from '@/todos/helpers/todos'  //Exporta los fetch de actualizar, agregar, etc   | Manera antigua de hacer conexion a la base de datos haciendo REST API
import { useRouter } from 'next/navigation';
import { toggleTodo } from '../actions/todo-actions';  //Conexion a la base de datos usando server actions

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = []}: Props) => {

  const router = useRouter()


 /* //Usando REST-API / Manera de hacer conexion a la base de datos sin usar server action (Nueva actualizacion)
  const toggleTodo = async(id: string, complete: boolean) => {
    //console.log(id, complete)
    const updatedTodo = await todosApi.updateTodo(id, complete)
    
    console.log({updatedTodo})
    router.refresh()                                                        //Refresca el componente una vez actualizado
  }
*/




 // console.log(todos)

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
    {
       todos.map( todo => (
         <TodoItem key={todo.id} todo={ todo } toggleTodo={toggleTodo}/>
       ))
    }
    </div>
  )
}
