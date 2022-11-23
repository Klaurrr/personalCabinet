import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    phone: null,
    id: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.id = action.payload.id
        },
        removeUser(state) {
            state.name = null;
            state.phone = null;
            state.id = null;
        }
    }
})


export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;