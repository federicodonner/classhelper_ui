import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Presenter from "./Presenter";
import Presentation from "./Presentation";
import Student from "./Student";
import StudentSelect from "./StudentSelect";
import ClassSelect from "./ClassSelect";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StudentSelect} />
          <Route path="/presenter/:id" component={Presenter} />
          <Route path="/presenter" component={ClassSelect} />
          <Route path="/presentation" component={Presentation} />
          <Route path="/student/:id" component={Student} />
          <Route component={StudentSelect} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
