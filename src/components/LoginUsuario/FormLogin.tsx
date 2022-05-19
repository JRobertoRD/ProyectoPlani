import React, { useState } from "react";
import "./FormLogin.css";
import { useLocation } from "wouter";
import { Id, IUsuario } from '../../models/IUsuario';
const API_USER_URL = "https://localhost:44320/api/usuario/";

function FormLogin() {


    const id: Id = {
        timestamp: 0,
        machine: 0,
        pid: 0,
        increment: 0,
        creationTime: ''
    }
    const [user, setUser] = useState({
        id: id,
        nombre: "",
        contrasenia: "",
    });

  async function checkUser(data: IUsuario) {
    fetch(API_USER_URL + data.nombre + "/" + data.contrasenia)
      .then((result) => result.json())
      .then((data: IUsuario) => {
        if (data != null) {
          //setTimeout(() => {  setLocation(`/user/${data.nombre}`); }, 2000);
          window.setTimeout(window.location.href = "/inicio" , 3000);
          //setTimeout(() => {  setLocation(`/inicio`); }, 2000);
          //setLocation(`/user/${data.userName}`);
          
        } else {
          console.log("Usuario o contraseña incorrecta");
        }
      });
  }

  const [location, setLocation] = useLocation();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <div className="login-form">
        <label>
          <h5>Username:</h5>
          <input
            type="text"
            name="nombre"
            className="input-text"
            placeholder="Elon"
            onChange={handleChange}
          />
        </label>

        <label>
          <h5>Password:</h5>
          <input
            type="text"
            name="contrasenia"
            className="input-text"
            placeholder="1234"
            onChange={handleChange}
          />
        </label>

        <button id="submit-button" onClick={() => checkUser(user)}>
          Iniciar Sesión
        </button>
      </div>
    </>
  );
}

export default FormLogin;
