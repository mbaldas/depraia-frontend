import "../SignIn/index.scss";
import img from "../../assets/cadastro.svg";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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

export default function SignUp() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="container--signup">
        <div className="left">
          <div className="container--left">
            <h1 className="font--black">Olá!</h1>
            <p className="font--black">Cadastre-se agora</p>
            <form>
              <div className="form-group">
                <TextField label="Nome" placeholder="Ex. João da Silva" />
              </div>
              <div className="form-group">
                <TextField label="Email" placeholder="Ex. fulano@email.com" />
              </div>
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
                <span className="button--text">CADASTRE-SE</span>
              </Button>
            </form>
          </div>
        </div>
        <div className="right">
          <div className="container--right">
            <p className="font--white">
              Cadastre-se e venha curtir uma praia, mas sem aglomerar
            </p>
            <div className="col-lg-6 d-none d-lg-block container--right--image">
              <img src={img} alt="" className="img-fluid" width="400px" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
