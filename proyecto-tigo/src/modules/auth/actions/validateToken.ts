'use server'

import { connection } from "./db";

interface Resultado{
    usuario: string,
    expira: string,
    otp: string,
  }



export default async function validarToken(usuario:string, token:string):Promise<Resultado[]>{
    let response;

    try{

        response = await connection()

        const query = `SELECT 
                           usuario,
                           TO_CHAR(FECHA_EXPIRA, 'YYYYMMDD:HH24MISS') EXPIRA,
                           OTP
                       FROM boc.tbl_boc_vigencia_otp_by_user
                       where usuario = UPPER('${usuario}')
                              AND OTP = ${token}
                       `;

        const data = await response?.execute(query)

        //    console.log("Result is:", data?.rows);


        return data?.rows as Resultado[]
    }catch(error){
        console.log("AN ERROR: "+error);
    }finally{
        await response?.close()    //Cerrando conexion de la base de datos 
    }

    return [];
}

