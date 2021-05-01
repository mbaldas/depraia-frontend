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
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import moment from "moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";



export default function CadastroAgenda() {
  const [praias, setPraias] = useState<Praia[]>([]);
  const [selectedPraia, setSelectedPraia] = useState<Praia | null>();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [inputValue, setInputValue] = React.useState(moment().format("YYYY-MM-DD"));
  const [date, setDate] = React.useState('');

 
  const handleDateChange = (date: any, value: any) => {
    console.log(date, value);
    setSelectedDate(date);
    setInputValue(value);
    console.log(date, inputValue);
  };

  const dateFormatter = (str: string) => {
    console.log(str);
    return str;
  };

  const disableDates = (day: MaterialUiPickersDate) => {
    let retorno;
    const allowedDates = selectedPraia?.agendas.map((a) => {
      return moment(a.data).startOf("day").valueOf();
    });
    allowedDates?.includes(day?.valueOf()!)
      ? (retorno = false)
      : (retorno = true);
    return retorno;
  };


  const formik = useFormik({
    initialValues: {
      data: "",
      vagas: 0
    },
    onSubmit: (values) => {
      console.log(values);
      const agenda = new NewAgenda(
        date,
        praias[0],
        values.vagas
      );
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
                 <KeyboardDatePicker
                  disableToolbar
                  label="Data da agenda"
            
                  autoOk={true}
                  disabled={selectedPraia === (null || undefined)}
                  showTodayButton={true}
                  value={selectedDate}
                  format="YYYY-MM-DD"
                  inputValue={inputValue}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  rifmFormatter={dateFormatter}
                
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

