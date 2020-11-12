import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed/Feed";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { auth } from "./services/firebase";
import "./styles/main.scss";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user)
        this.setState({
          authenticated: true,
          loading: false
        });
      else
        this.setState({
          authenticated: false,
          loading: false
        });
    });
  }

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    ) : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/feed" component={Feed} />
          <Route path="/signup" component={Signup} />
          <Route path="/login">
            {this.state.authenticated ? <Redirect to="/feed" /> : <Login />}
          </Route>
          <PrivateRoute
            path="/profile"
            authenticated={this.state.authenticated}
            component={Profile}
          />
          {/* Logout and redirect home */}
          <Route path="/logout" render={() => { auth().signOut(); return <Redirect to="/" /> }}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
