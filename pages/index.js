import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoIntroduction from "../components/Todo/TodoIntroduction/TodoIntroduction";
import TodoList from "../components/Todo/TodoList/TodoList";
import Notification from "../components/UI/Notification/Notification";
import { authActions } from "../store/auth-slice";
import { fetchTodoData } from "../store/todo-actions";

export async function getServerSideProps(){
  const res = await fetch()
}

function HomePage() {
  const dispatch = useDispatch();
  const [hideNotification, setHideNotification] = useState(false); // This state is used to hide notification after a certain time
  const notification = useSelector((state) => state.ui.notification); // Get notification object from configureStore
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { userId } = useSelector((state) =>
    state.auth.accountData ? state.auth.accountData : ""
  );

  // Automatically hide notification after 1.5s
  useEffect(() => {
    setTimeout(() => {
      setHideNotification(true);
    }, 1500);
    isLoggedIn && dispatch(fetchTodoData(userId));
  }, [dispatch, isLoggedIn, userId]);

  //* Display loading message when system is fetching data
  let displayResult = (
    <h3 style={{ textAlign: "center", marginTop: "4rem" }}>Loading...</h3>
  );
  //* When fetching data got error, display that error message
  notification.status === "error" && isLoggedIn
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
      {isLoggedIn && displayResult}
    </Fragment>
  );
}

export default HomePage;
