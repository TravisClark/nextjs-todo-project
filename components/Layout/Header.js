import { Fragment } from "react";
import classes from './Header.module.css';
import Link from 'next/link';
const Header = () => {
  return (
    <Fragment>
      <header className={classes.header} >
      <h1>First Project</h1>
      <ul>
        <li><Link href='/'>Todo list</Link></li>
        <li><Link href='/add-todo-form'>Add Todo item</Link></li>
      </ul>
    </header>
    <div className={classes['main-image']}>
      <img src='https://images.pexels.com/photos/7794050/pexels-photo-7794050.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt="todo list"/>
    </div>
    </Fragment>
  );
};

export default Header;
