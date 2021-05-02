import React, { useEffect, useState } from "react";
import "./index.scss";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MenuAdmin from "./MenuAdmin";
import NavBar from "../../components/NavBar/NavBar";
import { useFormik } from "formik";
import NewPraia from "../../model/NewPraia";
import Endereco from "../../model/Endereco";
import PraiaService from "../../service/PraiaService";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import NewAmbulante, { AmbulanteAsUser, PraiaId } from "../../model/Ambulante";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Praia } from "../../model/Praia";
import AmbulanteService from "../../service/AmbulanteService";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CadastroAmbulante() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [mensagem, setMensagem] = React.useState("");
  const [selectedPraia, setSelectedPraia] = useState<Praia | null>();
  const [praias, setPraias] = useState<Praia[]>([]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      cpf: "",
      email: "",
      rua: "",
      bairro: "",
      cidade: "",
      cep: "",
      tipo: 2,
      praia: ""
    },
    onSubmit: async (values) => {
      const endereco = new Endereco(
        values.rua,
        values.bairro,
        values.cidade,
        values.cep
      );
      const praia: PraiaId = {
        id: selectedPraia?.id!
      };
      const ambulanteAsUser: AmbulanteAsUser = {
        cpf: values.cpf,
        email: values.email,
        endereco: endereco,
        nome: values.nome,
        tipo: 3
      };
      const ambulante = new NewAmbulante(ambulanteAsUser, praia);

      const retorno = await AmbulanteService.createAmbulante(ambulante);

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

  useEffect(() => {
    async function fetchPraias() {
      debugger;
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
            <h1 className="font--black">Cadastro de Ambulante</h1>
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
              <TextField
                required
                id="nome"
                name="nome"
                label="Nome"
                placeholder="Ex. João"
                onChange={formik.handleChange}
              />
              <div className="form-group">
                <TextField
                  required
                  id="cpf"
                  name="cpf"
                  label="CPF"
                  placeholder="Ex. 10577785412"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Ex. teste@teste.com"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <TextField
                  required
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
                  required
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
                  required
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
                  required
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
