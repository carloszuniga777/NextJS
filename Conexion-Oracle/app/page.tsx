import { RenderizarDatos } from "@/components/renderizarDatos";
import { obtenerData } from "@/server/action/action";

export default async function Home() {

  const data = await obtenerData()

  //console.log(data)
 
  return (
          <RenderizarDatos dataDB={data}/>
  );
}
