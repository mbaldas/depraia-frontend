import "./index.scss";
import { Link } from "react-router-dom";

export default function MenuMeusProdutos() {
  return (
    <>
      <div className="left--produtos">
        <Link to={"/meus-produtos"} className="container--left__produtos">
          Meus Produtos
        </Link>
        <Link to={"/cadastro-produtos-ambulante"} className="container--left__produtos">
          Cadastrar Produtos
        </Link>
      </div>
    </>
  );
}
