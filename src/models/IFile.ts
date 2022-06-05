export interface IFile {
    _id?: any
    owner: string
    name:string
    extension: string
    create: string
    size: number
    base64: string
  }
  
  export interface _Id {
    timestamp: number
    machine: number
    pid: number
    increment: number
    creationTime: string
  }