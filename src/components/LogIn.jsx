import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
const LogIn = (props) => {

    console.log(props.firebaseUser)
    return props.firebaseUser !==undefined ?  
     (
        <Link className="d-flex justify-content-center" to="/tareas">
        <button className="btn-lg btn-primary text-center">
            ¡Lista de tareas!
        </button>
    </Link>
    )
    : 
    (
        <div className="d-flex justify-content-center">
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
    )
}

export default withRouter(LogIn)
