
import { createTable, insertRow, deleteRow, updateRow } from '@/server/action/action';


export default function Home() {

  //createTable()

  //insertRow('prueba')

  //deleteRow(5)


  updateRow({id: 7, title: 'prueba2'})

  return (
    <p>Hola</p>
  );
}
