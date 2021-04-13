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

export default function MainPageAdmin() {
  const classes = useStyles();

  

  return (
    <>
    <NavBar />
    <div className="container--admin">
    <MenuAdmin />
    <form className={classes.root} noValidate autoComplete="off">
        <div className="right--admin">
          <div className="container--right__admin">
            <h1 className="font--black">Olá, nomeDoUsuario!</h1>
            <h3 className="font--black">
              Navegue pelo menu ao lado para cadastrar praias e/ou quiosques
            </h3>
            <h3 className="font--black">
              ALGUMA IMAGEM
            </h3>
          </div>
        </div>
      </form>
      </div>
    </>
  );
}
