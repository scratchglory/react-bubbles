import React from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

// const Login = () => {
class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  // CHANGE HANDLER
  changeHandler = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  // FORM SUBMIT
  login = e => {
    e.preventDefault();
    // axios
    axiosWithAuth()
      // needs two arguments
      .post("/api/login", this.state.credentials)
      .then(res => {
        console.log("LOGIN RES", res);
        if (window.localStorage) {
          // pass in the paylaod/token
          window.localStorage.setItem("token", res.data.payload);
        }
        this.props.history.push("/protected");
      })
      .catch(err => console.log("LOGIN ERR", err));
  };

  // Need: Form for input for 'user' and 'pw'
  // submitting a form
  render() {
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        {/* <p>Build a login page here</p> */}
        <form onSubmit={this.login}>
          <div>Lambda School</div>
          <div>{`i<3Lambd4`}</div>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.changeHandler}
            placeholder="USERNAME"
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.changeHandler}
            placeholder="PASSWORD"
          />
          <button>LOGIN</button>
        </form>
      </>
    );
  }
}

export default Login;
