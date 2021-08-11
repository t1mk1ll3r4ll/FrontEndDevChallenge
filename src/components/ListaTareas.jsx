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
        setAnadir(false)
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
                setError("debe ingresar un nombre")
                return
            }
            if( !descripcion.trim()){
                setError("debe ingresar una descripcion")
                return
            }
            if(!inicio.trim()){
                setError("debe ingresar una fecha de inicio")
                return
            }
            if(!final.trim()){
                setError("debe ingresar una fecha de finalizacion")
                return
            }
            if(!estado.trim()){
                setError("debe seleccionar un estado de la tarea")
                return
            }
            if(inicio>final){
                setError("la fecha de finalizacion no puede antes de la de inicio")
                setFinal("")
                setInicio("")
                return
            }
            if(inicio<moment(yesterday).format()){
                // console.log(inicio)
                // console.log(yesterday)
                setFinal("")
                setInicio("")
                setError("la fecha de inicio no puede ser antes de la fecha actual")
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
                setError("debe ingresar un nombre")
                return
            }
            if( !descripcion.trim()){
                setError("debe ingresar una descripcion")
                return
            }
            if(!inicio.trim()){
                setError("debe ingresar una fecha de inicio")
                return
            }
            if(!final.trim()){
                setError("debe ingresar una fecha de finalizacion")
                return
            }
            if(!estado.trim()){
                setError("debe seleccionar un estado de la tarea")
                return
            }
            if(inicio>final){
                setError("la fecha de finalizacion no puede antes de la de inicio")
                setFinal("")
                setInicio("")
                return
            }
            if(inicio<moment(yesterday).format()){
                // console.log(inicio)
                // console.log(yesterday)
                setFinal("")
                setInicio("")
                setError("la fecha de inicio no puede ser antes de la fecha actual")
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
    }
    sesion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[props])

    return (
        <div>
            <button type="button" className="  btn btn-outline-success mb-5 mt-5" onClick={()=>{setAnadir(!anadir)}}>
            {
                anadir ? "Contraer Formulario" : "Agregar Tarea"
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
                    <button onClick={()=>{actualizar()}} type="button" className="btn btn-success mb-3 ">
                        Actualizar Tarea
                    </button>
                    <button type="button" className="btn btn-danger mb-3" onClick={()=>{setEditar(!editar)}}>Cancelar edicion</button>
                   
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
                    <button onClick={()=>{subirTarea()}} type="button" className="btn btn-success mb-3 ">
                        Añadir nueva tarea 
                    </button>
                    <button type="button" className="btn btn-danger mb-3" onClick={()=>{cancelarAnadir()}}>Cancelar nueva tarea</button>
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
                                        <div className="d-flex justify-content-end mx-auto">
                                            <button className="btn btn-warning mx-3" onClick={()=>{editarTarea(item)}} > editar </button>
                                            <button className="btn btn-danger " onClick={()=>{eliminarTarea(item.id)}}>eliminar</button>
                                    </div>
                                    </div>
                                    
                            </li>
                        ))
                    }
                    </ul>
                ) : (
                    <div className="d-flex justify-items-center">
                        <div className="border border-success">

                        </div>
                    </div>
                    )
            }
            
        </div>
    )
}

export default ListaTareas
