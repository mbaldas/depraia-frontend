import "./index.scss";
import { useEffect, useState } from "react";
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
import {
  DatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

export default function CadastroAgenda() {
  const [praias, setPraias] = useState<Praia[]>([]);
  const [selectedPraia, setSelectedPraia] = useState<Praia | null>();

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
    onSubmit: (values) => {
      const agenda = new NewAgenda(
        moment(values.data).format("DD/MM/YYYY"),
        praias[0],
        values.vagas
      );
      console.log(agenda);
      AgendaService.createAgenda(agenda);
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
                      {...params}
                      name="praia"
                      label="Selecione sua Praia"
                      variant="outlined"
                    />
                  )}
                />
                  <DatePicker
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
      </div>
      </MuiPickersUtilsProvider>
  );
}

