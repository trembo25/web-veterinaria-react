import Carrusel from "../components/molecules/Carrusel";
import Header from "../components/organisms/Header";
import Servicios from "../components/organisms/Servicios";
import "../App.css";
function Inicio() {
  return (
    <div className="inicio-body">
        <Header/>
        <Carrusel/>
        <Servicios/>

    </div>
  );
}

export default Inicio;