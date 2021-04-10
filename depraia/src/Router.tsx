import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";

export default () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
