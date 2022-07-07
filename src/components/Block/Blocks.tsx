
import { useEffect, useState } from "react";


import { Alertas } from "../../assets/Alertas/alertas";
import { SessionStorage } from "../../assets/SessionStorage/sessionStorage";
import { BlockController } from "../../services/BlockController";
import { CardBlocks } from "../../views/authCard/CardBlocks";


const alerta = new Alertas();
const session = new SessionStorage();
export function Blocks() {

    const [listBlocks, setListBlocks] = useState([]);

    useEffect(() => {
        getBlocks();
    }, []);

    async function getBlocks() {
        const api = new BlockController();
        alerta.alertwaitingPer('Buscando bloques de: ' + session.getData("userName"));
        const response = (await api.getBlockFilter(session.getData("userName"))).data
        setListBlocks(response)
        alerta.closeSwal();
    };

    return (

        <CardBlocks>
            <div className="container">
                <a href="/inicio/mempool" className="btn btn-warning">
                    <img src="https://img.icons8.com/external-mixed-line-solid-yogi-aprelliyanto/24/000000/external-pickaxe-construction-mixed-line-solid-yogi-aprelliyanto.png" />
                </a>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Owner</th>
                            <th scope="col">Prueba</th>
                            <th scope="col">Milisegundos</th>
                            <th scope="col">Fecha Minado</th>
                            <th scope="col">Archivos</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBlocks.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.owner}</td>
                                <td>{item.prueba}</td>
                                <td>{item.millisegundos}</td>
                                <td>{item.fechaMinado.split('T')[0]}</td>
                                <td>{item.documentos.length}</td>
                                <td>
                                    <a href={"/inicio/block/"+item.id} className="btn btn-info" title="Details">
                                        <img src="https://img.icons8.com/material/24/000000/show-property.png"/>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardBlocks>
    );
}