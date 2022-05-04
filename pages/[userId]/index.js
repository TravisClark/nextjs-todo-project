import Head from "next/head";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoData } from "../../store/todo-actions";
import TodoIntroduction from "../../components/Todo/TodoIntroduction/TodoIntroduction";
import TodoList from "../../components/Todo/TodoList/TodoList";
import Notification from "../../components/UI/Notification/Notification";
import { useRouter } from "next/router";

function HomePage() {
  const dispatch = useDispatch();
  const { isReady } = useRouter();
  const [hideNotification, setHideNotification] = useState(false); // This state is used to hide notification after a certain time
  const notification = useSelector((state) => state.ui.notification); // Get notification object from configureStore
  const { userId } = useSelector((state) =>
    state.auth.accountData ? state.auth.accountData : ""
  );
  // Automatically hide notification after 1.5s
  useEffect(() => {
    if(isReady){
      // fetchDataHandler()
      dispatch(fetchTodoData(userId))
      setTimeout(() => {
        setHideNotification(true);
      }, 1500);
    }
  }, [ isReady, userId, dispatch]);

  //* Display loading message when system is fetching data
  let displayResult = (
    <h3 style={{ textAlign: "center", marginTop: "4rem" }}>Loading...</h3>
  );
  //* When fetching data got error, display that error message
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

// export async function getServerSideProps(context) {
//   const id = context.params.userId;
//   const request = await fetch(`https://learned-maker-258114-default-rtdb.firebaseio.com/${id}.json`);
//   const data = await request.json();
//   return{
//     props: {
//       todoList: data
//     }
//   }
// }
