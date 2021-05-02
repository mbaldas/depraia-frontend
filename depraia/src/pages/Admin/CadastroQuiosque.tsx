import "./index.scss";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import NavBar from "../../components/NavBar/NavBar";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PraiaService from "../../service/PraiaService";
import QuiosqueService from "../../service/QuiosqueService";
import { Praia } from "../../model/Praia";
import NewQuiosque from "../../model/NewQuiosque";
import MenuAdmin from "./MenuAdmin";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CadastroQuiosque() {
  const [praias, setPraias] = useState<Praia[]>([]);
  const [selectedPraia, setSelectedPraia] = useState<Praia | null>();
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
      const quiosque = new NewQuiosque(values.nome, praias[0]);
      const retorno = await QuiosqueService.createQuiosque(quiosque);
      if (retorno.status == 200) {
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

  useEffect(() => {
    async function fetchPraias() {
      const response = await PraiaService.getAll();
      setPraias(response);
    }
    fetchPraias();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container--admin">
        <MenuAdmin />
        <div className="right--admin">
          <div className="container--right__admin">
            <h1 className="font--black">Cadastro de Quiosque</h1>
            <form onSubmit={formik.handleSubmit}>
              <Autocomplete
                id="praia"
                onChange={(e, value) => {
                  formik.setFieldValue("praia", value);
                  setSelectedPraia(value);
                }}
                options={praias}
                getOptionLabel={(option: any) => option.nome}
                style={{ width: 300 }}
                renderInput={(params: any) => (
                  <TextField
                    required
                    {...params}
                    name="praia"
                    label="Selecione sua Praia"
                    variant="outlined"
                  />
                )}
              />
              <div className="form-group">
                <TextField
                  required
                  id="nome"
                  name="nome"
                  label="Nome do quiosque"
                  value={formik.values.nome}
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
