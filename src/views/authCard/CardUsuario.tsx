import { ReactElement } from "react";
import { NavBar } from "../../components/NavBar/NavBar";

interface Props{
    children:ReactElement
}

export function CardUsuario(props:Props){

    return(
        <>
        
        <div className="form-container">
        </div><div className="container mt-4rem mycontainer">
                <div className="d-flex justify-content-center">
                    <div className="col-md-4 col-10">
                        <div className="shadow-sm rounded p-3">
                            <div className="row">
                                <div>
                                    <div className="col-xl-12 col-md-12">
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div></>
    );

}