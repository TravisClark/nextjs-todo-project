import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../UI/Card/Card";
import TodoItem from "../TodoItem/TodoItem";
import classes from "./TodoList.module.css";

const TodoList = (props) => {
  const {todoList} = useSelector(state => state.todo)
  const todoItems = todoList.map((todoItem) => (
    <TodoItem
      key={todoItem.id}
      title={todoItem.name}
      description={todoItem.description}
      id={todoItem.id}
      day={todoItem.selectedDay}
      time={todoItem.atTime}
    />
  ));
  return (
    <div className={classes.todoList}>
      <ul>{todoItems}</ul>
    </div>
  );
};

export default TodoList;
