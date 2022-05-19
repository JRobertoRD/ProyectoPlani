import './App.css';
/*
import Regsitro from './views/Registro/Registro';
import Login from './views/Login/Login';
import Inicio from './views/Inicio/Inicio';
*/


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useReducer } from 'react';
import { AppRouter } from './router/AppRouter';



const init = ()=>{

  let sessionUser:any = sessionStorage.getItem('user'); 
  let user:any;
  if(!sessionUser){
    user = sessionUser;
  }else{
    user = JSON.parse(sessionUser);
  }
  return user;
}


function App() {


  return (


    <AppRouter />


    /*<Router>
      <Routes>
        <Route path='/' element={<Regsitro />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/inicio' element={<Inicio />} /> 
      </Routes>
    </Router>
    */

  );
}

export default App;
