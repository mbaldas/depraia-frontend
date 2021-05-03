import "./index.scss";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import NavBar from "../../components/NavBar/NavBar";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ProdutoService from "../../service/ProdutoService";
import AmbulanteService from "../../service/AmbulanteService";
import { Produto } from "../../model/Produto";
import MenuMeusProdutos from "./MenuMeusProdutos";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CadastrarProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>();
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
      nome: ""
    },
    onSubmit: async (values) => {
      /*const retorno = await AmbulanteService.addProduto(produtos[0].id);
      if(retorno.status == 200) {
        setOpen(true);
        setMensagem("Cadastro realizado com sucesso!");
        setStatus("success");
      }
      else {
        setOpen(true);
        setMensagem("Erro no cadastro, tente novamente!");
        setStatus("error");
      }*/
    }
  });

  useEffect(() => {
    async function fetchProdutos() {
      const response = await ProdutoService.getAll();
      setProdutos(response);
    }
    fetchProdutos();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container--admin">
        <MenuMeusProdutos />
        <div className="right--admin">
          <div className="container--right__admin">
            <h1 className="font--black">Cadastrar Produtos</h1>
            <form onSubmit={formik.handleSubmit}>
              <Autocomplete
                id="produto"
                onChange={(e, value) => {
                  formik.setFieldValue("produto", value);
                  setSelectedProduto(value);
                }}
                options={produtos}
                getOptionLabel={(option: any) => option.nome}
                style={{ width: 300 }}
                renderInput={(params: any) => (
                  <TextField
                    required
                    {...params}
                    name="produto"
                    label="Selecione seu Produto"
                    variant="outlined"
                  />
                )}
              />
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
