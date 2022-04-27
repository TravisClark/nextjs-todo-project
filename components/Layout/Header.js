/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import classes from "./Header.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useRouter } from "next/router";
import { todoActions } from "../../store/todo-slice";

const Header = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [logoutState, setLogoutState] = useState(false);
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  const { userId } = useSelector((state) =>
    state.auth.accountData ? state.auth.accountData : ""
  );
  // * Function that change logoutState and transfer to homepage if its true
  const logoutHandler = () => {
    dispatch(authActions.logoutHandler());
    dispatch(todoActions.clearTodoList());
    setLogoutState(true);
  };

  useEffect(() => {
    if (logoutState) {
      setLogoutState(false); // * Change logout state back to false to get rid of infinite loop
      return () => route.replace("/");
    }
  }, [route, logoutState]);
  
  let authLayout = isLoggedIn ? (
    <ul>
      <li>
        <Link href={`/${userId}`}>Todo list</Link>
      </li>
      <li>
        <Link href={`/${userId}/add-todo-form`}>Add Todo item</Link>
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
