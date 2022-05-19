import React from "react";
import FormLogin from '../../components/LoginUsuario/FormLogin';
import { NavBar } from '../../components/NavBar/NavBar';
import { AuthCard } from "../authCard/AuthCard";
//import { NavBar } from "../../components/NavBar/navbar";

import logo from '../../assets/img/logo.svg';

function Inicio() {



  return (
    <AuthCard>
      <div className="text-center mb-2">
          <img
            className="img-fluid"
            src={logo}
            alt="logo"
          />
        </div>
    </AuthCard>
  );
}

export default Inicio;
