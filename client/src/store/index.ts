import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from './slices/auth'

const reducer = combineReducers({
    authSlice
});

export const store = configureStore({
    reducer,
})
