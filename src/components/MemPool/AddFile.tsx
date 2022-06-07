import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { AuthCard } from "../../views/authCard/AuthCard";
import { IFile } from "../../models/IFile";
import { Alertas } from "../../assets/Alertas/alertas";
import { MemPoolController } from "../../services/MemPoolController";
import { SessionStorage } from "../../assets/SessionStorage/sessionStorage"
import { DateFormat } from "../../assets/Date/DateFormat"
import { Validations } from "../../assets/File/Validations"

const alerta = new Alertas();
const session = new SessionStorage();
const date = new DateFormat();
const validations = new Validations();

export interface State {
    modalId: string;
    reload?: any
    data: IFile | null,
    action: null
}
export function AddFile() {

    const navigate = useNavigate();
    let fileList: IFile[];
    let invalidExtension = false;
    const [state, setState] = useState<State>();

    useEffect(() => {
        if (session.getData('userName') == null) {
            navigate("/Login")
        }
    }, [state]);

    const onChange = (e) => {
        fileList = new Array<IFile>();
        Array.from(e.target.files).forEach(file => {
            if (validations.validateExtension(file['name'].split(".")[1])) {
                let fileNew: IFile = {
                    _id: null,
                    owner: session.getData("userName"),
                    name: file['name'].split(".")[0],
                    extension: file['name'].split(".")[1],
                    create: date.getDateWithFormat(),
                    size: file['size'],
                    base64: ''
                };
                encodeBase64(file, fileNew);
                fileList.push(fileNew);
            } else {
                invalidExtension = true;
            }
        });
        if(invalidExtension){
            alerta.alertBotton('Error!', 'Extensiones de documento permitidas:\n' + validations.getExtensionsValid(), 'error');
        }
    };

    function encodeBase64(file: any, fileNew: IFile) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            fileNew.base64 = reader.result.toString();
        };
    }

    async function handleSubmitSave() {
        if (fileList != null) {
            if (fileList.length > 0) {
                let response: any;
                alerta.alertwaiting();
                const api = new MemPoolController();
                response = await api.addToMemPool(fileList);
                if (response) {
                    alerta.alert('Exitoso', 'Archivos Gardados', 'success', 3000);

                    navigate("/inicio/mempool")
                } else {
                    alerta.alert('Error!', 'Intente nuevamente!!', 'error', 3000);
                }
            }else{
                alerta.alert('Error!', 'Formatos no validos', 'error', 3000);
            }
        } else {
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