import React from "react";
import { fetchClasses } from "../fetchFunctions";
import { convertDateTime } from "../dataFunctions";

class Student extends React.Component {
  state: {
    user: {},
    classes: []
  };

  goToClass = number => event => {
    this.props.history.push({
      pathname: "/student/" + number
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

  componentDidMount() {
    fetchClasses()
      .then(results => {
        return results.json();
      })
      .then(response => {
        this.setState({ classes: response.classes });
      });
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
            <div className="header">
              <span className="title">Seleccione la clase</span>
            </div>

            {this.state && !this.state.classes && (
              <p>
                <img className="loader" src="/images/loader.gif" />
              </p>
            )}

            {this.state && this.state.classes && (
              <ul className="lista">
                {this.state.classes.map(obj => {
                  return (
                    <li key={obj.id} onClick={this.goToClass(obj.id)}>
                      {obj.subject.name} - clase {obj.number} -{" "}
                      {convertDateTime(obj.date)}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
