import classes from "./Notification.module.css";

const Notification = (props) => {
  
  let processState = "";
  if (props.status === "success") {
    processState = classes.success;
  }
  if (props.status === "error") {
    processState = classes.failed;
  }
  if(props.status === "loading"){
    processState = classes.loading;
  }
  const cssClasses = `${classes.notification} ${processState}`;
  
 
  return (
    <div className={cssClasses}>
      <h1>{props.message}</h1>
    </div>
  );
};

export default Notification;
