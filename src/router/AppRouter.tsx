import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "../views/Login/Login";
import Inicio from '../views/Inicio/Inicio';
import RegistroUsuairo from '../views/Registro/RegistroUsuario';
import { AddConfig } from '../views/Config/AddConfig';
import { ShowConfig } from "../views/Config/ShowConfig";
import { MemPool } from "../components/MemPool/MemPool";
import { AddFile } from "../components/MemPool/AddFile";


interface Context {
    dispatchUser?: any,
    user?: User
}

interface User {
    loggedIn: boolean
}

export function AppRouter() {


    return (

        /*  
          <Router>
             <AuthRouter />
  
          </Router>
          */

        <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/registro" element={<RegistroUsuairo />} />
                <Route path="/inicio/addConfig" element={<AddConfig />} />
                <Route path="/inicio/showConfig" element={<ShowConfig />} />
                <Route path="/inicio/mempool" element={<MemPool />} />
                <Route path="/inicio/mempool/add" element={<AddFile />} />
                

                <Route path="*" element={<Navigate to={"/Login"} />} />
            </Routes>
        </Router>




    );

}