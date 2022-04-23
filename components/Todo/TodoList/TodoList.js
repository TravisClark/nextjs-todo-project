import { useSelector } from "react-redux";
import TodoItem from "../TodoItem/TodoItem";
import classes from "./TodoList.module.css";

const TodoList = () => {
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
