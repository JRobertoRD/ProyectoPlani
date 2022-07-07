export class SessionStorage {

  async saveData(name:string, value:any) {
    await sessionStorage.setItem(name, value);
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