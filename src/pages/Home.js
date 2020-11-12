import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser || "Anonymous",
      headerText: ""
    };
  }

  componentDidMount() {
    this.setState({
      headerText: this.state.user.displayName || "PBJ Chan"
    });
  }

  render() {
    return (
      <div className="home">
        {/* <Header heading={this.state.headerText} /> */}

        <div className="home__body text-center">
          <div className="top">
            <h1 className="display-5">
              Welcome to PBJChan
              <span className="burning-text">
                {/* EXPORT */}
                REBORN
              </span>
            </h1>

            <p>A great place to share your PB&Js.</p>
          </div>

          <img
            className="img-home"
            src="https://64.media.tumblr.com/193382ee33a10b6b25c22e1734bc6821/tumblr_npc1o9TcrG1r9mp00o1_1280.gif"
            // src="https://cdn.shopify.com/shopifycloud/help/assets/sharing/share-image-generic-bd3ce342a910c2489b672b00e45c74b1b1548662c41448e456547fa5b6e0f585.png"
            alt="pbjchan"
          />

          <div className="bottom">
            {/* Show 'Enter' text if logged in. */}
            {auth().currentUser ? (
              <Link className="btn btn-primary px-5" to="/feed">
                Enter PBJ Reborn
              </Link>
            ) : (
              <div>
                <Link className="btn btn-primary" to="/signup">
                  Sign Up
                </Link>
                <Link className="btn btn-login" to="/login">
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
