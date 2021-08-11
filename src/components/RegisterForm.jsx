import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const RegisterForm = (props) => {
    const[email, setEmail] = useState("")
    const[pass, setPass] = useState("")
    const[error,setError] = useState(null)

    
    const validar = () =>{
        if(!email.trim()){
            setError("el correo no debe estar vacio")
            return
        }
        if(!pass.trim()){
            setError("debe ingresar una contraseña")
            return
        }
        if(pass.length<6){
            setError("la contraseña debe ser mayor a 6 caracteres")
            return
        }

        registrar()
    }
    const registrar = async () =>{
        try {
            const res = await auth.createUserWithEmailAndPassword(email,pass)  
            await db.collection("usuarios").doc(res.user.email).set({
                email:res.user.email,
                uid:res.user.uid
            })      
            props.history.push("/")

        } catch (error) {
            if(error.code=== 'auth/invalid-email'){
                setError("Email no valido")
            }
            if(error.code=== 'auth/email-already-in-use'){
                setError("El correo esta en uso, intenta iniciar sesion")
            }
        }
    }
    return (
        <div className= "mt-5 d-flex justify-content-center" >
            
            <div className="mb-3">
                {
                error && (<div className=" mt-5 alert alert-danger"> {error} </div>)
                }
                    <h6 className="display-6 text-center"> Correo Electronico</h6>
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
                       <button onClick={()=>{validar()}} className="btn mt-3  btn-outline-success"> ¡Crear cuenta!</button>
                    </div>

                    <Link className="d-grid text-decoration-none" to="login">
                        <button className="btn mt-3 btn-outline-dark" >¿ya tienes cuenta?</button>
                    </Link>
                
            </div>
        </div>
    )
}

export default withRouter (RegisterForm)
