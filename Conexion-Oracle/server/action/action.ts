'use server'

import { getErrorMessage } from "@/app/Error/errorMessage";
import { connection } from "../db";

interface Equipos{
    CODIGO_EQUIPO: string,
    DESCRIPCION_EQUIPO: string
  }


export async function obtenerData():Promise<Equipos[]>{
    let response;

    try{

        response = await connection()

        const data = await response?.execute(`SELECT codigo_equipo, 
                                                      DESCRIPCION_EQUIPO 
                                            FROM tbl_hm_tng_tangible_hed
                                            where rownum < 10`)

        //    console.log("Result is:", data?.rows);


        return data?.rows as Equipos[]

    }catch(error){
        reportError({message: getErrorMessage(error)})
    }finally{
        await response?.close()    //Cerrando conexion de la base de datos 
    }

    return [];
}


