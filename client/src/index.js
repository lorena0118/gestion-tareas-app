import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

//importación de pages
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import SignUp from './pages/signUp'



//enrutamiento

const App =()=>{
  return(
    <BrowserRouter>
      <Route exact path="/" component={Login}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/signup" component={SignUp}/>
    </BrowserRouter>
  )
}




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
