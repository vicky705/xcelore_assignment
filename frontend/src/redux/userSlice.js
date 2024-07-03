import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false, 
    isAdmin : false,
  },
  reducers: {
    setIsLoginAndAdmin : (state, action) => {
      state.isLogin = action.payload.isLogin
      state.isAdmin = action.payload.isAdmin
    },
    
  },
});

export const { setIsLoginAndAdmin } = userSlice.actions;

export default userSlice.reducer;
