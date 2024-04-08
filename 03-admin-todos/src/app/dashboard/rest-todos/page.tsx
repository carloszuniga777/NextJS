import prisma from '@/app/lib/prisma';  //cliente prisma
import { TodosGrid } from '@/todos';



//snippet mr
export const metadata = {
 title: 'Listado de Todo',
 description: 'SEO Title',
};


// snippet prc
export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({orderBy: { description: 'asc' }})
 
  return (
    <div>
      {
        <TodosGrid/>
      }
    </div>
  );
}