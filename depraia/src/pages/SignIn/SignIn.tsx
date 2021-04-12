import "./index.scss";
import img from "../../assets/porta.svg";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SignUp from "../SignUp/SignUp";
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

export default function SignIn() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="container--signin">
        <div className="left--signin">
          <div className="container--left__signin">
            <p className="font--white">
              Oque está esperando? Vem curtir uma praia, mas com todos os
              cuidados
            </p>
            <div className="col-lg-6 d-none d-lg-block container--right--image">
              <img src={img} alt="" className="img-fluid" width="400px" />
            </div>
          </div>
        </div>
        <div className="right--signin">
          <div className="container--right__signin">
            <h1 className="font--black">Olá!</h1>
            <p className="font--black">
              Já se cadastrou? Entre agora na nossa plataforma
            </p>
            <form>
              <div className="form-group">
                <TextField label="CPF" placeholder="Ex. 12345678912" />
              </div>
              <div className="form-group">
                <TextField
                  id="standard-password-input"
                  label="Senha"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <Button
                variant="contained"
                className="button--signup"
                type="submit"
              >
                <span className="button--text">FAZER LOGIN</span>
              </Button>
            </form>
            <p className="font--black" id="solicite">
              Ainda não se cadastrou? Cadastre-se <Link to={"/signup"}>já</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
