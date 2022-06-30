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

    public alert(titleD:string, textD:string, iconD:any, timerD:number){
        Swal.fire({
            title: titleD,
            text: textD,
            icon: iconD,
            showConfirmButton: false,
            timer: timerD
        })
    }

    public alertBotton(titleD:string, textD:string, iconD:any){
        Swal.fire({
            title: titleD,
            text: textD,
            icon: iconD,
            showConfirmButton: true,
        })
    }

    public alertwaiting() {

        Swal.fire({
            title: 'Espere por favor!',
            html: 'Ejecutando orden',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading()
            },
        });


    }

    public alertwaitingPer(body: string) {

        Swal.fire({
            title: 'Espere por favor!',
            html: body,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading()
            },
        });


    }

    public closeSwal(){
        Swal.close();
    }

    public alertwaitingM(title: string, html: string) {

        Swal.fire({
            title: title,
            html: html,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading()
                Swal.increaseTimer(1000)
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




