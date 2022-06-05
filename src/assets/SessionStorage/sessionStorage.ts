export class SessionStorage {

  saveData(name:string, value:any) {
    sessionStorage.setItem(name, value);
  }

  getData(name:string){
    return sessionStorage.getItem(name);
  }

  removeData(name:string) {
    sessionStorage.removeItem(name);
  }

  deleteSessionStorage(){
    sessionStorage.clear();
  }

}