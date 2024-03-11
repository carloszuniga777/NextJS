import { redirect } from "next/navigation";

export default function HomePage() {

  //Redirecciona a la pagina del main para que se visualice como la primer pagina
   redirect('/dashboard/main')

}
