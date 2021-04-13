import "./index.scss";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

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

export default function MenuAdmin() {
  const classes = useStyles();


  return (
    <>
        <div className="left--admin">
            <Link to={"/cadastro-praia"} className="container--left__admin">
               Cadastro de Praia
            </Link>
            <Link to={"/cadastro-quiosque"} className="container--left__admin">
               Cadastro de Quiosque
            </Link>
        </div>
    </>
  );
}
