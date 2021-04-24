import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import MenuAdmin from "./pages/Admin/MenuAdmin";
import CadastroPraia from "./pages/Admin/CadastroPraia";
import CadastroQuiosque from "./pages/Admin/CadastroQuiosque";
import MainPageAdmin from "./pages/Admin/MainPageAdmin";
import Graphs from "./pages/Graphs/Graphs";

export default () => {
  return (
    <>
      <Router>
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
          <Route exact path="/admin">
            <MainPageAdmin />
          </Route>
          <Route exact path="/graphs">
            <Graphs />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
