import "./index.scss";
import MenuAdmin from "./MenuMinhasReservas";
import NavBar from "../../components/NavBar/NavBar";


export default function ProximasReservas() {
  


  return (
    <>
      <NavBar />
      <div className="container--reservas">
        <MenuAdmin />
          <div className="right--reservas">
            <div className="container--right__reservas">
              <h1 className="font--black">Próximas Reservas</h1>
          
            </div>
          </div>
      </div>
    </>
  );
}
