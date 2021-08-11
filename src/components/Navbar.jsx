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
          <span className="navbar-brand"> To do List
            <img src="https://lh3.googleusercontent.com/jzOBOMKBefLdX0fbOV88puuXWtPH3ImKEc2K_kaEcdRqq4jnkC7Jn0QBWl_Dw-TrfEKzAkTHYqZdKgz-mqJKrv_7eCjcdSXB3LJZ9eH22QvyPDGCOeLjGeP10rrphYDS2GHFByMsFxY=w2400" className="mx-2" width="50" height="50" alt="l"/>
          </span>
          </Link>

          <div className="d-flex justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {
                firebaseUser && (
            <li className="nav-item">
              <NavLink to="/tareas">
              <button className=" btn btn-primary nav-link active mx-2" aria-current="page" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list text-light mb-1 mx-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
                Lista de tareas</button> </NavLink>             </li>
                )
              }
              
              
              {
                  firebaseUser ? (
                  <li className="nav-item">
                    <button className=" btn btn-primary nav-link  " onClick={()=>{cerrarSesion()}} aria-current="page" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eject-fill text-danger mx-2" viewBox="0 0 16 16">
  <path d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H1.656C.78 9.5.326 8.455.926 7.816L7.27 1.047zM.5 11.5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-1z"/>
</svg>
                      Cerrar sesion</button>            
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
