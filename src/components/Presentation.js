import React, { Component } from "react";
import api_config from "../config.json";
import { setPusherClient } from "react-pusher";
import Pusher from "pusher-js";

class Presentation extends React.Component {
  state: {
    currentSlide: {}
  };

  componentDidMount() {
    const currentSlide = { image: "endOFPresentation.jpg" };
    this.setState({ currentSlide });

    var pusher = new Pusher("e800d1befb580b1b5646", {
      cluster: "us2",
      forceTLS: true
    });

    var channel = pusher.subscribe("presenter-presentation");
    // channel.bind("my-event", function(data) {
    //   alert(JSON.stringify(data));
    // });

    channel.bind("new-slide", function(data) {
      const currentSlide = { image: data.message };
      this.setState({ currentSlide });
    }.bind(this));
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
            {this.state && this.state.currentSlide && (
              <img
                className="presentation"
                src={api_config.images_url + this.state.currentSlide.image}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Presentation;
