//Configuracion redux: Add Slice Reducers to the Store (https://redux-toolkit.js.org/tutorials/quick-start)


/*
    Configuracion del estado global del redux de Counter, 
    se configuran las acciones y el estado inicial
*/

//sniper rxslice
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CounterState{
    count: number;
    isReady: boolean
}

const initialState: CounterState = {
    count: 5,                          //Estado inicial del contador      
    isReady: false
}

const counterSlice = createSlice({
  name: 'counter',  //Nombre
  initialState,
  reducers: {       //Acciones a realizar
    
    //Esta funcion sirve para cuando inicia el countado, pueda configurar el count con el valor que recibe de Value en el contador, como valor inicial
    initCounterState(state, action: PayloadAction<number>){
      if(state.isReady) return            //Si isRedy ya esta inicializado, no se ejecuta el resto de codigo

      state.count = action.payload
      state.isReady = true
    },

    //Suma el contador +1  
    addOne(state){
       state.count ++
    },

    //Resta el contador -1
    substractOne(state){
      if(state.count === 0) return

      state.count --
    },


    //Si la accion es menor a 0, configura el contador en 0
    resetCount(state, action: PayloadAction<number>){
      if(action.payload < 0) action.payload = 0        //Si la accion es menor a 0, configura el estado del contador = 0 
      
      state.count = action.payload
    }


  }      
});

//Exportando las acciones de los reducers
export const {addOne, substractOne, resetCount, initCounterState} = counterSlice.actions

export default counterSlice.reducer