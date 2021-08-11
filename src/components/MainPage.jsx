import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import Footer from './Footer'

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
        <div className="container-fluid  mt-5 mb-5 justify-content-center">
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
            <Footer></Footer>
        </div>
    )
    : 
    (
        <div className="container-fluid justify-content-center  mt-5 mb-5">
            <div className="container h-50% border-color-primary"></div>
            <h1 className="display-1 text-center ">
                ¡Hola!
            </h1>
            <h2 className="display-6 text-center mt-5">
                {
                    firebaseUser ? "Para ver ir a tu lista de tareas, da click en el boton de abajo" : "Para ver tu lista de tareas debes iniciar sesion"
                }
            </h2>
            <div className="d-flex justify-content-center mt-5">
            <Link to="/login">
            <button className="btn-lg btn-outline-success mr-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open mx-2" viewBox="0 0 16 16">
  <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
  <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
</svg>
                    ¡Iniciar Sesión!
                </button>
            </Link>
            <Link to="/register">
                <button className="btn-lg btn-primary mx-5">
                    ¡Registrate!
                </button>
            </Link>
            </div>
            <Footer/>
        </div>
    )
}

export default MainPage
