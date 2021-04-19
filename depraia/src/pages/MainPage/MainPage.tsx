import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Grid from "@material-ui/core/Grid";

import NavBar from "../../components/NavBar/NavBar";
import "./index.scss";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PraiaService from "../../service/PraiaService";

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
    backgroundColor: "#000000",
    "&:hover": {
      backgroundColor: "#404040"
    }
  },
  text: {
    color: "#e8e8e8"
  }
}));

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [praias, setPraias] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPraias() {
      const response = await PraiaService.getAll();
      setPraias(response);
    }
    fetchPraias();
  }, []);

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      cpf: "",
      rua: "",
      bairro: "",
      cidade: "",
      cep: "",
      senha: "",
      tipo: 0
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });
  return (
    <>
      <NavBar />
      <section className="mainpage">
        <Grid container spacing={3}>
          <Grid
            item
            xl={12}
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid item style={{ padding: 20 }}>
                <Autocomplete
                  id="combo-box-demo"
                  options={praias}
                  getOptionLabel={(option: any) => option.nome}
                  style={{ width: 300 }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Selecione sua Praia"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item style={{ padding: 20 }}>
                <TextField
                  id="date"
                  label="Dia de ir a praia"
                  type="date"
                  defaultValue="2021-05-16"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
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
    </>
  );
};

export default MainPage;
