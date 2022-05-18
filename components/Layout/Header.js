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
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { userId } = useSelector((state) =>
    state.auth.accountData ? state.auth.accountData : ""
  );
  // * Function that change logoutState and transfer to homepage if its true
  const logoutHandler = () => {
    dispatch(authActions.logoutHandler());
    dispatch(todoActions.clearTodoList());
    setLogoutState(true);
  };

  const openNavHandler = () => {
    setNavbarIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (logoutState) {
      setLogoutState(false); // * Change logout state back to false to get rid of infinite loop
      return () => route.replace("/");
    }
  }, [route, logoutState]);

  // Desktop navbar
  let authLayout = isLoggedIn ? (
    <div
      className={navbarIsOpen ? `${classes.openNav}` : ''}
    >
      <ul>
        <li onClick={openNavHandler}>
          <Link href={`/${userId}`}>Todo list</Link>
        </li>
        <li onClick={openNavHandler}>
          <Link href={`/${userId}/add-todo-form`}>Add item</Link>
        </li>
        <li onClick={openNavHandler}>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </div>
  ) : (
    <div
      className={navbarIsOpen ? `${classes.openNav}` : ''}
    >
      <ul>
        <li onClick={openNavHandler}>
          <Link href="/authentication">Login</Link>
        </li>
      </ul>
    </div>
  );
  let ham = classes.hamburger;
  if (navbarIsOpen) {
    ham = `${classes.open} ${classes.hamburger}`;
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes["menu-container"]}>
          <h1>Mo&apos;s Todo</h1>
          <button className={ham} onClick={openNavHandler}>
            <span className={classes["hamburger-top"]}></span>
            <span className={classes["hamburger-middle"]}></span>
            <span className={classes["hamburger-bottom"]}></span>
          </button>
        </div>

        {authLayout}
        {/* <!-- Hamburger Icon --> */}
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
