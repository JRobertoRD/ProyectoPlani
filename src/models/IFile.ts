export interface IFile {
    id?: Id
    owner: string
    extension: string
    create: Date
    size: number
    base64: string
  }
  
  export interface Id {
    timestamp: number
    machine: number
    pid: number
    increment: number
    creationTime: string
  }