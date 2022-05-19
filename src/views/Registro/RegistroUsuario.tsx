import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { insertUser } from "../../services/UsuarioController";
import { IUsuario } from '../../models/IUsuario';
import { AuthCard } from "../authCard/AuthCard";

import accountIcon from '../../assets/icons/user.png';
import passwordIcon from '../../assets/icons/password.png';
import logo from '../../assets/img/logo.svg';
import {Link} from 'react-router-dom'

import Swal from "sweetalert2";
import { Alertas } from "../../components/Alertas/alertas";


function RegistroUsuairo() {


  const { register, handleSubmit }: any = useForm();


  const onSubmit = (user: IUsuario, e:React.ChangeEvent<HTMLFormElement>) => {
    const alerta = new Alertas();
    if (user.contrasenia !== '' && user.nombre !== '') {
      insertUser((user))
      alerta.alertSuccessRegistro();
      
      e.preventDefault();
 
    }else{
      alerta.alertFailRegistro();
    }
    
  };



  return (
 
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" id="registroForm">
        <div className="text-center mb-2">
          <img
            className="img-fluid"
            src={logo}
            alt="logo"
          />
        </div>

        <div className="mb-2 p-1 d-flex border rounded">
          <div className="mx-2 mt-1">
            <img
              className="img-fluid"
              src={accountIcon}
              alt="iconUser" />
          </div>
          <input
            autoFocus
            className="form-control txt-input"
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Email"
            {...register("nombre")}
            
          />
        </div>

        <div className="mb-2 p-1 d-flex border rounded">
          <div className="mx-2 mt-1">
            <img
              className="img-fluid"
              src={passwordIcon}
              alt="iconUser" />
          </div>
          <input
            className="form-control txt-input"
            name="contrasenia"
            id="contrasenia"
            type="password"
            placeholder="Password"
            {...register("contrasenia")}
          />
        </div>

        <div className="row d-flex justify-content-between mt-3 mb-2">

        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary" >
            Registrar
          </button>
        </div>

        <div className="mt-3 mb-3 text-center">
          <h6>Ya tengo Cuenta</h6>
          <Link to="/">Iniciar</Link>
        </div>
      </form>
    </AuthCard>




  );
}

export default RegistroUsuairo;