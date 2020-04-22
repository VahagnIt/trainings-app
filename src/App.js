import React from "react";
import "./App.css";

import { Route, Switch, Redirect } from "react-router";
import Training from "./components/containers/Training/Training";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/trainings-app" component={Training} />
        <Redirect to="/trainings-app" />
      </Switch>
    );
  }
}

export default App;
