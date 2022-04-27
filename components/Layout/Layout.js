import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import Header from "./Header";

function Layout(props){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(authActions.autoLoginHandler());
    })
    return <Fragment>
        <Header/>
        { props.children}
    </Fragment>
}
export default Layout;