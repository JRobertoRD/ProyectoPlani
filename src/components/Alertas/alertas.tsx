import Swal from "sweetalert2";


export class Alertas {

    public alertSuccessRegistro() {


        Swal.fire({
            title: 'Regitro Completado',
            text: 'Do you want to continue',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        })

    }
    public alertFailRegistro() {

        Swal.fire({
            title: 'Error!',
            text: 'Se requiere completar los campos',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })


    }

    public alertwaiting() {

        Swal.fire({
            title: 'Espere por favor!',
            html: 'Ejecutando orden',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading()
            },
        });


    }
    public alertFailServer() {

        Swal.fire({
            title: 'Error!',
            text: 'Disculpe, error en el servidor',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })


    }

    public alertFailLogin() {

        Swal.fire({
            title: 'Error!',
            text: 'Datos incorrectos!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })


    }

    public alertWelcomeUser() {


        Swal.fire({
            title: 'Buenvenido!!',
            text: 'Preparando el Sistema...',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        })

    }

}




