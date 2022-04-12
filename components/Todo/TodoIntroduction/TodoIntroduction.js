import Card from "../../UI/Card/Card";
import classes from "./TodoIntroduction.module.css";

const TodoIntroduction = () => {
  return (
    <Card className={classes.todoIntro}>
      <h3 className={classes.title}>Todo list introduction</h3>
      <p className={classes.content}>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu lleoibero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend
        .
      </p>
    </Card>
  );
};
export default TodoIntroduction;
