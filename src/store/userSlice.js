import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    email: null,
    userToken: null,
    user_id:null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userToken = action.payload.token;
            state.user_id = action.payload.user_id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.email = null;
            state.username = null;
            state.userToken = null;
            state.user_id = null;
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
