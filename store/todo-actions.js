import { todoActions } from "./todo-slice";
import { uiActions } from "./ui-slice";
/*
 * Action Creator - used to fetch or push data to db
 * The Action Creator itself will return a function and that another function will eventually return actions
 */
const dbLink =
  "https://learned-maker-258114-default-rtdb.firebaseio.com/";

export const sendTodoData = (todoData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${dbLink}${todoData.userId}.json`, {
        method: "PUT",
        body: JSON.stringify(todoData.todoList),
      });
      console.log(todoData)
      if (!response.ok) {
        dispatch(
          uiActions.updateNotification({
            message: "Error adding data",
            status: "error",
          })
        );
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.updateNotification({
          message: "Adding data successfully!",
          status: "success",
        })
      );
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTodoData = (userId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${dbLink}${userId}.json`);
      dispatch(
        uiActions.updateNotification({
          message: "Loading data...",
          status: "loading",
        })
      );
      if (!response.ok) {
        throw new Error("Fetching data failed!");
      }
      
      const data = await response.json();
      return data;
    };
    try {
      const todoData = await sendRequest();
      console.log(todoData);
      dispatch(todoActions.getTodoList({
        todoList: todoData || [],  
      }));
      // Throw an error if we couldn't fetch any data (empty array)'
      if (todoData.length === 0) {
        throw new Error("todo");
      }

      dispatch(
        uiActions.updateNotification({
          message: "Fetching data successfully!",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.updateNotification({
          message: "Error fetching data",
          status: "error",
        })
      );
      console.log(error);
    }
  };
};


