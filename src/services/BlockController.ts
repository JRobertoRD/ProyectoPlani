import axios from "axios";
import { GET_BLOCKS_BY_OWNER, GET_BLOCK_BY_ID } from '../assets/API/ApiLinks'

export class BlockController {

    public async getBlockFilter(owner:string) {
        return await axios.get(GET_BLOCKS_BY_OWNER+owner);
    }

    public async getBlockId(id:string){
        return await axios.get(GET_BLOCK_BY_ID+id)
    }
}