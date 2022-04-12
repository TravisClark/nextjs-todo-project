import BasicSelect from "../../UI/BasicSelect/BasicSelect";
import Card from "../../UI/Card/Card";

import classes from "../TodoAddForm/TodoAddForm.module.css"; // Form is basically the same as add form
import cssClasses from "./TodoModifyForm.module.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { sendTodoData } from "../../../store/todo-actions";
import { todoActions } from "../../../store/todo-slice";
import React, { useEffect } from "react";

const TodoModifyForm = ({ todoData }) => {
  const defaultValues = {
    ...todoData,
  };
  const dispatch = useDispatch();
  const route = useRouter();
  const { todoList } = useSelector((state) => state.todo); // get todoList data from configureStore
  const { handleSubmit, control } = useForm({ defaultValues });
  /*
   *function that will save all data in the form */
  const onSubmit = (dataInput) => {
    dispatch(todoActions.updateTodoList(dataInput));
    route.query.todoId = "";
    // *Redirect to Home page after sending data
  };

  // ? This function removes todo item from todoList
  const removeTodoHandler = () => {
    dispatch(todoActions.removeTodoItem(todoData.id));
    route.query.todoId = "";
  };

  // ? Watch todoList if we run any function
  useEffect(() => {
    // * When submitting, route.query.id will be a sign that its time to sendTodoData and push away
    if (!route.query.todoId) {
      setTimeout(async () => {
        await dispatch(sendTodoData(todoList)); // *Send todoData after getting most update data
        console.log(todoList);
        await route.push("/");
      }, 100);
    }
    /*
     * Async await helps us to make sure that route.push will execute properly after dispatching
     * When clicking item, route.query.todoId will be updated to todoId which triggers route.push automatically run
     * Change route.query.todoId to '' after dispatching so that route.push only run after dispatching process is finished
     */
  }, [todoList, route, dispatch]);

  return (
    <Card className={classes["todo-addform"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${classes.control} ${classes.todoName}`}>
          <label>Todo Name:</label>
          <Controller
            render={({ field }) => <input {...field} required />}
            name="name" // name has to be the same as defaultValues properties
            control={control}
          />
          {/*Controller will wrap React element and provide name, value, onChange, onBlur to them*/}
        </div>
        <div className={`${classes.control} ${classes.timeContainer}`}>
          <div className={classes.selectDay}>
            <label>Time:</label>
            <BasicSelect
              control={control}
              className={classes.basicSelect}
              labelName="Time"
            />
          </div>
          <div className={classes.selectTime}>
            <label>At:</label>
            <Controller
              render={({ field }) => <input {...field} required />}
              name="atTime"
              control={control}
            />
          </div>
        </div>
        <div className={`${classes.control} ${classes.todoDescription}`}>
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <textarea {...field} required />}
          />
        </div>
        <div className={cssClasses["button-control"]}>
          <button>Submit</button>
          <a className={cssClasses.deleteBtn} onClick={removeTodoHandler}>
            Delete
          </a>
        </div>
      </form>
    </Card>
  );
};
export default TodoModifyForm;
