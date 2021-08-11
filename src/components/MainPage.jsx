import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'

const MainPage = () => {

    const [firebaseUser, setFirebaseUser] = useState(false)
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
        //console.log(user)
        if(user){
            setFirebaseUser(user)
        }
        else{
            setFirebaseUser(null)
        }
        })
    },[])
  
    return  firebaseUser ? (
        <div className="container-fluid  justify-content-center">
            <h1 className="display-1 text-center">
                ¡Hola!
            </h1>
            <h2 className="display-6 text-center">
                {
                    firebaseUser ? "Para ver ir a tu lista de tareas, da click en el boton de abajo" : "Para ver tu lista de tareas debes iniciar sesion"
                }
            </h2>
            
            <Link className="d-flex justify-content-center" to="/tareas">
                <button className="btn-lg btn-primary text-center">
                    ¡Lista de tareas!
                </button>
            </Link>
        </div>
    )
    : 
    (
        <div className="container-fluid justify-content-center mt-5">
            <h1 className="display-1 text-center mt-5">
                ¡Hola!
            </h1>
            <h2 className="display-6 text-center mt-5">
                {
                    firebaseUser ? "Para ver ir a tu lista de tareas, da click en el boton de abajo" : "Para ver tu lista de tareas debes iniciar sesion"
                }
            </h2>
            <div className="d-flex justify-content-center mt-5">
            <Link to="/login">
            <button className="btn-lg btn-outline-success mx-5">
                    ¡Iniciar Sesión!
                </button>
            </Link>
            <Link to="/register">
                <button className="btn-lg btn-primary mx-5">
                    ¡Registrate!
                </button>
            </Link>
            </div>
        </div>
    )
}

export default MainPage
