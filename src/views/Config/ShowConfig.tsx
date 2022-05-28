import { useEffect, useState } from "react";
import { Config } from "../../models/IConfig";
import { CardConfig } from '../authCard/CardConfig';
import { getAllConfig } from "../../services/ConfigController";

export interface State {
    listConfig: Config[]
}
export function ShowConfig() {

    const [state, setState] = useState<State>({
        listConfig: []
    });

    useEffect(() => {
        getConfig()
    }, []);

    const getConfig = async () => {
       // const api = new ConfigController();
        const response = (await getAllConfig()).data
        setState({ listConfig: response });

    };

    return (
        <CardConfig>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Detalle</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {state.listConfig.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.numDocumentoPB}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CardConfig>
    );
}

