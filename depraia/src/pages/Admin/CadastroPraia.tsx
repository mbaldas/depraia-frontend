import "./index.scss";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import MenuAdmin from "./MenuAdmin";
import NavBar from "../../components/NavBar/NavBar";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      }
    }
  })
);

export default function CadastroPraia() {
  const classes = useStyles();

  

  return (
    <>
      <NavBar />
     <div className="container--admin">
     <MenuAdmin />
    <form className={classes.root} noValidate autoComplete="off">
        <div className="right--admin">
          <div className="container--right__admin">
            <h1 className="font--black">Cadastro de Praia</h1>
            <form>
              <div className="form-group">
                <TextField label="Nome"/>
              </div>
              <div className="form-group">
                <TextField label="CEP"/>
              </div>
              <div className="form-group">
                <TextField label="Rua"/>
              </div>
              <div className="form-group">
                <TextField label="Bairro"/>
              </div>
              <div className="form-group">
                <TextField label="Cidade"/>
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
      </form>
      </div>
    </>
  );
}
