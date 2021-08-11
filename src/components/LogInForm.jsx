import React, { useState } from 'react'
import {auth} from '../firebase'
import { withRouter, Link } from 'react-router-dom'

const LogInForm = (props) => {

    const[email, setEmail] = useState("")
    const[pass, setPass] = useState("")
    const[error, setError] = useState(null)

    const iniciarSesion = async () =>{
        if(!email.trim()){
            setError("El correo no debe estar vacio")
            return
        }
        if(!pass.trim()){
            setError("Debe ingresar una contraseña")
            return
        }
        try {
            await auth.signInWithEmailAndPassword(email,pass)        
            props.history.push("/tareas")

        } catch (error) {
            if(error.code === "auth/user-not-found"){
                setError("El usuario no se encuentra registrado")
            }
            if(error.code === "auth/wrong-password"){
                setError("La contraseña ingresada no es valida")
            }
        }


    }
    return (
        <div className= "mt-5 d-flex justify-content-center" >
            <div className="mb-3 ">
                    {
                        error && (<div className="mt-5 alert alert-danger"> {error} </div>)
                    }
                    <span className="display-6 text-center"> Correo Electronico</span>
                    <input 
                    className="form-control" 
                    type="email" 
                    placeholder="correo electronico"
                    onChange={e=>setEmail(e.target.value)}
                    >
                    </input>

                    <h6 className="display-6 text-center"> contraseña</h6>
                    <input 
                    className="form-control"  
                    type="password" 
                    placeholder="contraseña"
                    onChange={e=>setPass(e.target.value)}
                    ></input>
                    <div className="d-grid">
                    <button onClick={()=>{iniciarSesion()}} className="btn mt-3 btn-outline-success"> ¡Iniciar Sesion!</button>
                    </div>
                    <Link className="d-grid text-decoration-none" to="/register">
                        <button className="btn  mt-3 btn-outline-dark" >¿No tienes cuenta?</button>
                    </Link>
            </div>
            
                    
        </div>
    )
}

export default withRouter (LogInForm)
