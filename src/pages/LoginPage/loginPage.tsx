import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '../../stores/store';
import {LoginDTO } from "../../models/user/userInterface";
import { useNavigate } from 'react-router-dom';

const LoginPage = () =>{
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {userStore} = useStore();
    const navigate = useNavigate()



    async function onLogin(this: any) {
        let user: LoginDTO = {username, password};
        await userStore.login(user)

        if(userStore.loginResponse?.isValid){
            setLoggedIn(true)
            navigate('/home')
        }
    }

    return(
        <> { !loggedIn ?
            <div>
            Username:
            <input onChange={event => setUsername(event.target.value)} type="text" placeholder='Username'/>
            Password:
            <input onChange={event => setPassword(event.target.value)} type="text" placeholder='Password'/>
            Nickname:
            <button onClick={onLogin} type="submit">Submit</button>
            </div>
            :
            <div>
                Logged User = {userStore.user !== undefined ? userStore.user.username : ''}
            </div>
        }



        </>
    )
}

export default observer(LoginPage)