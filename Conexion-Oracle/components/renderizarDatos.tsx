
interface Equipos{
  CODIGO_EQUIPO: string,
  DESCRIPCION_EQUIPO: string
}


interface Props{
  dataDB?: Equipos[]
}


export function RenderizarDatos({dataDB=[]}: (Props)){

  return ( <>
  
                {
                    dataDB.map(equipo =>(
                      <p key={equipo.CODIGO_EQUIPO}>Codigo equipo: {equipo.CODIGO_EQUIPO}     descripcion: {equipo.DESCRIPCION_EQUIPO}</p>
                    ))
                  
                }
          </>
       
     )
}
