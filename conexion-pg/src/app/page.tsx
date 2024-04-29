import { insertarUsuario } from "@/server/action/action";


export default async function Home() {

  try{

    let agregarUsuario = await insertarUsuario({usuario: 'CARLOS.ZUNIGA', pass: '123'})
  }catch(e){
    console.log(e)
  }
}
