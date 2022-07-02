import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "../views/Login/Login";
import Inicio from '../views/Inicio/Inicio';
import RegistroUsuairo from '../views/Registro/RegistroUsuario';
import { AddConfig } from '../views/Config/AddConfig';
import { ShowConfig } from "../views/Config/ShowConfig";
import { MemPool } from "../components/MemPool/MemPool";
import { AddFile } from "../components/MemPool/AddFile";
import { Blocks } from '../components/Block/Blocks';
import { BlockDetails } from '../components/Block/BlockDetails';


export function AppRouter() {
    

    let user = sessionStorage.getItem('userName');




    return (


        <Router>
            <Routes>
                
                <Route path="/Login" element={<Login />} />
                <Route path="/inicio" element={ user == null ? (<Navigate to="/Login"/>): (<Inicio />) } />
                <Route path="/registro" element={<RegistroUsuairo />} />
                <Route path="/inicio/addConfig" element={<AddConfig />} />
                <Route path="/inicio/showConfig" element={<ShowConfig />} />
                <Route path="/inicio/mempool" element={ user == null ? (<Navigate to="/Login"/>): (<MemPool />) } />
                <Route path="/inicio/mempool/add" element={ user == null ? (<Navigate to="/Login"/>): (<AddFile />) } />
                <Route path="/inicio/blocks" element={ user == null ? (<Navigate to="/Login"/>): (<Blocks />) } />
                <Route path="/inicio/block/:id" element={ user == null ? (<Navigate to="/Login"/>): (<BlockDetails />) } />

                <Route path="*" element={<Navigate to={"/Login"} />} />
            </Routes>
        </Router>




    );

}