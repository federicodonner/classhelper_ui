import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Presenter from "./Presenter";
import Student from "./Student";
import ClassSelect from "./ClassSelect";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Student} />
          <Route path="/presenter/:id" component={Presenter} />
          <Route path="/presenter" component={ClassSelect} />
          <Route component={Student} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
