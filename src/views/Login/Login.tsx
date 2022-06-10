import React, { useState } from "react";
import "./Login.css";

import logo from '../../assets/img/logo.svg';
import accountIcon from '../../assets/icons/user.png';
import passwordIcon from '../../assets/icons/password.png';
import {Link, useNavigate} from 'react-router-dom'
import { Id, IUsuario } from "../../models/IUsuario";
import { useForm } from "react-hook-form";
import { CardUsuario } from '../authCard/CardUsuario';
import { Alertas } from "../../assets/Alertas/alertas";
import { AUTENTICAR_USER } from "../../assets/API/ApiLinks";


const alerta = new Alertas();

export function Login() {
  

  const navigate = useNavigate();

  const Id: Id = {
    timestamp: 0,
    machine: 0,
    pid: 0,
    increment: 0,
    creationTime: ''
  }
  const [user, setUser] = useState<IUsuario>({
    id: Id,
    nombre: "",
    contrasenia: "",
  });

  const {handleSubmit }: any = useForm();


  const onSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
    
    if (user.contrasenia !== '' && user.nombre !== '') {
      //alerta.alertwaiting();
      fetch(AUTENTICAR_USER, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((user) => {
          if (user != null) {
            alerta.alertWelcomeUser();
            sessionStorage.setItem('userName', user.nombre);
            let userName = sessionStorage.getItem('userName');
            console.log(`Hola, mi nombre es ${userName}`);
            navigate("/inicio");
          }
        });
      e.preventDefault();
      alerta.alertFailLogin();
   
    }else{
      alerta.alertFailRegistro();
    }
    
  };
  function handleChangeInput(name: string, e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [name]: e.target.value
    })
  }


  return (
    
    <CardUsuario>
      
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            type="text"
            name="nombre"
            placeholder="User Name"
            onChange={(e) => handleChangeInput('nombre', e)}
            value={user?.nombre}
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
            type="password"
            name="contrasenia"
            placeholder="*******"
            onChange={(e) => handleChangeInput('contrasenia', e)}
            value={user?.contrasenia}
          />
        </div>

        <div className="row d-flex justify-content-between mt-3 mb-2">
          <div className="mb-3">
            <div className="form-check ms-1">
              <input
                type="checkbox"
                className="form-check-input"
                id="mycheckbox"
              />
              <label className="form-check-label" htmlFor="mycheckbox">
                Remember
              </label>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" >
            Sign In
          </button>
        </div>

        <div className="mt-3 mb-3 text-center">
          <Link to="">Forgot Password?</Link>
        </div>

        <div className="mt-3 mb-3 text-center">
          <h6>Don´t have an account</h6>
          <Link to="/registro">Register</Link>
        </div>
      </form> 
    
    </CardUsuario>
  );
}

