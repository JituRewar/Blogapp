import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    coins: Number(localStorage.getItem("user_coins")) || 0,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        addCoins: (state, action) => {
            state.coins += action.payload;
            localStorage.setItem("user_coins", state.coins); 
        },
     }
})

export const {login, logout,addCoins} = authSlice.actions;

export default authSlice.reducer;