import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todo-slice';
import uiReducer from './ui-slice';

const store = configureStore({
    reducer:{todo: todoReducer, ui:uiReducer}
})

export default store;