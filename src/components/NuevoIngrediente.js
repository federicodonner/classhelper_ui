import React from "react";
import { verifyLogin, addIngredient } from "../fetchFunctions";

class NuevoIngrediente extends React.Component {
  state: {
    user: {},
    loading: false
  };

  nameRef = React.createRef();
  unitsRef = React.createRef();

  goToSection = section => event => {
    this.props.history.push({
      pathname: "/" + section
    });
  };

  createIngredient = event => {
    event.preventDefault();



    const ingredient = {
      name: this.nameRef.current.value,
      units: this.unitsRef.current.value
    };

    if (!ingredient.name) {
      alert("Debes ingresar el nombre del ingrediente");
      return false;
    } else if (!ingredient.units) {
      alert("Debes ingresar las unidades del ingredient");
      return false;
    }

    this.setState({ loading: true });

    addIngredient(ingredient, this.state.user.token)
      .then(res => res.json())
      .then(
        function(response) {
          if (response.status == "success") {
            alert(response.message);
            this.props.history.push({ pathname: "/ingredientes" });
          } else {
            this.setState({ loading: false });
            alert(response.message);
          }
        }.bind(this)
      );
  };

  componentDidMount() {
    // Verify if the user has logged in before
    const user = verifyLogin();
    if (user) {
      // If it has, store the information in state
      this.setState({ user }, function() {}.bind(this));
    } else {
      // If there is no data in localStorage, go back to login screen
      // this.props.history.push(`/login`);
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
              <img className="icono" src="/images/icono-ingredientes.png" />
              <span className="title">Nuevo ingrediente</span>
            </div>

            {(this.state && !this.state.user) ||
              (this.state && this.state.loading && (
                <p>
                  <img className="loader" src="/images/loader.gif" />
                </p>
              ))}

            {this.state && this.state.user && !this.state.loading && (
              <div className="bigMargin">
                <form className="pretty-form">
                  <span className="form-input">
                    Nombre:{" "}
                    <input
                      name="name"
                      type="text"
                      ref={this.nameRef}
                      className="pretty-input"
                    />
                  </span>
                  <span className="form-input">
                    Unidades:{" "}
                    <input
                      name="units"
                      type="text"
                      ref={this.unitsRef}
                      className="pretty-input"
                    />
                  </span>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <div
            className="nav-button left"
            onClick={this.goToSection("ingredientes")}
          >
            <img className="nav-icon" src="/images/icono-board.png" />
            <span>Cancelar</span>
          </div>
          <div className="nav-button right" onClick={this.createIngredient}>
            <span>Guardar</span>
            <img className="nav-icon" src="/images/icono-ensalada.png" />
          </div>
        </div>
      </div>
    );
  }
}

export default NuevoIngrediente;
