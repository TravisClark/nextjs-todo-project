import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchTodoData } from "../../store/todo-actions";

let localStoreItem; //* store data from localStorage when client is reloaded
// ? Next.js pre-renders every page on the server which means generates HTML for each page in advance itself so that page can be fully interacted
// ? The HTML rendered on the browser doesn't match the one generated on the server
// ? Using dynamic with ssr prevents the component from being included on the server, and dynamically loads it on the client side only
const DynamicTodoModifyForm = dynamic(
  () => import("../../components/Todo/TodoModifyForm/TodoModifyForm.js"),
  { ssr: false }
);

function TodoDetails() {
  const route = useRouter();
  const dispatch = useDispatch();
  const todoId = route.query.todoId;
  const todoData = useSelector((state) =>
    state.todo.todoList.find((item) => item.id == todoId) //*Find the item which is selected
  );

  useEffect(() => {
    todoData && localStorage.setItem("tempItem", JSON.stringify(todoData)); //* First time visited, store data in localStorage immediately
    !todoData && dispatch(fetchTodoData()); //*When reloading page, all data will be lost in store, so we need to fetch it again
  }, [todoData,dispatch]);

  // * fetch data from localStorage when client side re-render(reload)  
  if (typeof window !== "undefined" && !todoData) { //* when page is re-rendering, we fetch data from localStorage beforehand
    localStoreItem = JSON.parse(localStorage.getItem("tempItem"));
    route.query.todoId = localStoreItem.id; //* Add id from localStorage to route.query.todoId in advance
  }

  return (
    <DynamicTodoModifyForm todoData={todoData ? todoData : localStoreItem} />
  );
}

export default TodoDetails;
