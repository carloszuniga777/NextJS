export const dynamic = 'force-dynamic' //Fuerza que la pagina sea dinamica al momento de hacer peticiones | solo aplica para paginas, layout o route handle
export const revalidate = 0


import prisma from '@/app/lib/prisma';  //cliente prisma
import { getUserServerSession } from '@/auth/actions/auth-actions';
import { NewTodo } from '@/components/NewTodo';
import { TodosGrid } from '@/todos/components/TodosGrid';
import { redirect } from 'next/navigation';



//snippet mr
export const metadata = {
 title: 'Listado de Todo',
 description: 'SEO Title',
};


// snippet prc
export default async function ServerTodosPage() {

  //Se obtiene el usuario atraves de la session
  const user = await getUserServerSession()

  //Si el usuario no existe lo redirige al login
  if( !user) redirect('/api/auth/signin')


    //obtiene los todos por usuarios
    const todos = await prisma.todo.findMany(
    {
      where: {userId: user.id},
      orderBy: { description: 'asc' }
    });

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