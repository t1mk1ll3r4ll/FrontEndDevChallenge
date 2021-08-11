import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import moment from 'moment'
import 'moment/locale/es'

const ListaTareas = (props) => {
    const yesterday = new Date(Date.now() - 86400000);
    yesterday.toISOString()

    const [tareas, setTareas] = useState([])
    const [editar, setEditar] =useState(false)
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [inicio, setInicio] = useState("")
    const [final, setFinal] = useState("")
    const [estado, setEstado] = useState("")
    const [idEditar, setIdEditar] = useState("")
    const [error, setError] = useState("")
    const [anadir, setAnadir] = useState("")
    const [tiene, setTiene]= useState("")
    const [user, setUser] = useState(false)
    
  
   

    const editarTarea = async (item) =>{
        setEditar(true)
        setDescripcion(item.descripcion)
        setNombre(item.nombre)
        setInicio(item.inicio)
        setFinal(item.final)
        setEstado(item.estado)
        setIdEditar(item.id)
    }

    const cancelarAnadir = () =>{
        setEditar(false)
        setAnadir(false)
            setDescripcion("")
            setNombre("")
            setInicio("")
            setFinal("")
            setEstado("")
            setIdEditar("")
            setError("")
    }

    

    const subirTarea = async () =>{
        try {
            if(!nombre.trim()){
                setError("Debe ingresar un nombre")
                return
            }
            if( !descripcion.trim()){
                setError("Debe ingresar una descripcion")
                return
            }
            if(!inicio.trim()){
                setError("Debe ingresar una fecha de inicio")
                return
            }
            if(!final.trim()){
                setError("Debe ingresar una fecha de finalizacion")
                return
            }
            if(!estado.trim()){
                setError("Debe seleccionar un estado de la tarea")
                return
            }
            if(inicio>final){
                setError("La fecha de finalizacion no puede ser antes de la de inicio")
                setFinal("")
                setInicio("")
                return
            }
            if(inicio<moment(yesterday).format()){
                // console.log(inicio)
                // console.log(yesterday)
                setFinal("")
                setInicio("")
                setError("La fecha de inicio no puede ser antes de la fecha actual")
                return
            }
            const data ={
                nombre: nombre,
                descripcion:descripcion,
                inicio:inicio,
                final:final,
                estado:estado
            }
            const res = await db.collection(props.usuario.email).add(data)
            setTareas([...tareas, {...data, id:res.id}])            
            setAnadir(false)
            setDescripcion("")
            setNombre("")
            setInicio("")
            setFinal("")
            setEstado("")
            setIdEditar("")
            setError("")


        } catch (error) {
            console.log(error)
        }
    }


    const actualizar = async()=>{
        try {
            if(!nombre.trim()){
                setError("Debe ingresar un nombre")
                return
            }
            if( !descripcion.trim()){
                setError("Debe ingresar una descripcion")
                return
            }
            if(!inicio.trim()){
                setError("Debe ingresar una fecha de inicio")
                return
            }
            if(!final.trim()){
                setError("Debe ingresar una fecha de finalizacion")
                return
            }
            if(!estado.trim()){
                setError("Debe seleccionar un estado de la tarea")
                return
            }
            if(inicio>final){
                setError("La fecha de finalizacion no puede ser antes de la de inicio")
                setFinal("")
                setInicio("")
                return
            }
            if(inicio<moment(yesterday).format()){
                // console.log(inicio)
                // console.log(yesterday)
                setFinal("")
                setInicio("")
                setError("La fecha de inicio no puede ser antes de la fecha actual")
                return
            }


            const dataUpdate = {
                nombre:nombre,
                descripcion:descripcion,
                inicio:inicio,
                final:final,
                estado:estado
            }
            db.collection(props.usuario.email).doc(idEditar).update(dataUpdate)
            setEditar(false)
            const arrayNuevo = tareas.map(item =>(item.id === idEditar ? {id: item.id, fecha: item.fecha, nombre:nombre, descripcion:descripcion, inicio:inicio, final:final, estado:estado} :item) )
            setTareas(arrayNuevo)
            setDescripcion("")
            setNombre("")
            setInicio("")
            setFinal("")
            setEstado("")
            setIdEditar("")
            setError("")
        } catch (error) {
            console.log(error)
        }
    }
    
    const updateStatus = async(iddoc, value)=>{
        // console.log(iddoc)
        // console.log(value)
        const userEmail = props.usuario.email 
        // console.log(iddoc)
        // console.log(userEmail)
        try {
             await db.collection(userEmail).doc(iddoc).update({
                estado:value
            })
            
            
        } catch (error) {
            console.log(error)
        }
    }
    const eliminarTarea = async(iddoccuemnt) =>{
        try {
           await db.collection(props.usuario.email).doc(iddoccuemnt).delete()
           const arrayFiltrado = tareas.filter(item =>item.id !== iddoccuemnt)
           setTareas(arrayFiltrado)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        const sesion = async () =>{
            auth.onAuthStateChanged(user =>{
                if(user){
                    setUser(true)
                    obtenerDatos()

                }
                else{
                    setTiene(false)
                    return
                }
            })
        }

    const obtenerDatos = async ()=>{
        const emailUsuario = auth.currentUser.email
        try {
            const data = await db.collection(emailUsuario).get()
            const arrayData = await data.docs.map(doc=> ({id:doc.id, ...doc.data()}))

            if(data.empty){
                setTiene(false)
            }
            else{
                setTiene(true)
            }
            // console.log(arrayData)
            setTareas([...tareas, ...arrayData]);
        } catch (error) {
            console.log(error)
        }
        if(user){
            obtenerDatos()
        }
        
    }
    sesion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[props])

    return (
        <div>
            <button type="button" className={anadir? "btn btn-outline-danger mb-5 mt-5" : "btn btn-outline-success mb-5 mt-5"} onClick={()=>{setAnadir(!anadir)}}>
            
            {
                anadir ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle-fill mx-2" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                  </svg>
              )
              : 
              (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-plus mx-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>
              )
            }
            {
                anadir ? "Cerrar" : "Agregar nueva tarea"
            }
            </button>
            {
                editar && (

                    <div className=" card  ">
                        {
                            error && <div className="mt-5 alert alert-danger"> {error} </div>
                        }
                        <div className="card-item  mt-3 mr-5 ml-5">
                            <label className="form-label">Nombre de la tarea</label>
                            
                            <input
                            className="form-control" 
                            type="text" 
                            placeholder="nombre de la tarea"
                            value={nombre}
                            onChange={e=>{setNombre(e.target.value)}}
                            ></input>

                            <label className="form-label">Descripcion de la tarea</label>
                            <input 
                            className="form-control" 
                            type="text"  
                            value={descripcion}
                            placeholder="descripcion"
                            onChange={e=>{setDescripcion(e.target.value)}}
                            
                            />
                    </div>
                    <div className=" card-item  mt-3 mr-3 ">
                    <label className="form-label">fecha de inicio</label>
                        <input 
                        className="form-control" 
                        type="datetime-local" 
                        value={inicio}
                        placeholder="hora de inicio"
                        onChange={e=>{setInicio(e.target.value)}}
                        />
                        <label className="form-label">fecha de finalizacion</label>

                        <input  
                        className="form-control" 
                        value={final} 
                        type="datetime-local" 
                        placeholder="hora de finalizacion" 
                        onChange={e=>{setFinal(e.target.value)}} />
                    </div>
                    <div className=" card-item  mt-3 mr-3 ml-3 mb-3"> 
                    <label className="form-label">Estado</label>

                        <select 
                        className="form-select" 
                        onChange={e=>{ setEstado(e.target.value)}}
                        > 
                            <option defaultValue disabled>{estado}</option>
                            <option value="Pendiente"> Pendiente</option>
                            <option value="En Proceso">En proceso </option>
                            <option value="Realizada"> Realizada</option>
                        </select>
                    </div>
                    <button onClick={()=>{actualizar()}} type="button" className="btn btn-success mb-3 mx-auto ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle mx-2" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                        Actualizar Tarea
                    </button>
                    <button type="button" className="btn btn-danger mb-3 mx-auto " onClick={()=>{cancelarAnadir()}}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace-reverse mx-2" viewBox="0 0 16 16">
                    <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z"/>
                    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z"/>
                    </svg>
                     Cancelar edicion</button>
                   
            </div>
                )
            }

            {
                anadir && (
                    <div className="card" >
                        {
                            error && <div className="mt-5 alert alert-danger"> {error} </div>
                        }
                        <div className="card-item  mt-3 mr-5 ml-5">
                            <label className="form-label">Nombre de la tarea</label>
                            
                            <input
                            className="form-control" 
                            type="text" 
                            placeholder="nombre de la tarea"
                            value={nombre}
                            onChange={e=>{setNombre(e.target.value)}}
                            ></input>

                            <label className="form-label">Descripcion de la tarea</label>
                            <input 
                            className="form-control" 
                            type="text"  
                            value={descripcion}
                            placeholder="descripcion"
                            onChange={e=>{setDescripcion(e.target.value)}}
                            
                            />
                    </div>
                    <div className=" card-item  mt-3 mr-3 ">
                    <label className="form-label">fecha de inicio</label>
                        <input 
                        className="form-control" 
                        type="datetime-local" 
                        value={inicio}
                        placeholder="hora de inicio"
                        onChange={e=>{setInicio(e.target.value)}}
                        />
                        <label className="form-label">fecha de finalizacion</label>

                        <input className="form-control" value={final} type="datetime-local" placeholder="hora de finalizacion" onChange={e=>{setFinal(e.target.value)}} />
                    </div>
                    <div className=" card-item  mt-3 mr-3 ml-3 mb-3"> 
                    <label className="form-label">Estado</label>

                        <select className="form-select" onChange={e=>{ setEstado(e.target.value)}} > 
                            <option defaultValue> seleccione un estado para la tarea</option>
                            <option value="Pendiente"> Pendiente</option>
                            <option value="En Proceso">En proceso </option>
                            <option value="Realizada"> Realizada</option>
                        </select>
                    </div>
                    <button onClick={()=>{subirTarea()}} type="button" className="btn btn-success mb-3 mx-auto ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle mx-2" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
                        Añadir nueva tarea 
                    </button>
                    <button type="button" className="btn btn-danger mb-3 mx-auto" onClick={()=>{cancelarAnadir()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace-reverse mx-2" viewBox="0 0 16 16">
  <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z"/>
  <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z"/>
</svg>
                        Cancelar nueva tarea</button>
            </div>
                )
            }
            {
                tiene ? (
                    <ul className="list-group">
                    {
                        tareas.map(item => (
                            <li className="list-group-item"key={item.id}>
                                <div className="list-group-item w-100 d-flex justify-content-start">
                                        <h5 className="mb-1">{item.nombre}</h5>  
                                    </div>
                                    <div className=" d-flex justify-content-start">
                                        <p className="mb-1 mx-2 " >{item.descripcion}</p>
                                    </div>
                                    <div className=" d-flex justify-content-start">
                                        <p className="mb-1 mx-2">Inicio: {moment(item.inicio).locale("es-mx").format("LLL")} </p>
                                    </div>
                                    <div className="d-flex justify-content-start">
                                        <p className="mb-1 mx-2">Fin: {  moment(item.final).locale("es-mx").format("LLL")}</p>
                                    </div>
                                    <div className=" w-100 d-flex justify-content-start">                                    
                                        <select className="mb-1 mx-2 form-select" defaultValue={item.estado} onChange={e=>{updateStatus(item.id, e.target.value)}}> {item.estado}
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="En Proceso">En Proceso</option>
                                            <option value="Realizada">Realizada</option>
                                        </select>
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-warning mx-2" onClick={()=>{editarTarea(item)}} >  
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-diff" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4zm-2.5 6.5A.5.5 0 0 1 6 10h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                                                </svg>
                                            editar 
                                            </button>
                                        
                                        <button className="btn btn-danger mr-3" onClick={()=>{eliminarTarea(item.id)}}> 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace-reverse" viewBox="0 0 16 16">
                                                    <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z"/>
                                                    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z"/>
                                                </svg>  
                                            eliminar
                                        </button>
                                    </div>
                                    </div>
                                    
                            </li>
                        ))
                    }
                    </ul>
                ) : (
                    <div className="d-flex justify-items-center">
                        <div className="container text-center" width="100%">
                            <h1 className="display-6 text-center" > hola!</h1>
                            <p> no cuentas con tareas, para agregar una, da click en el boton de arriba</p>
                        </div>
                    </div>
                    )
            }
            
        </div>
    )
}

export default ListaTareas
