import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from '../services/service'

import { userReducer, userReducerName } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userReducerName]: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
