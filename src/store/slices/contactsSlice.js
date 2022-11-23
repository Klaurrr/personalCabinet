import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    contacts: [],
    status: null
}

export const getContacts = createAsyncThunk(
    'contacts/getContacts',
    async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            return await response.data
        } catch (error) {
            return console.error('error on getContacts function')
        }
    }
)


const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: {
        [getContacts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getContacts.fulfilled]: (state, { payload }) => {
            state.contacts = payload
            state.status = 'success'
        },
        [getContacts.rejected]: (state, action) => {
            state.status = 'failed'
        }
    }
})

export default contactsSlice.reducer