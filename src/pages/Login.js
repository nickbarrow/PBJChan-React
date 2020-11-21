import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle } from "../helpers/auth";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="login">
        <form className="login-form mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={this.handleSubmit}>
          <h1 className="howdy">
            Howdy,
            <Link className="title mx-2" to="#">
              Stranger
            </Link>
            🤠
          </h1>
          
          {/* Incorrect user/password */}
          {this.state.error && 
            <div>
              <img
                className="uwu-img"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2F143a887b46092bd880997119ecf09681%2Ftenor.gif%3Fitemid%3D15177421&f=1&nofb=1"
                alt="uwu"
              />
              <p className="text-danger">UwU! did youw fowget youwr passwowrd? ∑(✘Д✘๑)</p>
            </div>
          }

          <p className="you-should">you should</p>
          <button className="btn pbj-btn"
            type="button"
            onClick={this.googleSignIn}>
            Sign in with Google
          </button>

          <p className="you-should">or login w/ email</p>
          <div className="email-login-form form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>

          <div className="form-group">
            <button className="btn pbj-btn-gold" type="submit">
              Login
            </button>
          </div>

          <hr />

          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}
