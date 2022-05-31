import { useNavigate } from "react-router-dom";
import { AuthCard } from "../../views/authCard/AuthCard";

import { useState } from "react";
import { IFile, Id } from "../../models/IFile";
import { Alertas } from "../../components/Alertas/alertas";
import { addConfig } from "../../services/ConfigController";

const alerta = new Alertas();

export interface State {
    modalId: string;
    reload?: any
    data: IFile | null,
    action: null
}
export function AddFile() {

    const navigate = useNavigate();

    const id: Id = {
        timestamp: 0,
        machine: 0,
        pid: 0,
        increment: 0,
        creationTime: ''
    }

    const [file, setFile] = useState<IFile>({
        id: id,
        owner: '',
        extension:'',
        create: new Date(),
        size: 0,
        base64:''
      })

    let fileList: IFile[];

    const onChange = (e) => {
        Array.from(e.target.files).forEach(file => {
            setFileData('id', id);
            setFileData('owner', '');
            setFileData('extension', getFileExtension(file['name']));
            setFileData('create', new Date());
            setFileData('size', getFileExtension(file['size']));
            setFileData('base64', '');
            console.log('----------------');
        });
    };
    function setFileData(name: string, value: any) {
        setFile({
          ...file,
          [name]: value
        })
      }
    function getFileExtension(filename:string) {
        console.log(filename.lastIndexOf("."));
        return filename.lastIndexOf(".");
    }

    async function handleSubmitSave() {

        let response: any;
        /*
        response = addConfig(config);
        console.log(response.data)

        if (response) {
            alerta.alertSuccessRegistro();

            navigate("/inicio/showConfig")
        }
        clearInputs()
        */
        //reload()
    }

    function clearInputs() {

    }


    return (


        <AuthCard>

            <form autoComplete="off" id="registroForm">
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


            </form>
        </AuthCard>




    );


}