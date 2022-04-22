import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { fetchTodoData, sendTodoData } from "../../store/todo-actions";

let localStoreItem; //* store data from localStorage when client is reloaded
// ? Next.js pre-renders every page on the server which means generates HTML for each page in advance itself so that page can be fully interacted
// ? The HTML rendered on the browser doesn't match the one generated on the server
// ? Using dynamic with ssr prevents the component from being included on the server, and dynamically loads it on the client side only
const DynamicTodoModifyForm = dynamic(
  () => import("../../components/Todo/TodoModifyForm/TodoModifyForm.js"),
  { ssr: false }
);

function TodoDetails() {
  const { isReady } = useRouter();
  const route = useRouter();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth.accountData);
  const { todoList } = useSelector((state) => state.todo); // get todoList data from configureStore
  const todoData = useSelector(
    (state) => state.todo.todoList.find((item) => item.id == route.query.todoId) //*Find the item which is selected
  );
  const [submitState, setSubmitState] = useState(false); //* submitState is used to dispatch and move to next page if its true

  useEffect(() => {
    if (submitState) {
      setTimeout(async () => {
        const sendData = { todoList, userId };
        await dispatch(sendTodoData(sendData)); // *Send todoData after getting most update data
        await route.replace("/");
      }, 100);
      //  * Async await helps us to make sure that route.replace will execute properly after dispatching
    }
    !todoData && isReady && !submitState && dispatch(fetchTodoData(userId)); //*When reloading page, all data will be lost in store, so we need to fetch it again
  }, [todoData, dispatch, userId, isReady, submitState, todoList, route]);

  todoData && localStorage.setItem("tempItem", JSON.stringify(todoData)); //* First time visited, store data in localStorage immediately
  // * fetch data from localStorage when client side re-render(reload)
  if (typeof window !== "undefined" && !todoData) {
    //* when page is re-rendering, we fetch data from localStorage beforehand
    localStoreItem = JSON.parse(localStorage.getItem("tempItem"));
    route.query.todoId = localStoreItem.id; //* Add id from localStorage to route.query.todoId in advance
  }

  const submitStateUpdate = () => setSubmitState(true);

  return (
    <DynamicTodoModifyForm
      todoData={todoData ? todoData : localStoreItem}
      submitStateUpdate={submitStateUpdate}
    />
  );
}

export default TodoDetails;
