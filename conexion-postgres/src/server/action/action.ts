'use server'

import { sql } from "../db";


interface pruebaPostgres{
    id: number,
    title: string
}

export const createTable = async()=>{

    try{
 
        await sql`
                    CREATE TABLE IF NOT EXISTS tbl_prueba_postgres (
                    id SERIAL PRIMARY KEY,
                    title TEXT NOT NULL
                    )
      `;

      console.log('craeado')

    }catch(e){
        console.log(e)
        return {error: 'Error al crear la tabla'}
        
    }
}




export const insertRow = async(data:string)=>{

    try {

        const value = await sql`insert into tbl_prueba_postgres(title)
        values(${data}) returning *`

        return value
        
    } catch (error) {
        console.log(error)
        return {error: 'Error al insertar'}
    }    
}



export const deleteRow = async(data:number)=>{

    try {

        const value = await sql`delete from tbl_prueba_postgres
        where id = ${data} returning *`

        return value
        
    } catch (error) {
        console.log(error)
        return {error: 'Error al insertar'}
    }    
}


export const updateRow = async({id, title}:pruebaPostgres)=>{
    try{

        const value = await sql`update tbl_prueba_postgres
                                set title = ${title}
                                where id = ${id}`
        
        return value                        
    }catch(e){
        console.log(e)
        return {error: 'Error al actualizar'}
    }
}



const selectData = async(id:number)=>{
    try {
        
        const value = await sql`select id, 
                                       title
                                 from tbl_prueba_postgres
                                 where id = ${id}`

    } catch (error) {
        return {error: 'Error al select'}   
    }
}