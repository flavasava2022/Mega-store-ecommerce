import { createSlice } from "@reduxjs/toolkit";


const USER_INITIAL_STATE = {
  user: null,
};

export const userSlice = createSlice({
  name:'user',
  initialState:USER_INITIAL_STATE,
  reducers:{
setCurrentUser(state,action){
state.user=action.payload
}
  }
})


export const {setCurrentUser} = userSlice.actions

export const userReducer = userSlice.reducer
