import { Fragment } from "react";
import { useSelector } from "react-redux";
import TodoIntroduction from "../Todo/TodoIntroduction/TodoIntroduction";
import Header from "./Header";

function Layout(props){
    const isLogin = useSelector((state)=> state.auth.isLogin)
    return <Fragment>
        <Header isLogin={isLogin}/>
        {isLogin && props.children}
        {!isLogin && <TodoIntroduction />}
    </Fragment>
}
export default Layout;