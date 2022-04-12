import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [], // {name, id, description, selectedDay, atTime}
  },
  reducers: {
    getTodoList(state, action) {
      state.todoList = action.payload.todoList;
    },
    updateTodoList(state, action) {
      const newTodoIndex = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      newTodoIndex !== -1
        ? (state.todoList[newTodoIndex] = action.payload)
        : state.todoList.push({ ...action.payload, id: Math.random() * 10 });
    },
    removeTodoItem(state, action) {
      state.todoList = state.todoList.filter(todoItem => todoItem.id !== action.payload)
      console.log(state.todoList)
    },
  },
});
export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
