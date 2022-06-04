import React from "react";
import { NavBar } from '../../components/NavBar/NavBar';
import { AuthCard } from "../authCard/AuthCard";
//import { NavBar } from "../../components/NavBar/navbar";

import logo from '../../assets/img/logo.svg';

function Inicio() {

  let userName = sessionStorage.getItem('userName');
  console.log(`Hola, mi nombre es ${userName}`);

  return (
    <AuthCard>
      <div className="text-center mb-2">
          <img
            className="img-fluid"
            src={logo}
            alt="logo"
          />
          <div>
            <h1>Bienvenido {userName}</h1>
          </div>
        </div>
    </AuthCard>
  );
}

export default Inicio;
