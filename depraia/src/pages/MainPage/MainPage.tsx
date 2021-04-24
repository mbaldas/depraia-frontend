import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Grid from "@material-ui/core/Grid";

import NavBar from "../../components/NavBar/NavBar";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PraiaService from "../../service/PraiaService";
import bg from "../../assets/praia.jpg";

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
      data: "",
      praia: ""
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });
  return (
    <>
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
                  onChange={(e, value) => formik.setFieldValue("praia", value)}
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
                <TextField
                  value={formik.values.data}
                  onChange={formik.handleChange}
                  id="data"
                  name="data"
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
