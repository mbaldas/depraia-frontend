import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Grid from "@material-ui/core/Grid";

import NavBar from "../../components/NavBar/NavBar";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PraiaService from "../../service/PraiaService";
import bg from "../../assets/praia.jpg";
import MomentUtils from "@date-io/moment";
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { Praia } from "../../model/Praia";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import moment from "moment";
import { useCommonStore } from "../../hooks";
import { useLocalStorage } from "../../hooks/localStorage";
import AgendaService from "../../service/AgendaService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    border: "none",
    backgroundColor: "#fe9752",
    "&:hover": {
      backgroundColor: "#fe9752"
    }
  },
  text: {
    color: "#e8e8e8"
  },
  form: {
    backgroundColor: "#fff",
    boxShadow: "5px 5px 10px -1px rgba(0,0,0,0.63)",
    padding: "40px"
  },
  mainpage: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat"
  }
}));

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [praias, setPraias] = useState<Praia[]>([]);
  const [selectedPraia, setSelectedPraia] = useState<Praia | null>();
  const [actualUser, setActualUser] = useLocalStorage("name", "");
  const [agendas, setAgendas] = useState<any[]>([]);

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
      data: new Date(),
      praia: "",
      user: ""
    },
    onSubmit: (values) => {
      AgendaService.putReserva(values, selectedPraia!, actualUser);
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
      <section className={classes.mainpage}>
        <Grid container spacing={3}>
          <Grid
            item
            xl={12}
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <Grid item style={{ padding: 20 }}>
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
              </Grid>
              <Grid item style={{ padding: 20 }}>
                <DatePicker
                  disableToolbar
                  label="Que dia vamos a praia?"
                  format="DD/MM/yyyy"
                  autoOk={true}
                  disabled={selectedPraia === (null || undefined)}
                  value={formik.values.data}
                  onChange={(value) => {
                    formik.setFieldValue("data", value);
                  }}
                  shouldDisableDate={disableDates}
                  rightArrowIcon
                />
              </Grid>
              <Grid item style={{ padding: 20 }}>
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.button}
                >
                  <span className={classes.text}>RESERVE JÁ</span>
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </section>
    </MuiPickersUtilsProvider>
  );
};

export default MainPage;
