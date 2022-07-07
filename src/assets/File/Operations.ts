import { IFile } from "../../models/IFile";
import { NAME_COMPRESSED, EXTENSION_COMPRESSED } from "../../assets/Download/Download"

export class Operations {
    extensionsValid: string[] = ["txt", "docx", "xlsx", "pptx", "pdf", "jpg", "png"];

    validateExtension(extension:string) {
        for (let ext of this.extensionsValid) { 
            if(ext == extension){
                return true;
            }
        }
        return false;
    }

    getExtensionsValid(){
        let result = "";
        for (let ext of this.extensionsValid) { 
            result += "." + ext + "\n";
        }
        return result;
    }

    async downloadFile(base64: string, name: string, extension: string) {
        var fileDownload = require('js-file-download');
        let blob = this.convertStringToBlob(base64, extension)
        fileDownload(blob, name + '.' + extension);
    }

    async downloadMavise(listFile: IFile[]) {
        var zipDependicie = require('jszip');
        var saveAs = require('file-saver')
        var zip = new zipDependicie();
        for (let fileItem of listFile) {
            console.log(fileItem);
            let file = new File([this.convertStringToBlob(fileItem.base64, fileItem.extension)], fileItem.name, null);
            zip.file(fileItem.name + '.' + fileItem.extension, file);
        }
        zip.generateAsync({ type: "blob" }).then(content => {
            saveAs(content, NAME_COMPRESSED + '.' + EXTENSION_COMPRESSED);
        });
    }

    convertStringToBlob(content: string, extension: string) {
        const byteString = window.atob(content);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([int8Array], { type: extension });
    }

}