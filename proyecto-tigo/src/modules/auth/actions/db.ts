import oracledb from 'oracledb'; //Conexion a la base de datos Oracle | primero: npm install oracledb | luego: npm i --save-dev @types/oracledb

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT    //Da formato en Object 

//Configuracion de la conexion con la base de datos oracle
export async function connection() {
  
 let connection;

  try{
         connection = await oracledb.getConnection({
            user          : "BOC_LOAD",
            password      : 'b0C_L0AD18',  // contains the hr schema password
            connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.159.188)(PORT=1526))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=bochn.celtel.net)))"
    
        });
    

        return connection; 

    }catch(err){
        throw new Error('Error en conexion con la base de datos')
    }
    
}