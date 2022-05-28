import { useNavigate } from "react-router-dom";
import { AuthCard } from "../authCard/AuthCard";


import accountIcon from '../../assets/icons/user.png';
import passwordIcon from '../../assets/icons/password.png';
import logo from '../../assets/img/logo.svg';
import { useState } from "react";
import { Config, Id } from "../../models/IConfig";
import { Alertas } from "../../components/Alertas/alertas";
import { addConfig } from "../../services/ConfigController";

const alerta = new Alertas();

export interface State {
  modalId: string;
  reload?: any
  data: Config | null,
  action: null
}
export function AddConfig(){

  const navigate = useNavigate();

  const id: Id = {
    timestamp: 0,
    machine: 0,
    pid: 0,
    increment: 0,
    creationTime: ''
  }

  const [config, setConfig] = useState<Config>({
    id: id,
    nombre: '',
    numDocumentoPB:''
  })

  
  function handleChangeInput(name: string, e: React.ChangeEvent<HTMLInputElement>) {
    setConfig({
      ...config,
      [name]: e.target.value
    })
  }

  async function handleSubmitSave() {
    
    let response: any;

    response =  addConfig(config);
    console.log(response.data)

    if(response){
      alerta.alertSuccessRegistro();
       
      navigate("/inicio/showConfig")
    }
    clearInputs()
    //reload()
  }

  function clearInputs() {
    setConfig({
      id: id,
      nombre: '',
      numDocumentoPB:''
    })
  }


    return (
 

<AuthCard>

      <form autoComplete="off" id="registroForm">
        <div className="text-center mb-2">
          <img
            className="img-fluid"
            src={logo}
            alt="logo"
          />
        </div>
        <div className="mt-3 mb-3 text-center">
          <h6>Agregar Configuraciones</h6>
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
            onChange={(e) => handleChangeInput('nombre', e)}
            value={config?.nombre}
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
            name="numDocumentoPB"
            id="numDocumentoPB"
            type="text"
            onChange={(e) => handleChangeInput('numDocumentoPB', e)}
            value={config?.numDocumentoPB}
          />
        </div>

        <div className="row d-flex justify-content-between mt-3 mb-2">

        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary" onClick={handleSubmitSave}>
            Agregar
          </button>
        </div>


      </form>
    </AuthCard>
    
    
    
    
      );
    
    
}

function reload() {
  throw new Error("Function not implemented.");
}
