export class Validations {
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

}