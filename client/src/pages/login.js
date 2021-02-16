import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Formik, Form,Field } from 'formik';

require ('../css/styles.css')


const Login = () => {
    
 function login(values){

    Axios.get("/login?" + new URLSearchParams({
   
        contrasena: values.contrasena,
        correo: values.correo

    
    })).then((response)=>{
        console.log(response.data)
        if(response.data.length > 0){
            let result = response.data[0]._id;
            localStorage.setItem('id', result, { path: "/" })
            window.location.href = '/dashboard'
        }
    })     
    }
function registro(){
    window.location.href='/signup'
}

    return (
        <div className="main-container">
            <div className="row-container container1">
                <h1>¡Mi lista de pendientes!</h1> <br/>
                <img className="main-image" src="https://sanidad.sepca.es/wp-content/uploads/2017/12/checklist-2024181_640.png" alt="Imagen principal"/>
                <br/><br/><h3>¿No tiene cuenta aún?</h3>
                <button className="btn btn btn-info" type="button" onClick={()=>registro()}>Registrarse aquí</button>
            </div>
            <div className="row-container container2">
               <Formik 
                initialValues={
                    {
                        correo:'',
                        contrasena:''
                    }
                }
                onSubmit={(values)=>{
                    console.log(values)
                    login(values)
                        
                    
                }}
               >
                {(formik) => (
                    <div className="login">
                    <h2>Iniciar sesión</h2>
                        <Form>
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

export default withRouter(Login);