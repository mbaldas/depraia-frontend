import "../Admin/index.scss";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavBar from "../../components/NavBar/NavBar";
import MenuGraphs from "./MenuGraphs";
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

export default function MainPageGraphs() {
  const [actualUser, setActualUser] = useLocalStorage("name", "");
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div className="container--admin">
        <MenuGraphs />
        <form className={classes.root} noValidate autoComplete="off">
          <div className="right--admin">
            <div className="container--right__admin">
              <h1 className="font--black">Olá, {actualUser.nome}!</h1>
              <h3 className="font--black">
                Navegue pelo menu ao lado para visualizar os dados mais maneiros
                sobre as praias
              </h3>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
