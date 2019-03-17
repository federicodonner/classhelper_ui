import React from "react";
import { fetchStudent, sendMessage } from "../fetchFunctions";
import { setPusherClient } from "react-pusher";
import Pusher from "pusher-js";

class Student extends React.Component {
  state: {
    student: {},
    simplemessage: ""
  };

  clearMessage = event => {
    this.setState({ simplemessage: "" });
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

            generalChannel.bind(
              "request-available",
              function() {
                const data = {
                  channel: "student-confirmation",
                  event: "student-confirm",
                  message: this.state.student.id
                };
                sendMessage(data);
              }.bind(this)
            );

            personalChannel.bind(
              "simple-message",
              function(data) {
                this.setState({ simplemessage: data.message });
              }.bind(this)
            );
          }
        );
      });
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="studentScrollable">
          <div className="studentContent">
            {this.state && this.state.student && (
              <>
                <div className="studentHeader">
                  <span className="title">
                    Hola{" "}
                    {this.state.student.name +
                      " " +
                      this.state.student.last_name}
                  </span>
                  <p>
                    Recordá dejar tu celular encendido y en esta página para
                    recibir las actividades.
                  </p>
                </div>
                {this.state && this.state.simplemessage && (
                  <div className="activity">
                    <div className="activityContent">
                      {this.state.simplemessage.split("\\n").map((item, i) => (
                        <p key={i}>{item}</p>
                      ))}
                    </div>
                    <a onClick={this.clearMessage} className="clearMessage">
                      {" "}
                      borrar mensaje
                    </a>
                  </div>
                )}
              </>
            )}

            {this.state && !this.state.student && (
              <p>
                <img className="loader" src="/images/loader.gif" />
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
