import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { IUser } from './../../interface'

interface IUserState {
  user: IUser | null
}

const initialState: IUserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    logOut: (state) => {
      state.user = null
    },
  },
})

export const { setUser, logOut } = userSlice.actions

export const userReducer = userSlice.reducer
export const userReducerName = userSlice.name
