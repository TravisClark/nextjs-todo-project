import Card from "../UI/Card/Card";
import classes from "./Auth.module.css";
import Input from "../UI/Input/Input";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../../store/auth-actions";
import { useRouter } from "next/router";
const Auth = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const { wrongPwWarning } = useSelector((state) => state.ui);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [pwChecked, setPwChecked] = useState(true);
  const { userId } = useSelector((state) =>
    state.auth.accountData ? state.auth.accountData : ""
  );
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPwRef = useRef();
  const changeForm = () => {
    setIsLogin((prevState) => !prevState);
    setPwChecked(true);
  };

  const wrongPwMessage = <p>Password and confirm password must be match.</p>;
  const registerPwChecked = () => {
    passwordRef.current.value !== confirmPwRef.current.value
      ? setPwChecked(false)
      : setPwChecked(true);
  };

  let submitBtn;
  //* Check if the password and confirmPassword match. If true, submitBtn will be ready, if not, submitBtn will be disabled.
  !pwChecked && !isLogin
    ? (submitBtn = <button disabled>Submit</button>)
    : (submitBtn = <button className={classes.readyBtn}>Submit</button>);

  const submitAuthHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const index = email.indexOf("@");
    const userId = email.substring(0, index);
    const authData = {
      email,
      password: passwordRef.current.value,
      userId,
      req: isLogin ? "login" : "register",
    };
    dispatch(authRequest(authData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      route.replace(`/${userId}`);
    }
  }, [route, isLoggedIn, userId]);

  return (
    <Card className={classes["auth-card"]}>
      <form className={classes["auth-form"]} onSubmit={submitAuthHandler}>
        <label className={classes.authTitle}>
          {isLogin ? "Login" : "Register"}
        </label>
        <Input label="Email: " ref={emailRef} type="email" required />
        <Input
          label="Password: "
          ref={passwordRef}
          type="password"
          required
          onChange={!isLogin ? registerPwChecked : undefined}
        />
        {!isLogin && (
          <Input
            label="Confirm password: "
            ref={confirmPwRef}
            type="password"
            onChange={registerPwChecked}
          />
        )}
        {!pwChecked || wrongPwWarning ? wrongPwMessage : ""}
        {submitBtn}
        <p onClick={changeForm}>
          {isLogin ? "Create a new account!" : "Login with existing account!"}
        </p>
      </form>
    </Card>
  );
};

export default Auth;
