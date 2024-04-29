import { insertarUsuario, obtenerTodosUsuario, obtenerUsuario } from "@/server/action/action";


export default async function Home() {

  try{


    //agregar usuario
     /*
        let agregarUsuario = await insertarUsuario({usuario: 'JOSE', pass: '124'})
        console.log(agregarUsuario) 
      */

     //obtener usuario
     
     let user = await obtenerUsuario('CARLOS.ZUNIGA')
     console.log(user)
     console.log(user.usuario)

    let alluser = await obtenerTodosUsuario()
    console.log(alluser)

  }catch(e){
    console.log(e)
  }
}
