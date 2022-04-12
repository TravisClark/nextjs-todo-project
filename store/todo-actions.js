import { todoActions } from "./todo-slice";
import { uiActions } from "./ui-slice";
/*
 * Action Creator - used to fetch or push data to db
 * The Action Creator itself will return a function and that another function will eventually return actions
 */
const dbLink =
  "https://learned-maker-258114-default-rtdb.firebaseio.com/todo.json";

export const sendTodoData = (todoData) => {
  // const { name, description, selectedDay, atTime } = todoData;
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(dbLink, {
        method: "PUT",
        body: JSON.stringify({todoList: todoData}),
      });
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

export const fetchTodoData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(dbLink);
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
      // const loadedData = [];
      // for (const key in data) {
      //   loadedData.push({
      //     id: key,
      //     name: data[key].name,
      //     description: data[key].description,
      //     atTime: data[key].atTime,
      //     selectedDay: data[key].selectedDay,
      //   });
      // }
      return data;
    };
    try {
      const todoData = await sendRequest();
      dispatch(todoActions.getTodoList({
        todoList: todoData.todoList || [],  
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
    }
  };
};
