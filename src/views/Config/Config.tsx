import { config } from "process";
import * as React from "react";
import { Config } from '../../models/IConfig'
import { ConfigController } from '../../services/ConfigController'

export default class Configuration extends React.Component<Config, {}> {
    constructor(props: Config){
        super(props);
        this.state = {
            listConfig: [],
        };
        const api = new ConfigController();
        //this.handleChange = this.handleChange.bind(this);
    }

   getConfig = async () => {
        const api = new ConfigController();
        const response = (await api.getAllConfig()).data
        this.setState({ listConfig: response });

    };

    render() {
        return (
            <div>
                
            </div>
        );
    }
} 