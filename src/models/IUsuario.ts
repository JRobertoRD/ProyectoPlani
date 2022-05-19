export interface IUsuario {
    id?: Id
    nombre: string
    contrasenia: string
  }
  
  export interface Id {
    timestamp: number
    machine: number
    pid: number
    increment: number
    creationTime: string
  }
  