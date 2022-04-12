import BasicSelect from "../../UI/BasicSelect/BasicSelect";
import Card from "../../UI/Card/Card";

import classes from "./TodoAddForm.module.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { sendTodoData } from "../../../store/todo-actions";
import { todoActions } from "../../../store/todo-slice";
import { useEffect } from "react";

const defaultValues = {
  selectedDay: "",
  name: "",
  atTime: "",
  description: "",
};
const TodoAddForm = () => {
  // Place where we save data of the add form
  const dispatch = useDispatch();
  const route = useRouter();
  const {todoList} = useSelector((state) => state.todo);
  const { handleSubmit, control } = useForm({ defaultValues });
  /*
   * control - a function that will integrate external controlled components. Also gives them onChange, onBlur, name, ref
   * and value to the child component( In this case, it provides defaultValues properties from parent to child)
   * handlerSubmit - a function that will automatically collect all data in the form and do sth with them
   */

  /*
   *function that will save all data in the form */
  const onSubmit = (dataInput) => {
    dispatch(todoActions.updateTodoList(dataInput));
    route.pathname = ""; // Param which will stop route.push from running when render this add page
  };

  useEffect(() => {
    // * When submitting, route.pathname will be a sign that its time to sendTodoData and push away
    if (!route.pathname) {
      setTimeout(async () => {
        await dispatch(sendTodoData(todoList));
        await route.push("/");
      }, 100);
    }
  }, [todoList, dispatch, route]);

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
        <button>Submit</button>
      </form>
    </Card>
  );
};
export default TodoAddForm;
