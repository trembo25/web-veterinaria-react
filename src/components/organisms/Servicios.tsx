import CardServicio from "../molecules/CardServicio";

// lista copn la informacion de los servicio 
const serviciosData = [
    {
        id: 1,
        titulo: "Consulta Veterinaria",
        descripcion: "Ofrecemos consultas veterinarias para diagnosticar y tratar enfermedades en tus mascotas.",
        imagen: "src/assets/images/atencion.jpeg"
    },
    {
        id: 2,
        titulo: "Vacunación",
        descripcion: "Protege a tus mascotas con nuestro servicio de vacunación, asegurando su salud y bienestar.",
        imagen: "src/assets/images/vacuancion.jpeg"
    },
    {
        id: 3,
        titulo: "Cirugía Menor",
        descripcion: "Realizamos procedimientos quirúrgicos seguros y efectivos para el cuidado de tus mascotas.",
        imagen: "src/assets/images/capacitados.jpeg"
    },
    {
        id: 4,
        titulo: "Baño y Peluquería",
        descripcion: "Manten a tus mascotas limpias y con estilo con nuestro servicio de baño y peluquería.",
        imagen: "src/assets/images/peluqueria.jpeg"
    }
    
    
];

function Servicios() {
    return (
        <section id="servicios" className="seccion-servicios">
            {/* Titulo de la seccion*/}
            <h2 className="titulo-seccion">Nuestros Servicios</h2>

            {/*rejilla tarjeta*/}
            <div className="servicios-grid">
                {serviciosData.map((servicio) => (
                    <CardServicio
                        key={servicio.id}
                        titulo={servicio.titulo}
                        descripcion={servicio.descripcion}
                        imagen={servicio.imagen}
                    />
                ))}
            </div>
        </section>

    );
}
export default Servicios;