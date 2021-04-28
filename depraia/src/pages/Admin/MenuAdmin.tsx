import "./index.scss";
import { Link } from "react-router-dom";

export default function MenuAdmin() {
  return (
    <>
      <div className="left--admin">
        <Link to={"/cadastro-praia"} className="container--left__admin">
          Cadastro de Praia
        </Link>
        <Link to={"/cadastro-quiosque"} className="container--left__admin">
          Cadastro de Quiosque
        </Link>
        <Link to={"/cadastro-produto"} className="container--left__admin">
          Cadastro de Produto
        </Link>
      </div>
    </>
  );
}
