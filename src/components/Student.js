import React from "react";
import { verifyLogin } from "../fetchFunctions";

class Student extends React.Component {
  state: {
    user: {},
    ingredients: []
  };

  goToSection = section => event => {
    this.props.history.push({
      pathname: "/" + section
    });
  };

  // componentDidMount() {
  //   // Verify if the user has logged in before
  //   const user = verifyLogin();
  //   if (user) {
  //     // If it has, store the information in state
  //     this.setState(
  //       { user },
  //       function() {
  //         fetchIngredients(user.token)
  //           .then(results => {
  //             return results.json();
  //           })
  //           .then(response => {
  //             this.setState({ ingredients: response.ingredients });
  //           });
  //       }.bind(this)
  //     );
  //   } else {
  //     // If there is no data in localStorage, go back to login screen
  //     // this.props.history.push(`/login`);
  //     this.props.history.push({
  //       pathname: "/login"
  //     });
  //   }
  // }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
            <div className="header">
              <img className="icono" src="/images/icono-ingredientes.png" />
              <span className="title">Ingredientes</span>
            </div>

            {this.state && !this.state.ingredients && (
              <p>
                <img className="loader" src="/images/loader.gif" />
              </p>
            )}

            {this.state && this.state.ingredients && (
              <ul className="lista ingredientes">
                {this.state.ingredients.map(obj => {
                  return (
                    <li key={obj.id}>
                      <p>
                        {obj.nombre} - {obj.cantidad} {obj.unidades}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="footer">
          <div
            className="nav-button center"
            onClick={this.goToSection("nuevoingrediente")}
          >
            <img className="nav-icon" src="/images/icono-agregar.png" />
          </div>
          <div className="nav-button left" onClick={this.goToSection("")}>
            <img className="nav-icon" src="/images/icono-board.png" />
            <span>Volver</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
