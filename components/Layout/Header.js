/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import classes from "./Header.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice"
import { useRouter } from "next/router";
import { todoActions } from "../../store/todo-slice";
const Header = (props) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const logoutHandler = ()=>{
    dispatch(authActions.logoutHandler())
    dispatch(todoActions.clearTodoList())
    route.push('/')
  }
  let authLayout = props.isLoggedIn ? (
    <ul>
      <li>
        <Link href="/">Todo list</Link>
      </li>
      <li>
        <Link href="/add-todo-form">Add Todo item</Link>
      </li>
      <li>
        <button onClick={logoutHandler}>Logout</button>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <Link href="/authentication">Login</Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>First Project</h1>
        {authLayout}
      </header>
      <div className={classes["main-image"]}>
        <img
          src="https://images.pexels.com/photos/7794050/pexels-photo-7794050.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="todo list"
        />
      </div>
    </Fragment>
  );
};

export default Header;
