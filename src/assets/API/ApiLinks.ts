const URL:string = 'https://localhost:44320/api/';
const URL_USUARIO:string = URL + 'usuario/';
const URL_CONFIG:string = URL + 'config/';
const URL_MEMPOOL:string = URL + 'mempool/';
const URL_BLOCK:string = URL + 'block/';
const API_USER_URL = "https://localhost:44320/api/usuario/";

export const GET_MEMPOOL: string = URL_MEMPOOL;
export const ADD_MEMPOOL: string = URL_MEMPOOL;
export const DELETE_MEMPOOL: string = URL_MEMPOOL;
export const GET_FILE_MEMPOOL: String = URL_MEMPOOL;
export const AUTENTICAR_USER: string = API_USER_URL + 'autenticar/';

export const MINE_FILE: string = URL_BLOCK;
export const GET_BLOCKS_BY_OWNER: string = URL_BLOCK+'getByOwner/';
export const GET_BLOCK_BY_ID: string = URL_BLOCK+'getById/';