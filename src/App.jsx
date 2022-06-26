import { useState } from 'react'

import { Home } from './Home'
import { Login } from './Login'
import { Signup } from './Signup'




function userInfo() {
    const userObjectInfo = localStorage.getItem('user');
    const userInfo = JSON.parse(userObjectInfo);
    var valide = true

    if (userObjectInfo === null) {
        return valide = false
    }

 

    return{
        infoUser: userInfo.userInfo,
        token: userInfo.userInfo.token
    }

}


export function App() {
    const [user, setUser] = useState()
    
    if(userInfo()){

        if (userInfo().token || user) {
            return <Home loggedInUser={userInfo().token} />
        }
    }
    


    return window.location.pathname === '/'
    ? <Login signInUser={setUser}/>
    : <Signup signInUser={setUser}/>
    



}
