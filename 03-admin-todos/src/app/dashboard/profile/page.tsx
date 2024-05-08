'use client'

import { useSession } from "next-auth/react";


//snippet prc
export default function ProfilePage() {

    const {data: session } = useSession()

  return (
    <div>
        <h1>Page Profile</h1>
        <hr/>

        <div className="flex flex-col">
           <span>{session?.user?.name ?? 'No Name'}</span>   
           <span>{session?.user?.email ?? 'No Email'}</span>  
           <span>{session?.user?.image ?? 'No image'}</span>
        </div>
    </div>
  );
}