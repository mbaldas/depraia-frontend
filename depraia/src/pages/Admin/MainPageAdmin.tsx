import "./index.scss";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuAdmin from "./MenuAdmin";
import NavBar from "../../components/NavBar/NavBar";
import { useLocalStorage } from "../../hooks/localStorage";

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
  const [actualUser, setActualUser] = useLocalStorage("name", "");
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div className="container--admin">
        <MenuAdmin />
        <form className={classes.root} noValidate autoComplete="off">
          <div className="right--admin">
            <div className="container--right__admin">
              <h1 className="font--black">Olá, {actualUser.nome}!</h1>
              <h3 className="font--black">
                Navegue pelo menu ao lado para cadastrar praias, quiosques, produtos e agendas
              </h3>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
