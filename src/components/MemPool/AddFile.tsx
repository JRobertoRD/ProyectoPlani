import { useNavigate } from "react-router-dom";
import { AuthCard } from "../../views/authCard/AuthCard";

import { useState } from "react";
import { IFile, _Id } from "../../models/IFile";
import { Alertas } from "../../components/Alertas/alertas";
import { MemPoolController } from "../../services/MemPoolController";
import { SessionStorage } from "../../assets/SessionStorage/sessionStorage"
import { DateFormat } from "../../assets/Date/DateFormat"

const alerta = new Alertas();
const session = new SessionStorage();
const date = new DateFormat();

export interface State {
    modalId: string;
    reload?: any
    data: IFile | null,
    action: null
}
export function AddFile() {

    const navigate = useNavigate();
    let fileList: IFile[];

    const onChange = (e) => {
        fileList = new Array<IFile>();
        Array.from(e.target.files).forEach(file => {
            let fileNew: IFile ={
                _id: null,
                owner: session.getData("userName"),
                name: file['name'].split(".")[0],
                extension: file['name'].split(".")[1],
                create: date.getDateWithFormat(),
                size: file['size'],
                base64:''
            };
            encodeBase64(file, fileNew);
            fileList.push(fileNew);
        });
    };

    function encodeBase64(file:any, fileNew:IFile){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            fileNew.base64 = reader.result.toString();
        };
    }

    async function handleSubmitSave() {
        if(fileList != null){
            let response: any;
            alerta.alertwaiting();
            const api = new MemPoolController();
            response = await api.addToMemPool(fileList);
            if (response) {
                alerta.alert('Exitoso', 'Archivos Gardados', 'success', 3000);
    
                navigate("/inicio/mempool")
            }else{
                alerta.alert('Error!', 'Intente nuevamente!!', 'error', 3000);
            }
        }else{
            alerta.alert('Error!', 'Seleccione archivo(s) primero', 'error', 3000);
        }
        //reload()
    }

    return (


        <AuthCard>
            <div>
            
                <div className="mt-3 mb-3 text-center">
                    <h6>Agregar Archivo(s)</h6>
                </div>

                <div className="mb-2 p-1 d-flex border rounded">
                    <input
                        autoFocus
                        accept="image/png, image/jpeg, .pdf, .txt, .docx, .xlsx, .pptx"
                        className="form-control txt-input"
                        id="files"
                        name="files"
                        type="file"
                        multiple
                        onChange={onChange}
                    />
                </div>

                <div className="row d-flex justify-content-between mt-3 mb-2">

                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmitSave}>
                        Agregar
                    </button>
                </div>

                </div>
            
        </AuthCard>




    );


}