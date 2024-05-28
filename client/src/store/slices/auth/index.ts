import { getUser } from '@/lib/helpers'
import { createSlice } from '@reduxjs/toolkit'

const user = getUser()
console.log(user,'user2')
const initialState = {
    user: user ? user : {},
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
    }
})

export const { addUser } = authSlice.actions
export default authSlice.reducer