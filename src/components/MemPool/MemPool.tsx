import { useEffect, useState, MouseEvent } from "react";
import { useLocation } from "wouter";
import { Id, IFile } from '../../models/IFile';
import { MemPoolController } from "../../services/MemPoolController";
import { CardMemPool } from "../../views/authCard/CardMemPool";

export interface State {
    listMemPool: IFile[]
}

export function MemPool() {

    const [state, setState] = useState<State>({
        listMemPool: []
    });

    useEffect(() => {
        getMemPool()
    }, []);

    const getMemPool = async () => {
        const api = new MemPoolController();
        const response = (await api.getMemPool()).data
        console.log(response);
        //setState({ listMemPool: response });

    };

    return (

        <CardMemPool>
            <div>
                <a href="/inicio/mempool/add">
                    <button type="button" className="btn btn-success">Agregar</button>
                </a>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Extension</th>
                            <th scope="col">Date</th>
                            <th scope="col">Size</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.listMemPool.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.owner}</td>
                                <td>{item.extension}</td>
                                <td>{item.create}</td>
                                <td>{item.size}</td>
                                <td>Elimianar y descargar</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardMemPool>
    );
}
