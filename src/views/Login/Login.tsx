import React, { useState } from "react";
import "./Login.css";

import logo from '../../assets/img/logo.svg';
import accountIcon from '../../assets/icons/user.png';
import passwordIcon from '../../assets/icons/password.png';
import {Link, useNavigate} from 'react-router-dom'
import { Id, IUsuario } from "../../models/IUsuario";
import { useForm } from "react-hook-form";
import { CardUsuario } from '../authCard/CardUsuario';
import { Alertas } from "../../components/Alertas/alertas";
import { addUser, autenticar2 } from "../../services/UsuarioController";

//44320
const API_USER_URL = "https://localhost:44320/api/usuario/autenticar/";
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

  const { register, handleSubmit }: any = useForm();


  const onSubmit = (user: IUsuario, e:React.ChangeEvent<HTMLFormElement>) => {
    
    if (user.contrasenia !== '' && user.nombre !== '') {
      alerta.alertwaiting();
      const aux = API_USER_URL;
      fetch(aux, {
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
            navigate("/inicio");
          }
        });
      e.preventDefault();
      alerta.alertFailLogin();
     // alertFail1();
   
    }else{
      //alertFileRegistro();
      alerta.alertFailRegistro();
    }
    
  };


  function handleChangeInput(name: string, e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [name]: e.target.value
    })
  }

  async function handleSubmitSave() {
    
    let response: any;

    try {
      let response = (await autenticar2(user));
    } catch (e) {
      console.log(e);
    }
    clearInputs()
    //reload()
  }

  function clearInputs() {
    setUser({
      id: Id,
      nombre: '',
      contrasenia:''
    })
  }


  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <CardUsuario>
      
       {/* <form autoComplete="off">
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
            placeholder="Elon"
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
            placeholder="Elon"
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
          <button className="btn btn-primary" type="submit" onClick={handleSubmitSave}>
            Sign In
          </button>
        </div>

        <div className="mt-3 mb-3 text-center">
          <Link to="/">Forgot Password?</Link>
        </div>

        <div className="mt-3 mb-3 text-center">
           <h6>Don´t have an account</h6>
          <Link to="/registro">Register</Link>
        </div>
      </form>  */}



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
            placeholder="Elon"
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
            type="password"
            name="contrasenia"
            placeholder="Elon"
            {...register("contrasenia")}
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
          <button className="btn btn-primary">
            Sign In
          </button>
        </div>

        <div className="mt-3 mb-3 text-center">
          <Link to="/auth/recover">Forgot Password?</Link>
        </div>

        <div className="mt-3 mb-3 text-center">
           <h6>Don´t have an account</h6>
          <Link to="/registro">Register</Link>
        </div>
      </form>
    
    </CardUsuario>
  );
}

