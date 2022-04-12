import React from "react";
import classes from "./Input.module.css";
// eslint-disable-next-line react/display-name
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`${classes.input} ${props.className}`}>
      <label>{props.label}</label>
      <input {...props} ref={ref} />
    </div>
  );
});

export default Input;
