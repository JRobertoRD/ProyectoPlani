import { IUsuario } from '../models/IUsuario';
//44320
const API_USER_URL = "https://localhost:44320/api/usuario/";

export function getAllusers() {

  fetch(API_USER_URL)
    .then((result) => result.json())
    .then((data) => console.log(data));
}

export function insertUser(data: IUsuario) {
  fetch(API_USER_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => console.log(data));
}

export function autenticar(user:IUsuario){

    fetch(API_USER_URL + user.nombre + "/" + user.contrasenia, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((user) => {
        if (user != null) {
          return user;
        }
      });
}