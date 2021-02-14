import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form,Field } from 'formik';

require ('../css/styles.css')


const SignUp = () => {
    
 function signUp(values){
         fetch('http://localhost:5002/signup',{
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
        .then((hola)=> console.log(hola))
         
         
         
    }
    return (
        <div className="main-container">
            <div className="row-container container1">
                <h1>¡Crea tu cuenta!</h1> <br/>
                <img className="main-image" src="https://sanidad.sepca.es/wp-content/uploads/2017/12/checklist-2024181_640.png" alt="Imagen principal"/>
            </div>
            <div className="row-container container2">
               <Formik 
                initialValues={
                    {
                        nombre:'',
                        correo:'',
                        contrasena:''
                    }
                }
                onSubmit={(values)=>{
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
                                <Field type="text" className="form-control" id="nombre" aria-describedby="emailHelp" name="nombre"/>
                                
                            </div>
                            <div class="mb-3">
                                <label htmlFor="correo" className="form-label">Correo</label>
                                <Field type="email" className="form-control" id="correo" aria-describedby="emailHelp" name="correo"/>
                                
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