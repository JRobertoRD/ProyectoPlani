export function NavBar(){



    return(

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/inicio">Inicio</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#"> <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/inicio/showConfig">Ver Configuracion</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/inicio/addConfig">Agregar Configuracion</a>
                    </li>
                </ul>
            </div>
        </nav>

    );

};

