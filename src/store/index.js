import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactsSlice";
import userReducer from "./slices/userSlice";


export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        user: userReducer
    }
})