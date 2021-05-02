import "./index.scss";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import NavBar from "../../components/NavBar/NavBar";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PraiaService from "../../service/PraiaService";
import AgendaService from "../../service/AgendaService";
import { Praia } from "../../model/Praia";
import NewAgenda from "../../model/NewAgenda";
import MenuAdmin from "./MenuAdmin";
import moment from "moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CadastroAgenda() {
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

  const disableDates = (day: MaterialUiPickersDate) => {
    let retorno;
    const allowedDates = praias[0]?.agendas.map((a) => {
      return moment(a.data).startOf("day").valueOf();
    });
    allowedDates?.includes(day?.valueOf()!)
      ? (retorno = true)
      : (retorno = false);

    return retorno;
  };

  const formik = useFormik({
    initialValues: {
      data: new Date(),
      vagas: 0
    },
    onSubmit: async (values) => {
      const agenda = new NewAgenda(
        moment(values.data).format("DD/MM/YYYY"),
        praias[0],
        values.vagas
      );
      const retorno = await AgendaService.createAgenda(agenda);
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
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <NavBar />
      <div className="container--admin">
        <MenuAdmin />
        <div className="right--admin">
          <div className="container--right__admin">
            <h1 className="font--black">Cadastro de Agenda</h1>
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
              <DatePicker
                required
                minDate={new Date()}
                disableToolbar
                label="Selecione a data"
                format="DD/MM/yyyy"
                autoOk={true}
                disabled={selectedPraia === (null || undefined)}
                value={formik.values.data}
                onChange={(value) => {
                  formik.setFieldValue("data", value);
                }}
                shouldDisableDate={disableDates}
              />
              <div className="form-group">
                <TextField
                  required
                  id="vagas"
                  name="vagas"
                  type="number"
                  label="Número de vagas"
                  value={formik.values.vagas}
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
    </MuiPickersUtilsProvider>
  );
}
