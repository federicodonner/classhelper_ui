import React, { Component } from "react";
import { fetchClass, sendMessage } from "../fetchFunctions";
import api_config from "../config.json";
import PresenterActivity from "./PresenterActivity";

class Presenter extends React.Component {
  state: {
    slides: [],
    currentSlide: 0
  };

  goToSection = section => event => {
    this.props.history.push({
      pathname: "/" + section
    });
  };

  // Goes to the next or previous slide
  goToSlide = modifier => event => {
    // Load the slides to prevent overload
    const slides = this.state.slides;
    const currentSlide = this.state.currentSlide;
    // Create the payload for the presenter
    const presenterInstructions = {
      channel: "presenter-presentation",
      event: "new-slide",
      message: slides[currentSlide + modifier].image
    };
    // Verify that the new slide is available
    if (
      currentSlide + modifier >= 0 &&
      currentSlide + modifier <= slides.length - 2
    ) {
      this.setState({
        currentSlide: this.state.currentSlide + modifier
      });
      sendMessage(presenterInstructions);
    }
  };

  componentDidMount() {
    fetchClass(this.props.match.params.id)
      .then(results => {
        return results.json();
      })
      .then(response => {
        // Create an artificial last slide to show when the class ends
        const lastSlide = {
          image: "endOfPresentation.jpg"
        };
        // Add 2 to the array
        response.slides.push(lastSlide);
        response.slides.push(lastSlide);
        this.setState(
          {
            slides: response.slides
          },
          function() {
            this.setState({
              currentSlide: 0
            });
          }.bind(this)
        );
      });
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
            {" "}
            {this.state && !this.state.slides && (
              <p>
                <img className="loader" src="/images/loader.gif" />
              </p>
            )}
            {this.state &&
              this.state.slides &&
              this.state.currentSlide != undefined && (
                <>
                  <img
                    className="currentSlide"
                    src={
                      api_config.images_url +
                      this.state.slides[this.state.currentSlide].image
                    }
                  />{" "}
                  {this.state.currentSlide != this.state.slides.length - 1 && (
                    <div className="transport">
                      <img
                        className="button"
                        onClick={this.goToSlide(-1)}
                        src="/images/previous.png"
                      />
                      <img
                        className="button"
                        onClick={this.goToSlide(1)}
                        src="/images/next.png"
                      />
                      <div className="position">
                        {" "}
                        {this.state.currentSlide}
                        de {this.state.slides.length - 2}
                      </div>{" "}
                    </div>
                  )}
                  <div className="currentNotes">
                    {" "}
                    {this.state.slides[this.state.currentSlide].notes}
                  </div>
                  <img
                    className="nextSlide"
                    src={
                      api_config.images_url +
                      this.state.slides[this.state.currentSlide + 1].image
                    }
                  />{" "}
                  <div className="slideActivities">
                    {this.state.slides[this.state.currentSlide].activity && (
                      <PresenterActivity
                        details={
                          this.state.slides[this.state.currentSlide].activity
                        }
                      />
                    )}
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Presenter;
