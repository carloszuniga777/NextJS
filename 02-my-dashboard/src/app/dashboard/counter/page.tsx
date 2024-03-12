import { CarCounter } from "@/app/shopping-cart";


//sniper metadata: mr
export const metadata = {
 title: 'Shopping Cart',
 description: 'Un simple contador',
};



export default function CounterPage() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>
      <CarCounter value={0}/>
    </div>
  );
}