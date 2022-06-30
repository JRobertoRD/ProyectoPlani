import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

import { IFile } from '../../models/IFile';
import { MemPoolController } from "../../services/MemPoolController";
import { CardMemPool } from "../../views/authCard/CardMemPool";
import { Alertas } from "../../assets/Alertas/alertas";
import { SessionStorage } from "../../assets/SessionStorage/sessionStorage";
import { NAME_COMPRESSED, EXTENSION_COMPRESSED } from "../../assets/Download/Download"
import { MinedController } from "../../services/MinedController";



const alerta = new Alertas();
const session = new SessionStorage();
export interface State {
    listMemPool: IFile[],
}

export function MemPool() {

    let fileListMasive = useRef(new Array<IFile>());
    const navigate = useNavigate();

    const [listMemPool, setistMemPool] = useState([]);

    const [enable, setDisable] = useState(true);

    useEffect(() => {
        /*
        if (state.listMemPool.length == 0) {
            alerta.alertwaiting();
        }*/
        getMemPool();
    },[]);

    async function getMemPool() {
        const api = new MemPoolController();
        alerta.alertwaitingPer('Buscando archivos de: ' + session.getData("userName"));
        const response = (await api.getMemPoolFilter(session.getData("userName"))).data
        setistMemPool(response)
        alerta.closeSwal();
    };

    async function deleteFile(id: string) {
        const api = new MemPoolController();
        alerta.alertwaiting();
        const response = await api.deleteFromMemPool(id);
        if (response) {
            alerta.alert('Exitoso', 'Archivos Eliminados', 'success', 3000);
            setDisable(true);
            getMemPool()
        } else {
            alerta.alert('Error!', 'Intente nuevamente!!', 'error', 3000)
        }
    }

    async function downloadFile(base64: string, name: string, extension: string) {
        var fileDownload = require('js-file-download');
        let blob = convertStringToBlob(base64.split(",")[1], extension)
        fileDownload(blob, name + '.' + extension);
    }

    function convertStringToBlob(content: string, extension: string) {
        const byteString = window.atob(content);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([int8Array], { type: extension });
    }

    const masiveActionsOnChange = (e) => {
        if (e.target.checked) {
            let datos = e.target.name.split('*');
            let file: IFile = {
                _id: datos[0],
                owner: '',
                name: datos[1],
                extension: datos[2],
                create: '',
                size: 0,
                base64: datos[3]
            };
            fileListMasive.current.push(file);
        } else {
            filteredFileListMasive(fileListMasive.current, e.target.name.split('*')[0]);
        }
        enableButtons(fileListMasive.current);
    };

    function filteredFileListMasive(fileList: IFile[], id: string) {
        const fileListFiltered = fileList.filter((item) => {
            return item._id !== id
        });
        //const fileListFiltered = fileList.splice()
        fileListMasive.current = fileListFiltered;
    }

    function enableButtons(fileList: IFile[]) {
        if (fileList.length > 1) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    async function downloadMavise() {
        var zipDependicie = require('jszip');
        var saveAs = require('file-saver')
        var zip = new zipDependicie();
        for (let fileItem of fileListMasive.current) {
            console.log(fileItem);
            let file = new File([convertStringToBlob(fileItem.base64.split(',')[1], fileItem.extension)], fileItem.name, null);
            zip.file(fileItem.name + '.' + fileItem.extension, file);
        }
        zip.generateAsync({ type: "blob" }).then(content => {
            saveAs(content, NAME_COMPRESSED + '.' + EXTENSION_COMPRESSED);
        });
        //fileListMasive.current = null;
    }
    async function deleteMavise() {
        const api = new MemPoolController();
        alerta.alertwaiting();
        const response = await api.deleteMasiveFromMemPool(fileListMasive.current);
        if (response) {
            alerta.alert('Exitoso', 'Archivos Eliminados', 'success', 3000);
            setDisable(true);
            fileListMasive.current = new Array<IFile>();
            getMemPool()
        } else {
            alerta.alert('Error!', 'Intente nuevamente!!', 'error', 3000)
        }
    }

    async function mineFiles() {
        const api = new MinedController();
        alerta.alertwaitingM('Minando archivos...', 'Espere por favor!');
        const response = await api.mineFiles(session.getData("userName"));
        //alerta.alertwaitingM('Minando archivos...', 'Espere por favor!');
        if (response.data.split(',')[0]) {
            alerta.alert('Exitoso', 'Se minó ' + response.data.split(',')[1] + ' archivo(s)', 'success', 2000);
            getMemPool()
        } else {
            alerta.alert('Error!', 'Intente nuevamente!!', 'error', 2000)
        }
    }

    return (

        <CardMemPool>
            <div className="container">
                <a href="/inicio/mempool/add">
                    <button type="button" className="btn btn-success">
                        <img src="https://img.icons8.com/material/24/000000/plus-math--v2.png" />
                    </button>
                </a>
                {listMemPool.length !== 0 ? (
                    <a onClick={() => { mineFiles() }} title="Mine" className="btn btn-warning">
                        <img src="https://img.icons8.com/external-mixed-line-solid-yogi-aprelliyanto/24/000000/external-pickaxe-construction-mixed-line-solid-yogi-aprelliyanto.png" />
                    </a>) : (<br></br>)}
                <button type="button" hidden={enable} className="btn btn-danger" onClick={deleteMavise}>Delete Files</button>
                <button type="button" hidden={enable} className="btn btn-info" onClick={downloadMavise}>Download Files</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Masive</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Name</th>
                            <th scope="col">Extension</th>
                            <th scope="col">Date</th>
                            <th scope="col">Size</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listMemPool.map((item: any) => (
                            <tr key={item._Id}>
                                <td>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" name={item._Id + "*" + item.name + "*" + item.extension + "*" + item.base64} itemID={item._Id} onChangeCapture={masiveActionsOnChange} type="checkbox" id="flexSwitchCheckDefault" />
                                    </div>
                                </td>
                                <td>{item.owner}</td>
                                <td>{item.name}</td>
                                <td>{item.extension}</td>
                                <td>{item.create}</td>
                                <td>{item.size}</td>
                                <td>
                                    <button type="submit" className="btn btn-danger" title="Delete" onClick={() => { deleteFile(item._Id); }}>
                                        <img src="https://img.icons8.com/material/24/000000/delete-forever--v1.png" />
                                    </button>
                                    <button type="submit" className="btn btn-info" title="Download" onClick={() => { downloadFile(item.base64, item.name, item.extension); }}>
                                        <img src="https://img.icons8.com/material/24/000000/downloading-updates--v1.png" />
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
