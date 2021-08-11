import React, { useEffect, useState } from "react";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";
import Tareas from "./components/Tareas";
import { auth } from "./firebase";

function App() {

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
  
  return firebaseUser !== undefined ? (
   
     <Router>     
       <Navbar/>

       <Switch>
         <Route path="/tareas">
            <Tareas firebaseUser={firebaseUser}></Tareas>
         </Route>
       </Switch>

       <Switch>
         <Route path="/register">
            <RegisterForm/>
         </Route>
       </Switch>
        
        <Switch>
          <Route path="/login" exact>
            <LogInForm/>
          </Route>
        </Switch>

       <Switch>
          <Route path="/" exact>
            <MainPage/>
          </Route>
        </Switch>
     

     </Router>
  ):(
    <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">cargando...</span>
  </div>
</div>

  )
}

export default App;
