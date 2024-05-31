import { WidgetItem } from '@/components';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

// snippet prc
export default async function DashbordPage() {

  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/api/auth/signin')
  }

  return (
    <div className="grid gap-6 grid-cols-1">
        <WidgetItem title='usuario conectado server side'>
          {
            <div className='flex flex-col'>
              <span>{session.user?.name}</span>
              <span>{session.user?.image}</span>
              <span>{session.user?.email}</span>

              <div>
                { JSON.stringify(session) }
              </div>
            </div>
          }
        </WidgetItem> 
     </div> 
  );
}