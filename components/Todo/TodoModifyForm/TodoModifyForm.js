import BasicSelect from "../../UI/BasicSelect/BasicSelect";
import Card from "../../UI/Card/Card";

import classes from "./TodoModifyForm.module.css";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../store/todo-slice";
import React from "react";

const TodoModifyForm = ({ todoData, submitStateUpdate }) => {
  const defaultValues = {
    ...todoData,
  };
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm({ defaultValues });
  /*
   *function that will save all data in the form */
  const onSubmit = (dataInput) => {
    dispatch(todoActions.updateTodoList(dataInput));
    submitStateUpdate();
    // *Redirect to Home page after sending data
  };

  // ? This function removes todo item from todoList
  const removeTodoHandler = () => {
    dispatch(todoActions.removeTodoItem(todoData.id));
    submitStateUpdate();
  };

  return (
    <React.StrictMode>
      <Card className={classes["todo-addform"]}>
        <div className={classes.form}>
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
              <button className={classes.submitBtn}>Submit</button>
          </form>
          <button id={classes.deleteBtn} onClick={removeTodoHandler}>
            Delete
          </button>
        </div>
      </Card>
    </React.StrictMode>
  );
};
export default TodoModifyForm;
