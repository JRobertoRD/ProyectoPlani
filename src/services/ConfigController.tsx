import axios from "axios";
import { Config } from "../models/IConfig";

const API_CONFIG_URL = "https://localhost:44320/api/config/";

     export async function getAllConfig() {
        return await axios.get(API_CONFIG_URL);
    }
    export async function addConfig(conf:Config) {
        return await axios.post(API_CONFIG_URL, conf);
    }

    export async function deleteConfig(id:string) {
        return await axios.delete(API_CONFIG_URL+id);
    }



