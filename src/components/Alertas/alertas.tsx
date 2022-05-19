import Swal from "sweetalert2";


export class Alertas{

    public  alertSuccessRegistro() {


            Swal.fire({
                title: 'Regitro Completado',
                text: 'Do you want to continue',
                icon: 'success',
                showConfirmButton: false,
                timer:2000
            })

    }
    public alertFailRegistro(){

            Swal.fire({
                title: 'Error!',
                text: 'Se requiere completar los campos',
                icon: 'error',
                showConfirmButton: false,
                timer:2000
            })

    
    }

}



      
