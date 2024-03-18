//sniper: lcr

import { Sidebar } from "../../components";


/*En este layout indicas que vas a reenderizar en toda la aplicacion el menu (Sidebar) 
  y el children que viene siendo toda aplicacion
*/ 
export default function DashboardLayout({children}: {children: React.ReactNode;}) {


  return (

    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
       
        <div className="flex">
            <Sidebar/>
            <div className="w-full text-slate-900">
                 {children}
            </div>
        
        </div>
    </div>
  );
}
