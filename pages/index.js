import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoIntroduction from "../components/Todo/TodoIntroduction/TodoIntroduction";
import TodoList from "../components/Todo/TodoList/TodoList";
import Notification from "../components/UI/Notification/Notification";
import { fetchTodoData } from "../store/todo-actions";

function HomePage() {
  const dispatch = useDispatch();
  // const notification = useSelector((state) => state.ui.notification);
  const [hideNotification, setHideNotification] = useState(false); // This state is used to hide notification after a certain time
  const notification = useSelector((state) => state.ui.notification); // Get notification object from configureStore

  // Automatically hide notification after 1.5s
  useEffect(() => {
    setTimeout(() => {
      setHideNotification(true);
    }, 1500);
  }, []);

  useEffect(() => {
    dispatch(fetchTodoData());
  }, [dispatch]);

  let displayResult = (
    <h3 style={{ textAlign: "center", marginTop: "4rem" }}>Loading...</h3>
  );
  notification.status === "error"
    ? (displayResult = (
        <h3 style={{ textAlign: "center", marginTop: "4rem" }}>
          There is no data
        </h3>
      ))
    : (displayResult = <TodoList />);
  return (
    <Fragment>
      <Head>
        <title>Shawn T project</title>
        <meta name="Todo List" content="Create todo list" />
      </Head>
      {/* if we have an incoming notification and hideNotification is false then Notification will be appeared */}
      {notification && !hideNotification ? (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      ) : (
        ""
      )}
      <TodoIntroduction />
      {displayResult}
    </Fragment>
  );
}

export default HomePage;
