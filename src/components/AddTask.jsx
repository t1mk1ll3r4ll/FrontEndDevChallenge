import React, { useState } from 'react'
import { db } from '../firebase'

const AddTask = (props) => {

    const [agregar, setAgregar]= useState(false)
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [inicio, setInicio] = useState("")
    const [final, setFinal] = useState("")
    const [estado, setEstado] = useState("")
    const [error, setError]= useState(null)
    

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
            const data ={
                nombre: nombre,
                descripcion:descripcion,
                inicio:inicio,
                final:final,
                estado:estado
            }
            await db.collection(props.usuario.email).add(data)
            setAgregar(false)
            window.location.reload()

        } catch (error) {
            console.log(error)
        }
    }
    return (

    <div className=" mt-3 ">
        <div className="mb-3">
            <button type="button" className="  btn btn-outline-success mb-5" onClick={()=>{setAgregar(!agregar)}}>
            {
                agregar ? "Contraer Formulario" : "Agregar Tarea"
            }
            </button>

            {
                agregar && (
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
                            placeholder="descripcion"
                            onChange={e=>{setDescripcion(e.target.value)}}
                            
                            />
                    </div>
                    <div className=" card-item  mt-3 mr-3 ">
                    <label className="form-label">fecha de inicio</label>
                        <input 
                        className="form-control" 
                        type="datetime-local" 
                        placeholder="hora de inicio"
                        onChange={e=>{setInicio(e.target.value)}}
                        />
                        <label className="form-label">fecha de finalizacion</label>

                        <input className="form-control" type="datetime-local" placeholder="hora de finalizacion" onChange={e=>{setFinal(e.target.value)}} />
                    </div>
                    <div className=" card-item  mt-3 mr-3 ml-3 mb-3"> 
                    <label className="form-label">Estado</label>

                        <select className="form-select" onChange={e=>{ setEstado(e.target.value)}} > 
                            <option defaultValue>Selecciona un estado</option>
                            <option value="Pendiente"> Pendiente</option>
                            <option value="En Proceso">En proceso </option>
                            <option value="Realizada"> Realizada</option>
                        </select>
                    </div>
                    <button onClick={()=>{subirTarea()}} type="button" className="btn btn-success mb-3 ">
                        subir nueva tarea
                    </button>
            </div>
                )
            }
                
        </div> 
    </div>
    )
}

export default AddTask;

