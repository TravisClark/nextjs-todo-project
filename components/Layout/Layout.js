import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Notification from "../UI/Notification/Notification";
import {useSelector} from 'react-redux';

function Layout(props){
    
    return <Fragment>
        <Header/>
        {props.children}
    </Fragment>
}
export default Layout;