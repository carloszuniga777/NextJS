import oracledb from  'oracledb'    //Conexion a la base de datos Oracle | primero: npm install oracledb | luego: npm i --save-dev @types/oracledb

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT    //Da formato en Object 

//Configuracion de la conexion con la base de datos oracle
export async function connection() {
  
 let connection;

  try{
         connection = await oracledb.getConnection({
            user          : "ctrochez",
            password      : 'febrero_2024',  // contains the hr schema password
            connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.159.130)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=bocdb.celtel.net)))"
    
        });
    

        return connection; 

    }catch(err){
        throw new Error('Error en conexion con la base de datos')
    }
    
}
