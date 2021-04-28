import "./index.scss";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MenuAdmin from "./MenuAdmin";
import NavBar from "../../components/NavBar/NavBar";
import { useFormik } from "formik";
import Produto from "../../model/Produto";
import ProdutoService from "../../service/ProdutoService";


export default function CadastroProduto() {
  const formik = useFormik({
    initialValues: {
      nome: "",
      descricao: "",
      preco: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      const produto = new Produto(
        values.nome,
        values.descricao,
        values.preco
      );
      ProdutoService.createProduto(produto);
    }
  
  });


  return (
    <>
      <NavBar />
      <div className="container--admin">
        <MenuAdmin />
          <div className="right--admin">
            <div className="container--right__admin">
              <h1 className="font--black">Cadastro de Produto</h1>
              <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
              <TextField
                id="nome"
                name="nome"
                label="Nome"
                placeholder="Ex. Empada"
                onChange={formik.handleChange}
              />
              </div>
              <div className="form-group">
              <TextField
                id="descricao"
                name="descricao"
                label="Descrição"
                value={formik.values.descricao}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="preco"
                name="preco"
                label="Preço"
                value={formik.values.preco}
                onChange={formik.handleChange}
              />
            </div>
                <Button
                  variant="contained"
                  className="button--cadastro"
                  type="submit"
                >
                  <span className="button--text">CADASTRAR</span>
                </Button>
              </form>
            </div>
          </div>
      </div>
    </>
  );
}
