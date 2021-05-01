import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import MenuAdmin from "./pages/Admin/MenuAdmin";
import CadastroPraia from "./pages/Admin/CadastroPraia";
import CadastroQuiosque from "./pages/Admin/CadastroQuiosque";
import MainPageAdmin from "./pages/Admin/MainPageAdmin";
import Graphs from "./pages/Graphs/Graphs";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";
import OwnProvider from "./provider/index";
import CadastroProduto from "./pages/Admin/CadastroProduto";
import CadastroAgenda from "./pages/Admin/CadastroAgenda";

export default () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: amber[500]
      },
      secondary: {
        main: orange[500]
      }
    }
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <OwnProvider>
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/menu-admin">
                <MenuAdmin />
              </Route>
              <Route exact path="/cadastro-praia">
                <CadastroPraia />
              </Route>
              <Route exact path="/cadastro-quiosque">
                <CadastroQuiosque />
              </Route>
              <Route exact path="/cadastro-produto">
                <CadastroProduto />
              </Route>
              <Route exact path="/cadastro-agenda">
                <CadastroAgenda />
              </Route>
              <Route exact path="/admin">
                <MainPageAdmin />
              </Route>
              <Route exact path="/graphs">
                <Graphs />
              </Route>
            </Switch>
          </OwnProvider>
        </Router>
      </ThemeProvider>
    </>
  );
};
