import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import Ingredientes from "./Ingredientes";
import NuevoIngrediente from "./NuevoIngrediente";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ingredientes/" component={Ingredientes} />
          <Route path="/nuevoingrediente/" component={NuevoIngrediente} />
          <Route path="/login" component={Login} />
          <Route component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
