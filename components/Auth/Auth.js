import Card from "../UI/Card/Card";
import classes from "./Auth.module.css";
import Input from "../UI/Input/Input";
import { useRef, useState } from "react";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPwRef = useRef();
  const changeForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <Card className={classes["auth-card"]}>
      <form className={classes["auth-form"]}>
        <label className={classes.authTitle}>
          {isLogin ? "Login" : "Register"}
        </label>
        <Input label="Email: " ref={usernameRef} type="email" />
        <Input label="Password: " ref={passwordRef} type="password" />
        {!isLogin && (
          <Input
            label="Confirm password: "
            ref={confirmPwRef}
            type="password"
          />
        )}
        <button>Submit</button>
        <p onClick={changeForm}>
          {isLogin ? "Create a new account!" : "Login with existing account!"}
        </p>
      </form>
    </Card>
  );
};

export default Auth;
