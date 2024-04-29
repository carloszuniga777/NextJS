'use server'

 import { pool } from "../database"
 //import dbConnect from "../database"

 
export async function obtenerUsuario(usuario:string) {

  try{
    
      //dbConnect()  

      const query = { text: 'select usuario, pass from tbl_boc_logins where usuario =$1',
                      values: [usuario]
      }
  
      const response = await pool.query(query)
      
      return response.rows[0]
 
   }catch(e){
     return {error: 'Error al obtener el usuario'}
  }  

}




export async function obtenerTodosUsuario() {

    try{
       //  dbConnect()  
        
         const query = { text: 'select usuario, pass from tbl_boc_logins'}
    
         const response = await pool.query(query)
        
        return response.rows
   
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

      //  dbConnect()  
      
        const query = { text: `insert into tbl_boc_logins(usuario, pass) values($1, $2) RETURNING *`,         
                        values:[usuario, pass]        
                      }
                      
                      console.log('query', query)   


        const response = await pool.query(query)
       
        return response.rows[0]
   
     }catch(e){
       return {error: `Error al obtener el usuario`}
    }  
  
  }

