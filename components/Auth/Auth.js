import Card from '../UI/Card/Card'
import classes from './Auth.module.css'
import Input from '../UI/Input/Input'
import { useRef, useState } from 'react'
const Auth = () => {
    const usernameRef = useRef();
    const displayUsername = () =>{
        console.log(usernameRef.current.value)
    }
    
    return <Card className={classes.authentication}>
        <Input label="Username: " ref={usernameRef} onChange={displayUsername}/>
        <Input label="Password: "/>
        <button>Submit</button>
    </Card>
}

export default Auth;