function Carrusel() {
    return (
        <div id="carruselVeterinaria" className="carousel slide" data-bs-ride="carousel">
            {/* indicadores (puntitos) */}
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carruselVeterinaria"
                    data-bs-slide-to="0"
                    className="active"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carruselVeterinaria"
                    data-bs-slide-to="1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carruselVeterinaria"
                    data-bs-slide-to="2"
                ></button>
            </div>

            {/* imagenes */}
            <div className="carousel-inner">

                {/* Diapositiva 1 */}
                <div className="carousel-item active">
                    <img
                        src="src/assets/images/atencion.jpeg"
                        className="d-block w-100"
                        alt="atencion"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-70 rounded p-3">
                        <h3>Cuidando a tus mascotas de Rancagua desde 2009</h3>
                        <p>Atencion medica especializada</p>
                    </div>
                </div>
                {/* Diapositiva 2 */}
                <div className="carousel-item">
                    <img
                        src="src/assets/images/capacitados.jpeg"
                        className="d-block w-100"
                        alt="capacitacion"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                        <h3>Personal altamente capacitado</h3>
                        <p>Contamos con profesionales especializados en el cuidado de tus mascotas</p>
                    </div>
                </div>
                
                {/* Diapositiva 3 */}
                <div className="carousel-item">
                    <img
                        src="src/assets/images/cuidadoMascota.jpeg"
                        className="d-block w-100"
                        alt="cuidadoMascota"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                        <h3>Comprometidos con el bienestar de tus mascotas</h3>
                        <p>Brindamos un cuidado integral para garantizar la salud y felicidad de tus animales</p>
                    </div>
                </div>

            </div>

            {/* 3. Botones para avanzar / retroceder */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carruselVeterinaria" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Anterior</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carruselVeterinaria" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
        </div>
    );
}
export default Carrusel;

