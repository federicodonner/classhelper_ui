import React from "react";
import { loginUser, verifyLogin } from "../fetchFunctions";

class Signup extends React.Component {
  state: {
    loading: false
  };

  userRef = React.createRef();
  passwordRef = React.createRef();

  loginUser = event => {
    // Stop form from submitting
    event.preventDefault();

    const user = {
      user: this.userRef.current.value,
      password: this.passwordRef.current.value
    };

    if (!user.user) {
      alert("Debes ingresar un nombre de usuario");
      return false;
    } else if (!user.password) {
      alert("Debes ingresar una contraseña");
      return false;
    }

    this.setState({ loading: true });

    loginUser(user.user, user.password)
      .then(res => res.json())
      .then(
        function(loginResponse) {
          if (loginResponse.status == "201") {
            localStorage.setItem("amerendar_token", loginResponse.token);
            localStorage.setItem("amerendar_username", user.user);
            this.props.history.push({ pathname: "/" });
          } else {
            this.setState({ loading: false });
            alert(loginResponse.message);
          }
        }.bind(this)
      );
  };

  componentDidMount() {
    this.setState({ loading: false });
    // Verify if the user has logged in before
    const user = verifyLogin();
    if (user) {
      // If it has, navigate to home
      this.props.history.push({ pathname: "/" });
    }
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
            <div className="header bigMargin">
              <p>
                <img className="logo" src="/images/logo-amerendar.png" />
                <span className="newLine">
                  Sistema de gestión de A Merendar
                </span>
              </p>
            </div>

            <div>
              {this.state && this.state.loading && (
                <p>
                  <img src="/images/loader.gif" />
                  <span className="newLine">Ingresando...</span>
                </p>
              )}
              {this.state && !this.state.loading && (
                <>
                  <form className="pretty-form" onSubmit={this.loginUser}>
                    <span className="form-input">
                      Usuario:{" "}
                      <input
                        name="user"
                        type="text"
                        ref={this.userRef}
                        className="pretty-input"
                      />
                    </span>
                    <span className="form-input">
                      Contraseña:{" "}
                      <input
                        name="password"
                        type="password"
                        ref={this.passwordRef}
                        className="pretty-input"
                      />
                    </span>
                    <button className="pretty-submit" type="submit">
                      <img className="nav-icon" src="/images/icono-chef.png" />
                      <span className="newLine">Ingresar</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
