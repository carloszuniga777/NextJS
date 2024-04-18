import { TabBar } from '../../../components/TabBar';
import { cookies } from 'next/headers'              //Server Side

//snnipet rm
export const metadata = {
 title: 'Cookies Page',
 description: 'SEO Title',
};

//snnipet prc
export default function CookiesPage() {

/** ------------------ Manejo de Cookies --------------*/  
 
const cookieStore = cookies()
  
  /* El operador ?? operador de fusión de nulos (doble interrogación) en javascript es util para manejar valores nulos o indefinidos
        El operador ?? se utiliza para evaluar dos operandos a ?? b
            Si a no es nulo ni indefinido, se devuelve a
            Si a es nulo o indefinido, se devuelve b 
  */ 
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1' //Obteniendo el valor de la cookie "selectedTab". Si la cookie no tiene un valor, es decir, es undefined toma por defecto '1'


/*------------------------------------------------------*/ 


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
            <span className="text-3xl">Tabs</span>
             <TabBar currentTab={ +cookieTab}/>     {/* + Convierte a numero, tambien se puede usar Number() */}
        </div>
       
    </div>
  );
}