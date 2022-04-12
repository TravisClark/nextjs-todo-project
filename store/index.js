import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todo-slice';
import uiReducer from './ui-slice';
import authReducer from './auth-slice'

const store = configureStore({
    reducer:{todo: todoReducer, ui:uiReducer, auth: authReducer}
})

export default store;