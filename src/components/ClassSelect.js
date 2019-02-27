import React from "react";
import { fetchClasses } from "../fetchFunctions";
import { convertDateTime } from "../dataFunctions";

class ClassSelect extends React.Component {
  state: {
    classes: []
  };

  goToClass = number => event => {
    this.props.history.push({
      pathname: "/presenter/" + number
    });
  };

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

export default ClassSelect;
