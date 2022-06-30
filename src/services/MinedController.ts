import axios from "axios";


import { MINE_FILE } from '../assets/API/ApiLinks'

export class MinedController {

    public async mineFiles(owner: string) {
        return await axios.get(MINE_FILE+'getBlockHash/'+owner);
    }
}