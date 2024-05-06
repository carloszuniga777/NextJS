'use server'

 import { pool } from "../database"


 
export async function obtenerUsuario(usuario:string) {

    const client  = await pool.connect();              //iniciando la conexion

  try{

      const query = { text: 'select usuario, pass from tbl_boc_logins where usuario =$1',
                      values: [usuario]
      }
  
      const response = await client.query(query)
      
      return response.rows[0]
 
   }catch(e){
       return {error: 'Error al obtener el usuario'}
    }finally{
       client.release()                   //liberando la conexion
  }  

}




export async function obtenerTodosUsuario() {

        const client  = await pool.connect();              //iniciando la conexion

    try{
        
         const query = { text: 'select usuario, pass from tbl_boc_logins'}
    
         const response = await client.query(query)
        
        return response.rows
   
     }catch(e){
       return {error: 'Error al obtener el usuario'}
    }finally{
      client.release()                   //liberando la conexion
    }    
  
}




  interface Props{
    usuario: string,
    pass: string
  }
  


export async function insertarUsuario({usuario, pass}:Props) {

    const client = await pool.connect()       //iniciando la conexion

    try{

       await client.query('BEGIN')      //inicio del proceso

        const query = { text: `insert into tbl_boc_logins(usuario, pass) values($1, $2) RETURNING *`,         
                        values:[usuario, pass]        
                      }
                      
                      console.log('query', query)   


        const response = await client.query(query)

        await client.query('COMMIT')                   //commit 
       
        return response.rows[0]
   
     }catch(e){
       await client.query('ROLLBACK')                        //rollback
       return {error: `Error al obtener el usuario`}
    }finally{
      client.release()                                       //libera la conexion una vez finalizado de usar   
    }  
  
  }

