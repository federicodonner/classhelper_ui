import React from "react";
import { fetchStudent } from "../fetchFunctions";
import { setPusherClient } from "react-pusher";
import Pusher from "pusher-js";

class Student extends React.Component {
  state: {
    user: {},
    student: {}
  };

  componentDidMount() {
    fetchStudent(this.props.match.params.id)
      .then(results => {
        return results.json();
      })
      .then(response => {
        this.setState(
          {
            student: response
          },
          function() {
            // Enable pusher logging - don't include this in production

            Pusher.logToConsole = true;

            // Pusher config needs to go inside the setState callback because
            // it uses the student id
            var pusher = new Pusher("e800d1befb580b1b5646", {
              cluster: "us2",
              forceTLS: true
            });

            var generalChannel = pusher.subscribe("available-students");
            var personalChannel = pusher.subscribe(
              "student-" + this.state.student.id
            );
            // channel.bind("my-event", function(data) {
            //   alert(JSON.stringify(data));
            // });

            generalChannel.bind("request-available", function(data) {
              console.log(data);
            });
          }
        );
      });
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
            <div className="header">
              {this.state && this.state.student && (
                <>
                  <span className="title">
                    Hola
                    {this.state.student.name +
                      " " +
                      this.state.student.last_name}
                  </span>{" "}
                  <p>
                    Recordá dejar tu celular encendido y en esta página para
                    recibir las actividades.
                  </p>
                </>
              )}
            </div>{" "}
            {this.state && !this.state.student && (
              <p>
                <img className="loader" src="/images/loader.gif" />
              </p>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Student;
