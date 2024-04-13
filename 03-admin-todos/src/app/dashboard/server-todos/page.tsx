export const dynamic = 'force-dynamic' //Fuerza que la pagina sea dinamica al momento de hacer peticiones | solo aplica para paginas, layout o route handle
export const revalidate = 0

import prisma from '@/app/lib/prisma';  //cliente prisma
import { NewTodo } from '@/components/NewTodo';
import { TodosGrid } from '@/todos/components/TodosGrid';



//snippet mr
export const metadata = {
 title: 'Listado de Todo',
 description: 'SEO Title',
};


// snippet prc
export default async function ServerTodosPage() {

  const todos = await prisma.todo.findMany({orderBy: { description: 'asc' }});

  console.log('construido')

  return (
    <>
        <span className='text-3xl mb-10'>Server Actions</span>
        <div className='w-full px-3 mx-5 mb-5'>
            <NewTodo/>
        </div>
        <TodosGrid todos={todos}/>
      
    </>
  );
}