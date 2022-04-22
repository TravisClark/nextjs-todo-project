import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import TodoIntroduction from "../Todo/TodoIntroduction/TodoIntroduction";
import Header from "./Header";

function Layout(props){
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
    useEffect(()=>{
        dispatch(authActions.autoLoginHandler());
    })
    return <Fragment>
        <Header isLoggedIn={isLoggedIn}/>
        { props.children}
    </Fragment>
}
export default Layout;