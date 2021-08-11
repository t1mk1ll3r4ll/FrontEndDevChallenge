import React, { useEffect, useState } from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'
import { auth } from '../firebase'


const Navbar = (props) => {
  const [firebaseUser, setFirebaseUser] = useState(false)

  const cerrarSesion = () =>{
    auth.signOut()
    props.history.push("/")
  }

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
    
    return (
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mx-auto">
        <div className="container-fluid">
          <Link to="/">
          <span className="navbar-brand">To do List</span>
          </Link>

          <div className="d-flex justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {
                firebaseUser && (
<li className="nav-item">
              <NavLink to="/tareas">
              <button className=" btn btn-primary nav-link active mx-5" aria-current="page" >Lista de tareas</button> </NavLink>             </li>
                )
              }
              
              
              {
                  firebaseUser ? (
                  <li className="nav-item">
                    <button className=" btn btn-primary nav-link " onClick={()=>{cerrarSesion()}} aria-current="page" >Cerrar sesion</button>            
                  </li> ) :(
                    <li className="nav-item">
                    <NavLink to="/login">
                     <button className=" btn btn-primary nav-link  mx-5" aria-current="page" >
                       Inicia sesion</button>
                     </NavLink>
                   </li>
                  )
              }
              {
              firebaseUser ? (<></>):(<NavLink to="/register">
              <button className=" btn btn-primary nav-link  mx-5" aria-current="page" >Crea tu cuenta</button>

              </NavLink>)

              }
              
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default withRouter (Navbar)
