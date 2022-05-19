export interface Config {
    id: Id
    nombre: string
    numDocumentoPB: string
  }
  
  export interface Id {
    timestamp: number
    machine: number
    pid: number
    increment: number
    creationTime: string
  }
  