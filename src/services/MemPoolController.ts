import axios from "axios";
import { Config } from "../models/IConfig";


import { GET_MEMPOOL, ADD_MEMPOOL, DELETE_MEMPOOL, GET_FILE_MEMPOOL } from '../assets/API/ApiLinks'
import { IFile } from "../models/IFile";

export class MemPoolController {

    public async getMemPool() {
        return await axios.get(GET_MEMPOOL);
    }

    public async addToMemPool(listFiles: IFile[]) {
        for (let file of listFiles) { 
            await axios.post(ADD_MEMPOOL, file);
        }
        return true;
    }

    public async deleteFromMemPool(id: string) {
        return await axios.delete(DELETE_MEMPOOL + id);
    }

    public async downloadFile(id: string){
        return await axios.get(GET_FILE_MEMPOOL + id);
    }

}
