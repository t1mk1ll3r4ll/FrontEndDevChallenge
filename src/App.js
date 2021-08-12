import React, { useEffect, useState } from "react";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import {Switch, Route, HashRouter} from 'react-router-dom'
import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";
import Tareas from "./components/Tareas";
import { auth } from "./firebase";
import FooterTareas from "./components/FooterTareas";

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)
  useEffect(()=>{
    auth.onAuthStateChanged(user => {
      if(user){
        setFirebaseUser(user)
      }
      else{
        setFirebaseUser(null)
      }
    })
  },[])
  
  return firebaseUser !== undefined ? (
   
     <HashRouter>     
       <Navbar/>
       <Switch>
         <Route exact path="/tareas">
            <Tareas firebaseUser={firebaseUser}></Tareas>
            <FooterTareas firebaseUser={firebaseUser}/>
         </Route>
       </Switch>

       <Switch>
         <Route  exact path="/register">
            <RegisterForm/>
         </Route>
       </Switch>
        
        <Switch>
          <Route exact path="/login" >
            <LogInForm/>
          </Route>
        </Switch>

       <Switch>
          <Route exact path="/" >
            <MainPage/>
          </Route>
        </Switch>
     

     </HashRouter>
  ):(
    <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">cargando...</span>
  </div>
</div>

  )
}

export default App;
