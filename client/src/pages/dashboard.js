import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Axios from 'axios'
import Modal from 'react-modal'
import * as Yup from 'yup';
import ModalEditar from "../components/ModalEditar"
require('../css/styles.css')


const Dashboard = () => {

    const [prioridad, setPrioridad] = useState(3);
    const [datosUsuario, setDatosUsuario] = useState({ tareas: [{ nombre_tarea: '' }] })
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalEditarIsOpen, setModalEditarIsOpen] = useState(false)
    const [indexTarea, setIndexTarea]=useState()
    const id = localStorage.getItem('id')

    useEffect(async () => {
        Axios.get("/viewTasks?" + new URLSearchParams({

            "id": id
        }))

            .then((response) => {
                setDatosUsuario(response.data)

            })

    }, [])

    //Agregar tarea
    function newTask(values) {
        fetch(`/newTask?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre_tarea: values.nombre_tarea,
                fecha_vencimiento: values.fecha_vencimiento,
                estado: values.estado,
                imagen: values.imagen,
                prioridad: prioridad
            })
        }).then(() => window.location.href = '/dashboard')
    }

    //Eliminar tarea
    function eliminarTarea(id_tarea) {
        fetch(`/deleteTask?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_tarea: id_tarea
            })
        }).then(() => window.location.href = '/dashboard')
    }

    //abrir modal

    function abrirModal() {
        setModalIsOpen(true)
    }

    //Eliminar datos de navegación

    function borrarDatosStorage() {
        localStorage.removeItem('id');
        window.location.href = '/'
    }

    //Editar tarea
    function EditarTarea(values){
        fetch(`/editTask?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                index: indexTarea,
                nombre_tarea: values.nombre_tarea,
                fecha_vencimiento: values.fecha_vencimiento,
                prioridad: prioridad
            })
        }).then(() => window.location.href = '/dashboard')
    }

    //tarea terminada
    function tareaTerminada(id,index){
        fetch(`/taskDone`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id_tarea": id,
                "index": index 
            })
        }).then(() => window.location.href = '/dashboard')
    }

    //Desmarcar tarea terminada
    function desmarcarTareaTerminada(id, index){
        fetch(`/reverseTaskDone`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id_tarea": id,
                "index": index 
            })
        }).then(() => window.location.href = '/dashboard')
    }

    return (
        <div>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand">Hola {datosUsuario.nombre}, bienvenido.</a>
                    <form class="d-flex">

                        <button class="btn btn-success" type="button" onClick={() => abrirModal()}>ver tareas con fechas proximas</button>-
                        <button class="btn btn-success" type="button" onClick={() => borrarDatosStorage()}>salir</button>
                    </form>
                </div>
            </nav>

            <div className="main-container centro">
                <div className="con-prioridad">
                    Tareas prioritarias
                </div>-
                <div className="sin-prioridad">
                    Tareas no prioritarias
                </div>-
                <div className="terminado">
                    Tareas terminadas
                </div>

            </div>

            {console.log(modalIsOpen)}
            <Modal isOpen={modalIsOpen}>
                <h2>Hola</h2>
                <button onClick={() => setModalIsOpen(false)}>cerrar</button>
            </Modal>
            <div className="main-container">
                <div className="container-tasks">
                    {
                        datosUsuario.tareas.map((item, index) => {
                            let clase
                            if(item.estado==true){
                                clase= "container-task terminado"
                            }else{
                                if (item.prioridad == 1) {
                                    clase = "container-task con-prioridad"
                                } else {
                                    clase = "container-task sin-prioridad"
                                }
                            }

                            
                            return <div className={clase}>
                                <div className="container-nombre">
                                    <b><span className="titulo-task">{item.nombre_tarea}</span></b><br />
                                    <span>
                                        vence el: <br /> <b>{item.fecha_vencimiento}</b>
                                    </span>
                                </div>

                                <div className="container-botones d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn btn-info" type="button" onClick={() => {
                                        if(item.estado==false){
                                            console.log(index)
                                            tareaTerminada(item._id, index)
                                            
                                        }else{
                                            desmarcarTareaTerminada(item._id, index)
                                        }
                                        
                                        
                                        }}>Hecho</button><br /><br />
                                    <button className="btn btn btn-info" type="button" onClick={() => {
                                        setModalEditarIsOpen(true)
                                        setIndexTarea(index)
                                        
                                        }}>Editar</button><br /><br />
                                    <button className="btn btn-danger" type="button" onClick={() => { eliminarTarea(item._id) }}>Eliminar</button>


                                </div>
                                
                            </div>
                        })
                    }

                    {/* <ModalEditar editarModal={modalEditarIsOpen}/> */}

                </div>
                
                <div className="container2">
                    <Formik
                        initialValues={
                            {
                                nombre_tarea: "",
                                fecha_vencimiento: 0,
                                estado: false,
                                imagen: ""
                            }
                        }
                        onSubmit={(values) => {
                            console.log(values)
                            newTask(values)


                        }}
                    >

                        <Form>
                            <h3>Ingresar nueva tarea:</h3>
                            <div class="mb-3">
                                <label htmlFor="nombre_tarea" className="form-label">Tarea</label>
                                <Field type="text" className="form-control" id="nombre_tarea" name="nombre_tarea" placeholder="Nombre de la tarea" />

                            </div>
                            <div class="mb-3">
                                <label htmlFor="prioridad" className="form-label">Prioridad</label><br />
                                <select className="form-control" onChange={(e) => setPrioridad(e.target.value)}>
                                    <option value="3">-</option>
                                    <option value="1">Prioritario</option>
                                    <option value="2">Puede esperar</option>
                                </select>

                            </div>
                            <div class="mb-3">
                                <label htmlFor="fecha_vencimiento" className="form-label">Fecha vencimiento de la tarea</label>
                                <Field type="date" className="form-control" id="fecha_vencimiento" name="fecha_vencimiento" />

                            </div>
                            <div class="mb-3">
                                <label htmlFor="imagen" className="form-label">Imagen de la tarea:</label>
                                <Field type="file" className="form-control" id="nombre_tarea" name="imagen" placeholder="imagen" />

                            </div>

                            <div class="d-grid gap-2">
                                <button class="btn btn-info" type="submit">Añadir tarea</button>

                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>
            <Modal isOpen={modalEditarIsOpen}>
            <div className="container2">
                    <Formik
                        initialValues={
                            {
                                nombre_tarea: "",
                                fecha_vencimiento: 0,
                                estado: false,
                                imagen: ""
                            }
                        }
                        onSubmit={(values) => {
                            console.log(values)
                            setModalEditarIsOpen(false)
                            EditarTarea(values)
                            


                        }}
                    >

                        <Form>
                        <h3>Editar tarea:</h3>
                        <div class="mb-3">
                            <label htmlFor="nombre_tarea" className="form-label">Nombre tarea</label>
                            <Field type="text" className="form-control" id="nombre_tarea" name="nombre_tarea" placeholder="Nuevo nombre" />

                        </div>
                        <div class="mb-3">
                            <label htmlFor="prioridad" className="form-label">Prioridad</label><br />
                            <select className="form-control" onChange={(e) => setPrioridad(e.target.value)}>
                                <option value="3">-</option>
                                <option value="1">Prioritario</option>
                                <option value="2">Puede esperar</option>
                            </select>

                        </div>
                        <div class="mb-3">
                            <label htmlFor="fecha_vencimiento" className="form-label">Fecha vencimiento de la tarea</label>
                            <Field type="date" className="form-control" id="fecha_vencimiento" name="fecha_vencimiento" />

                        </div>
                        <div class="mb-3">
                            <label htmlFor="imagen" className="form-label">Imagen de la tarea:</label>
                            <Field type="file" className="form-control" id="nombre_tarea" name="imagen" placeholder="imagen" />

                        </div>

                        <div class="d-grid gap-2">
                            <button class="btn btn-info" type="submit">Editar tarea</button>

                        </div><br/>
                        <div class="d-grid gap-2">
                            <button class="btn btn-danger" type="button" onClick={()=> setModalEditarIsOpen(false)}>Cancelar</button>

                        </div>

                    </Form>
                    </Formik>
                </div>
            </Modal>
        </div>


    );
}

export default withRouter(Dashboard);