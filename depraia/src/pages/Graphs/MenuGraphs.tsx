import "../Admin/index.scss";
import { Link } from "react-router-dom";

export default function MenuGraphs() {
  return (
    <>
      <div className="left--admin">
        <Link to={"/grafico-praia"} className="container--left__admin">
          Pessoas por praia
        </Link>
        <Link to={"/grafico-quiosque"} className="container--left__admin">
          Quiosques por praia
        </Link>
      </div>
    </>
  );
}
