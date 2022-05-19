import axios from "axios";
import { Config } from "../models/IConfig";

const API_CONFIG_URL = "https://localhost:5001/api/config/";

export class ConfigController {

    /*export function getAllConfig(){
        fetch(API_CONFIG_URL)
        .then((result) => result.json())
        .then((data) => console.log(data));
    }
    */
    public getAllConfig() {
        return axios.get(API_CONFIG_URL);
    }
    public addConfig(conf:Config) {
        return axios.post(API_CONFIG_URL, conf);
    }

}

