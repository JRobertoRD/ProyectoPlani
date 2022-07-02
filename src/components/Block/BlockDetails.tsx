import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Table } from 'react-bootstrap'


import { Alertas } from "../../assets/Alertas/alertas";
import { SessionStorage } from "../../assets/SessionStorage/sessionStorage";
import { Operations } from "../../assets/File/Operations";
import { BlockController } from "../../services/BlockController";
import { CardBlock } from "../../views/authCard/CardBlock";
import { IFile } from "../../models/IFile";


const alerta = new Alertas();
const operations = new Operations();
export function BlockDetails() {

    const { id } = useParams();
    let fileListMasive = useRef(new Array<IFile>());
    const [owner, setOwner] = useState();
    const [fechaMinado, setFechaMinado] = useState();
    const [milisegundos, setMilisegundos] = useState();
    const [prueba, setPrueba] = useState();
    const [hashPrevio, setHashPrevio] = useState();
    const [hash, setHash] = useState();
    const [documents, setDocuemnts] = useState([]);
    const [hidden, setHidden] = useState(true);
    useEffect(() => {
        getBlock();
    },[useState]);

    async function getBlock() {
        const api = new BlockController();
        alerta.alertwaitingPer('Buscando el bloque ' + id);
        const response = (await api.getBlockId(id)).data
        setOwner(response.owner);
        setFechaMinado(response.fechaMinado.split('T')[0]);
        setMilisegundos(response.millisegundos)
        setPrueba(response.prueba)
        setHashPrevio(response.hashPrevio)
        setHash(response.hash);
        setDocuemnts(response.documentos);
        alerta.closeSwal();
    };

    function downloadFile(base64: string, name: string, extension: string) {
        operations.downloadFile(base64, name, extension);
    }

    const handleOnChange = (event: any, fileString: string) => {
        let datos = fileString.split('$');
        if (event.target.checked) {
            let file: IFile = {
                _id: datos[0],
                owner: '',
                name: datos[2],
                extension: datos[3],
                create: '',
                size: 0,
                base64: datos[5]
            };
            fileListMasive.current.push(file);
        } else {
            filteredFileListMasive(fileListMasive.current, datos[0]);
        }
        enableButtons(fileListMasive.current);
    }

    function filteredFileListMasive(fileList: IFile[], id: string) {
        const fileListFiltered = fileList.filter((item) => {
            return item._id !== id
        });
        //const fileListFiltered = fileList.splice()
        fileListMasive.current = fileListFiltered;
    }

    function enableButtons(fileList: IFile[]) {
        if (fileList.length > 1) {
            setHidden(false);
        } else {
            setHidden(true);
        }
    }

    async function downloadFiles() {
        operations.downloadMavise(fileListMasive.current);
    }

    return (

        <CardBlock>
            <div className="container">

                <div className="container">
                    <h2>Información del Bloque</h2>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="owner">Dueño:</label>
                                        <input type="text" id="owner" className="form-control" value={owner} disabled />
                                    </td>
                                    <td>
                                        <label htmlFor="fechaMinado">Fecha Minado:</label>
                                        <input type="text" id="fechaMinado" className="form-control" value={fechaMinado} disabled />
                                    </td>
                                    <td>
                                        <label htmlFor="milisegundos">Milisegundos:</label>
                                        <input type="text" id="milisegundos" className="form-control" value={milisegundos} disabled />

                                    </td>
                                    <td>
                                        <label htmlFor="prueba">Prueba:</label>
                                        <input type="text" id="prueba" className="form-control" value={prueba} disabled />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <label htmlFor="hashPrevio"> Hash Previo:</label>
                                        <input type="text" id="hashPrevio" className="form-control" value={hashPrevio} disabled />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <label htmlFor="hash"> Hash:</label>
                                        <input type="text" id="hash" className="form-control" value={hash} disabled />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div className="container">
                    <h3>Archivos del Bloque</h3>
                        <a href="/inicio/mempool" className="btn btn-warning">
                            <img src="https://img.icons8.com/external-mixed-line-solid-yogi-aprelliyanto/24/000000/external-pickaxe-construction-mixed-line-solid-yogi-aprelliyanto.png" />
                        </a>
                        <button type="button" hidden={hidden} className="btn btn-info" onClick={downloadFiles}>Download Files</button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Masive</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Extension</th>
                                    <th scope="col">Fecha Subido</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((item: any) => (
                                    <tr key={item.split('$')[0]}>
                                        <td>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" onChange={($event) => handleOnChange($event, item)} type="checkbox" id="flexSwitchCheckDefault" />
                                            </div>
                                        </td>
                                        <td>{item.split('$')[1]}</td>
                                        <td>{item.split('$')[2]}</td>
                                        <td>{item.split('$')[3]}</td>
                                        <td>{item.split('$')[4]}</td>
                                        <td>
                                            <button type="submit" className="btn btn-info" title="Download" onClick={() => { downloadFile(item.split('$')[5], item.split('$')[2], item.split('$')[3]); }}>
                                                <img src="https://img.icons8.com/material/24/000000/downloading-updates--v1.png" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </div>
        </CardBlock>

    )
}
