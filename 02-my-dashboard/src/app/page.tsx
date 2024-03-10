import { redirect } from "next/navigation";

export default function HomePage() {

  //Redirecciona a la pagina del counter para que se visualice como la primer pagina
   redirect('/dashboard/counter')

}
