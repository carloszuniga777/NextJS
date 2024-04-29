'use server'
 import { connection } from "../database"
 
 
export async function obtenerUsuario(usuario:string) {

  try{
      const query = { text: 'select usuario, pass from tbl_boc_logins where usuario =$1',
                      values: [usuario]
      }
  
      const response = await connection.query({query})
      
      return response
 
   }catch(e){
     return {error: 'Error al obtener el usuario'}
  }  

}




export async function obtenerTodosUsuario(usuario:string) {

    try{
        const query = { text: 'select usuario, pass from tbl_boc_logins'}
    
        const response = await connection.query({query})
        
        return response
   
     }catch(e){
       return {error: 'Error al obtener el usuario'}
    }  
  
  }


  interface Props{
    usuario: string,
    pass: string
  }
  
export async function insertarUsuario({usuario, pass}:Props) {


    try{
        const query = { text: `insert into tbl_boc_logins(usuario, pass)
                               values($1, $2)`,         
                        values:[usuario, pass]        
                      }
   
                      console.log('aqui')   

        const response = await connection.query({query})
       
        console.log('alla')  
        
        console.log(response.rows[0])

        
       
        return response
   
     }catch(e){
       return {error: 'Error al obtener el usuario'}
    }  
  
  }

