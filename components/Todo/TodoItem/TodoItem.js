import Card from "../../UI/Card/Card";
import classes from "./TodoItem.module.css";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const TodoItem = (props) => {
  const route = useRouter();
  const { userId } = useSelector((state) =>
    state.auth.accountData ? state.auth.accountData : ""
  );
  const showDetailHandler = () => {
    route.push(`/${userId}/${props.id}`);
  };
  return (
    <Card className={classes.todoItem}>
      <li className={classes.control} onClick={showDetailHandler}>
        <div className={classes.controlTitle}>
          <h3 className={classes.title}>{props.title}</h3>
          <p className={classes.description}>{props.description}</p>
        </div>
        <div className={classes.controlDate}>
          <h3 className={classes.title}>At: </h3>
          <p>{`${props.day}, ${props.time}`}</p>
          <h3 className={classes.edit} >
            Edit
          </h3>
        </div>
      </li>
    </Card>
  );
};
export default TodoItem;
