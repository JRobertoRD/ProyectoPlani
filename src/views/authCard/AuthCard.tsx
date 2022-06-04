
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";

interface Props{
    children:ReactElement
}

export function AuthCard(props:Props){
    const navigate = useNavigate();

    function closeSession() {
        sessionStorage.clear();
        navigate("/Login");

    }

    return(
        <><div className="form-container">
            <NavBar>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" onClick={closeSession}>
                        Cerrar
                    </button>
                </div>
            </NavBar>
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