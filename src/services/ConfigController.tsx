import axios from "axios";
import { Config } from "../models/IConfig";

const API_CONFIG_URL = "https://localhost:44320/api/config/";

export class ConfigController {

    /*export function getAllConfig(){
        fetch(API_CONFIG_URL)
        .then((result) => result.json())
        .then((data) => console.log(data));
    }
    */
    public async getAllConfig() {
        return await axios.get(API_CONFIG_URL);
    }
    public async addConfig(conf:Config) {
        return await axios.post(API_CONFIG_URL, conf);
    }

    public async deleteConfig(id:string) {
        return await axios.delete(API_CONFIG_URL+id);
    }

}

