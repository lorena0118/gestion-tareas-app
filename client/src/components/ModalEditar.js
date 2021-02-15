import React, {useState} from 'react';
import Axios from 'axios';
import { Formik, Form, Field } from 'formik';
import Modal from 'react-modal'
import { number } from 'yup/lib/locale';

require('../css/styles.css')


const ModalEditar = (props) => {
    const editarModal = props

    const [prioridad, setPrioridad]= useState(number)

    const [modalIsOpen, setModalIsOpen]= useState(false)

    setModalIsOpen(editarModal);
    function EditarTarea(values){
        console.log('hola')
        setModalIsOpen(false)
    }
    return (
        <Modal isOpen={modalIsOpen}>
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

                        </div>

                    </Form>
                </Formik>
            </div>
        </Modal>

    );
}

export default ModalEditar;