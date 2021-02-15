import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Axios from 'axios'
require('../css/styles.css')


const SignUp = () => {

    function signUp(values) {
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: values.nombre,
                correo: values.correo,
                contrasena: values.contrasena
            })
        })
            .then(
                fetch('/sendMail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: values.nombre,
                        correo: values.correo,
                        contrasena: values.contrasena,
                        subject: "Bienvenid@ a la plataforma"
                    })
                }).then(
                    Axios.get("/login?" + new URLSearchParams({

                        contrasena: values.contrasena,
                        correo: values.correo


                    })).then((response) => {
                        console.log(response.data)
                        if (response.data.length > 0) {
                            let result = response.data[0]._id;
                            localStorage.setItem('id', result, { path: "/" })
                            window.location.href = '/dashboard'
                        }
                    })
                )
            )



    }
    return (
        <div className="main-container">
            <div className="row-container container1">
                <h1>¡Crea tu cuenta!</h1> <br />
                <img className="main-image" src="https://sanidad.sepca.es/wp-content/uploads/2017/12/checklist-2024181_640.png" alt="Imagen principal" />
            </div>
            <div className="row-container container2">
                <Formik
                    initialValues={
                        {
                            nombre: '',
                            correo: '',
                            contrasena: ''
                        }
                    }
                    onSubmit={(values) => {
                        console.log(values)
                        signUp(values)


                    }}
                >
                    {(formik) => (
                        <div className="login">
                            <h2>Registrarse</h2>
                            <Form>
                                <div class="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <Field type="text" className="form-control" id="nombre" aria-describedby="emailHelp" name="nombre" />

                                </div>
                                <div class="mb-3">
                                    <label htmlFor="correo" className="form-label">Correo</label>
                                    <Field type="email" className="form-control" id="correo" aria-describedby="emailHelp" name="correo" />

                                </div>
                                <div class="mb-3">
                                    <label htmlFor="contrasena" className="form-label">Contraseña</label>
                                    <Field type="password" className="form-control" id="contrasena" name="contrasena" />
                                </div>
                                <button type="submit" classNAme="btn btn-primary btn-block">Ingresar</button>
                            </Form>
                        </div>
                    )}

                </Formik>

            </div>
        </div>
    );
}

export default withRouter(SignUp);