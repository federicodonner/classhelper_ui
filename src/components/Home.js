import React from "react";
import { verifyLogin, fetchActiveUser } from "../fetchFunctions";
import { convertDate } from "../dataFunctions";

class Home extends React.Component {
  state: {
    user: {}
  };

  navigate = pathname => event => {
    this.props.history.push({
      pathname: "/" + pathname
    });
  };

  componentDidMount() {
    // Verify if the user has logged in before
    const user = verifyLogin();
    if (user) {
      // If it has, store the information in state
      this.setState({ user });
    } else {
      // If there is no data in localStorage, go back to user select screen
      // this.props.history.push(`/userselect`);
      this.props.history.push({
        pathname: "/login"
      });
    }
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
            <div className="header">
              <img className="logo" src="/images/logo-amerendar.png" />
              <p>Bienvenido al sistema de gestión de A Merendar.</p>
              <p>Seleccione una opción para ver más</p>
            </div>
            <div className="nav-button" onClick={this.navigate("ingredientes")}>
              <img className="nav-icon" src="/images/icono-ingredientes.png" />
              <span className="newLine">Ingredientes</span>
            </div>
            <div className="nav-button">
              <img className="nav-icon" src="/images/icono-recetas.png" />
              <span className="newLine">Recetas</span>
            </div>
            <div className="nav-button">
              <img
                className="nav-icon"
                src="/images/icono-orden-de-cocina.png"
              />
              <span className="newLine">Órdenes de cocina</span>
            </div>
            <div className="nav-button">
              <img className="nav-icon" src="/images/icono-usuarios.png" />
              <span className="newLine">Usuarios</span>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="nav-button left">
            <img className="nav-icon" src="/images/icono-salir.png" />
            <span>Salir</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
