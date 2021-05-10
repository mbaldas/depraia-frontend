import "./index.scss";
import { Link } from "react-router-dom";

export default function MenuMinhasReservas() {
  return (
    <>
      <div className="left--reservas">
        <Link to={"/proximas-reservas"} className="container--left__reservas">
          Minhas Reservas
        </Link>
        {/* <Link to={"/historico-reservas"} className="container--left__reservas">
          Histórico
        </Link> */}
      </div>
    </>
  );
}
