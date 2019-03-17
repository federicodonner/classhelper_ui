import React from "react";
import { fetchStudents } from "../fetchFunctions";
import { convertDateTime } from "../dataFunctions";

class StudentSelect extends React.Component {
  state: {
    user: {},
    students: []
  };

  selectStudent = number => event => {
    this.props.history.push({ pathname: "/student/" + number });
  };

  componentDidMount() {
    fetchStudents()
      .then(results => {
        return results.json();
      })
      .then(response => {
        this.setState({
          students: response.students
        });
      });
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
            <div className="header">
              <span className="title"> Seleccione su nombre </span>{" "}
            </div>{" "}
            {this.state && !this.state.students && (
              <p>
                <img className="loader" src="/images/loader.gif" />
              </p>
            )}{" "}
            {this.state && this.state.students && (
              <ul className="lista">
                {" "}
                {this.state.students.map(obj => {
                  return (
                    <li key={obj.id} onClick={this.selectStudent(obj.id)}>
                      {" "}
                      {obj.name + " " + obj.last_name}{" "}
                    </li>
                  );
                })}{" "}
              </ul>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default StudentSelect;
