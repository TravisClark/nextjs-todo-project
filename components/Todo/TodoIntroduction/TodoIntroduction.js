import { useSelector } from "react-redux";
import Card from "../../UI/Card/Card";
import classes from "./TodoIntroduction.module.css";

const TodoIntroduction = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let content = !isLoggedIn ? (
    <p className={classes.content}>
      Hi! Welcome to todo page. This is my first project and as its name, you
      can create your own todo list with your existing account. Oh and if you
      dont have one yet, just click the login button on the right corner to
      register a new one. In case you already have one, just dive in and start
      playing around!
    </p>
  ) : (
    <p className={classes.content}>
      Welcome to todo page again! Im really grateful to have you visiting my
      project! Just have a look around and let me know if something goes wrong
      or you have any suggestions. Looking forward to having your feedback!
    </p>
  );
  return (
    <Card className={classes.todoIntro}>
      <h3 className={classes.title}>Todo list introduction</h3>
      {content}
    </Card>
  );
};
export default TodoIntroduction;
