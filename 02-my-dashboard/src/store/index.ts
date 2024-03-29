/**Se exportan en toda la aplicacion los reducer para poder utilzarlos */

/**Configuracion de Redux 
 * https://redux-toolkit.js.org/tutorials/quick-start
*/

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import pokemonsReducer from './pokemons/pokemons'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { localStorageMiddleware } from './middlewares/localstorage-middleware'

import type { Middleware } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware as Middleware),

 /* Otra manera de hacer el middleware: 
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
          thunk: {
          extraArgument: localStorageMiddleware,
        },
        serializableCheck: false,
      }),*/

})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
