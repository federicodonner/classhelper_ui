import React from "react";
import { fetchClass } from "../fetchFunctions";
import api_config from "../config.json";

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

  nextSlide = () => {
    console.log("hola");
    this.setState({ currentSlide: this.state.currentSlide + 1 });
  };

  componentDidMount() {
    fetchClass(this.props.match.params.id)
      .then(results => {
        return results.json();
      })
      .then(response => {
        this.setState(
          { slides: response.slides },
          function() {
            this.setState(
              { currentSlide: 0 },
              function() {
                console.log(this.state.slides[this.state.currentSlide]);
              }.bind(this)
            );
          }.bind(this)
        );
      });
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
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
                    src={
                      api_config.images_url +
                      this.state.slides[this.state.currentSlide].image
                    }
                  />
                  {this.state.currentSlide != this.state.slides.length -1 && (
                    <div onClick={this.nextSlide}>Siguiente Slide </div>
                  )}
                  <div>{this.state.slides[this.state.currentSlide].notes}</div>
                </>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Presenter;
