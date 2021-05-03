import React from "react";
import "./index.scss";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MenuAdmin from "./MenuAdmin";
import NavBar from "../../components/NavBar/NavBar";
import { useFormik } from "formik";
import NewProduto from "../../model/NewProduto";
import ProdutoService from "../../service/ProdutoService";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CadastroProduto() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [mensagem, setMensagem] = React.useState("");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      descricao: "",
      preco: 0
    },
    onSubmit: async (values) => {
      const produto = new NewProduto(
        values.nome,
        values.descricao,
        values.preco
      );
      const retorno = await ProdutoService.createProduto(produto);

      if (retorno == "Saved") {
        setOpen(true);
        setMensagem("Cadastro realizado com sucesso!");
        setStatus("success");
      } else {
        setOpen(true);
        setMensagem("Erro no cadastro, tente novamente!");
        setStatus("error");
      }
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
                  required
                  id="nome"
                  name="nome"
                  label="Nome"
                  placeholder="Ex. Empada"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <TextField
                  required
                  id="descricao"
                  name="descricao"
                  label="Descrição"
                  value={formik.values.descricao}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <TextField
                  required
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
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            style={
              status == "success"
                ? { backgroundColor: "green" }
                : { backgroundColor: "red" }
            }
          >
            {mensagem}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
