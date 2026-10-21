// Organismo: presentación de la veterinaria (historia, lista y foto).
// Lo usa la página Nosotros.

// Importamos la imagen para que Vite la incluya también en el build.
import imagenEquipo from "../../assets/images/capacitados.jpeg";

function NosotrosPresentacion() {
  // Reutiliza los estilos del hero del inicio: texto a la izquierda e imagen a la derecha.
  return (
    <section className="hero-seccion">
      <div className="hero-texto">
        <p className="nosotros-etiqueta">Sobre nosotros</p>

        <h2>¿Por qué elegir Veterinaria San Marcos?</h2>

        <p>
          Desde 2009, Veterinaria San Marcos atiende a las familias y sus
          mascotas en Rancagua, Región del Libertador General Bernardo
          O'Higgins. Contamos con un equipo de 3 médicos veterinarios y 1
          técnico veterinario, atendiendo en promedio 25 pacientes al día con
          dedicación y cercanía.
        </p>

        <ul className="hero-lista">
          <li>
            <span>✓</span> Médicos veterinarios con experiencia comprobada.
          </li>
          <li>
            <span>✓</span> Atención a perros, gatos, conejos y aves.
          </li>
          <li>
            <span>✓</span> Consulta general, vacunación, cirugía menor,
            desparasitación y control de peso.
          </li>
        </ul>
      </div>

      <div className="hero-imagen">
        <img
          src={imagenEquipo}
          alt="Dos veterinarios atendiendo a un perro en la clínica"
        />
      </div>
    </section>
  );
}

export default NosotrosPresentacion;