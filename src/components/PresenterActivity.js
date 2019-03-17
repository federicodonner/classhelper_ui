import React from "react";
import { fetchStudents, sendMessage } from "../fetchFunctions";
import { setPusherClient } from "react-pusher";
import Pusher from "pusher-js";

class PresenterActivity extends React.Component {
  state: {
    students: [],
    message: "",
    sendto: 0
  };

  // This function triggers whenever a field of a steps is updated
  // Its used to keep the state object up to date with the form
  // This way, on submit only the state is read
  messageChanged = event => {
    this.setState({
      message: event.target.value
    });
  };

  sendMessage = studentId => event => {
    this.setState({ sendto: studentId }, function() {
      const data = {
        channel: "available-students",
        event: "request-available",
        message: "ping"
      };
      sendMessage(data);
    });
  };

  componentDidMount() {
    // Depending on the type of activity the component
    // renders different content
    switch (this.props.details.type) {
      case "1":
        fetchStudents()
          .then(results => {
            return results.json();
          })
          .then(response => {
            this.setState({
              students: response.students
            });
          });
        break;
    }
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher("e800d1befb580b1b5646", {
      cluster: "us2",
      forceTLS: true
    });

    // var channel = pusher.subscribe("available-classes");
    // channel.bind("my-event", function(data) {
    //   alert(JSON.stringify(data));
    // });

    var confirmationChannel = pusher.subscribe("student-confirmation");
    confirmationChannel.bind(
      "student-confirm",
      function(data) {
        if (data.message == this.state.sendto) {
          const sendData = {
            channel: "student-" + data.message,
            event: "simple-message",
            message: this.props.details.text + " \\n " + this.state.message
          };
          sendMessage(sendData);
        }
      }.bind(this)
    );
  }

  // selectBook() needs to run on page refresh to
  // navigate to the selected book
  render() {
    return (
      <>
        {" "}
        {this.props.details.type == 1 && (
          <>
            <p>
              <strong>Actividad</strong>:
              <span className="newLine">
                Mensaje global + custom, disparado individual.
              </span>
            </p>
            <p>
              <strong>Mensaje global</strong>:
              <span className="newLine">
                {this.props.details.text.split("\\n").map((item, i) => (
                  <span className="newLine" key={i}>
                    {item}
                  </span>
                ))}
              </span>
            </p>
            {this.state && this.state.students && (
              <>
                {this.state.students.map(obj => {
                  return (
                    <li key={obj.id} className="distance">
                      {obj.name + " " + obj.last_name}
                      <span className="newLine">
                        <textarea
                          onChange={this.messageChanged}
                          rows="4"
                          cols="45"
                        />
                      </span>
                      <span className="newLine">
                        <a onClick={this.sendMessage(obj.id)}> Mandar </a>
                      </span>
                    </li>
                  );
                })}{" "}
              </>
            )}{" "}
          </>
        )}{" "}
      </>
    );
  }
}

export default PresenterActivity;
