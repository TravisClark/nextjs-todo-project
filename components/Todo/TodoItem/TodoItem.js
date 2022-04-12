import Card from "../../UI/Card/Card";
import classes from "./TodoItem.module.css";
import { useRouter } from "next/router";
import React from "react";

const TodoItem = (props) => {
  const route = useRouter();
  const showDetailHandler = () => {
    route.push(`/${props.id}`);
  };
  return (
    <Card className={classes.todoItem}>
      <li className={classes.control} onClick={showDetailHandler}>
        <div>
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
