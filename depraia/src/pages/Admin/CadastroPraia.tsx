import "./index.scss";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MenuAdmin from "./MenuAdmin";
import NavBar from "../../components/NavBar/NavBar";
import { useFormik } from "formik";
import  NewPraia  from "../../model/NewPraia";
import Endereco from "../../model/Endereco";
import PraiaService from "../../service/PraiaService";



export default function CadastroPraia() {
  const formik = useFormik({
    initialValues: {
      nome: "",
      rua: "",
      bairro: "",
      cidade: "",
      cep: ""
    },
    onSubmit: (values) => {
      const endereco = new Endereco(
        values.rua,
        values.bairro,
        values.cidade,
        values.cep
      );
      const praia = new NewPraia(
        values.nome,
        endereco
      );
      PraiaService.createPraia(praia);

    }
  });


  return (
    <>
      <NavBar />
      <div className="container--admin">
        <MenuAdmin />
          <div className="right--admin">
            <div className="container--right__admin">
              <h1 className="font--black">Cadastro de Praia</h1>
              <form onSubmit={formik.handleSubmit}> 
              <TextField
                id="nome"
                name="nome"
                label="Nome"
                placeholder="Ex. Praia de Icaraí"
                onChange={formik.handleChange}
              />
               <div className="form-group">
              <TextField
                id="rua"
                name="rua"
                label="Rua"
                placeholder="Ex. Avenida Amaral Peixoto"
                value={formik.values.rua}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="bairro"
                name="bairro"
                label="Bairro"
                placeholder="Ex. Centro"
                value={formik.values.bairro}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="cidade"
                name="cidade"
                label="Cidade"
                placeholder="Ex. Niteroi"
                value={formik.values.cidade}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="cep"
                name="cep"
                label="CEP"
                placeholder="Ex. 123456778"
                value={formik.values.cep}
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
