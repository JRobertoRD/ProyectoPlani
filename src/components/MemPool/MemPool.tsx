import { appendFile } from "fs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, MouseEvent } from "react";
import { _Id, IFile } from '../../models/IFile';
import { MemPoolController } from "../../services/MemPoolController";
import { CardMemPool } from "../../views/authCard/CardMemPool";
import { Alertas } from "../Alertas/alertas";


const alerta = new Alertas();
export interface State {
    listMemPool: IFile[]
}

export function MemPool() {

    const navigate = useNavigate();

    const [state, setState] = useState<State>({
        listMemPool: []
    });

    useEffect(() => {
        getMemPool()
    }, [state]);

    const getMemPool = async () => {
        const api = new MemPoolController();
        const response = (await api.getMemPool()).data
        setState({ listMemPool: response });
    };

    async function deleteFile(id:string){
        const api = new MemPoolController();
        alerta.alertwaiting();
        const response = await api.deleteFromMemPool(id);
        if(response){
            alerta.alert('Exitoso', 'Archivos Gardados', 'success', 3000);
    
            navigate("/inicio/mempool")
        }else{
            alerta.alert('Error!', 'Intente nuevamente!!', 'error', 3000)
        }

    }

    async function downloadFile(base64:any, name: string){
        var fileDownload = require('js-file-download');
        const byteString = window.atob(base64.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: name.split(".")[1] });
        fileDownload(blob, name);
    }
    

    return (

        <CardMemPool>
            <div className="container">
                <a href="/inicio/mempool/add">
                    <button type="button" className="btn btn-success">Agregar</button>
                </a>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Name</th>
                            <th scope="col">Extension</th>
                            <th scope="col">Date</th>
                            <th scope="col">Size</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.listMemPool.map((item: any) => (
                            <tr key={item._Id}>
                                <td>{item._Id}</td>
                                <td>{item.owner}</td>
                                <td>{item.name}</td>
                                <td>{item.extension}</td>
                                <td>{item.create}</td>
                                <td>{item.size}</td>
                                <td>
                                    <button type="submit" className="btn btn-danger" onClick= {() =>{deleteFile(item._Id);}}>
                                        Eliminar
                                    </button>
                                    <button type="submit" className="btn btn-info" onClick= {() =>{downloadFile(item.base64, item.name);}}>
                                        Descargar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardMemPool>
    );
}
