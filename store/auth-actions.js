import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";

const api_Key = "AIzaSyAdZluvY7zb0io4N5jGu29jhFAZOMrnDCs";
const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_Key}`;
const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_Key}`;

export const authRequest = (authData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        authData.req === "login" ? signInUrl : signUpUrl,
        {
          method: "POST",
          body: JSON.stringify({
            email: authData.email,
            password: authData.password,
            returnSecureToken: false,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        dispatch(uiActions.wrongPwWarningNotification(true));
        throw new Error("Username already exists");
      }
    };
    try {
      await sendRequest();
      await dispatch(authActions.loginHandler(authData))
      console.log("Authentication successful");
    } catch (error) {
      alert(error)
    }
  };
};
