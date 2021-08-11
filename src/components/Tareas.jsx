import React, { useEffect, useState } from 'react'
import {auth} from '../firebase'
import { withRouter } from 'react-router'
import ListaTareas from './ListaTareas'


const Tareas = (props) => {
   

    const [user, setUser] = useState("null")

    

    useEffect ( ()=>{
         auth.onAuthStateChanged(user =>{
            if(user){
                setUser(auth.currentUser)
            }
            else {
                props.history.push("/")
            }
        })
    },[props.history])
    

    

    return (
        <div className="container text-center">
            {/* <AddTask usuario={user}></AddTask> */}
            <div className="container">
                <ListaTareas usuario={user}/>
            </div>
        </div>

        
    )
}

export default withRouter (Tareas)
