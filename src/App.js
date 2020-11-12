import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
// Import pages.
import Home from "./pages/Home";
import Feed from "./pages/Feed/Feed";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { auth } from "./services/firebase";
// Import styles.
import "./styles/main.scss";

// Private route for user settings route.
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route {...rest} render={props => 
      authenticated 
      ? <Component {...props} /> 
      : <Redirect to="/login" /> } />
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
          {/* Landing page */}
          <Route exact path="/" component={Home} />
          {/* Main post feed */}
          <Route path="/feed" component={Feed} />
          {/* User login/signup/logout */}
          <Route path="/signup" component={Signup} />
          <Route path="/login">
            {this.state.authenticated ? <Redirect to="/feed" /> : <Login />}
          </Route>
          {/* Logout and redirect home */}
          <Route path="/logout" render={() => { auth().signOut(); return <Redirect to="/" /> }}/>
          {/* User profile page */}
          <PrivateRoute
            path="/profile"
            authenticated={this.state.authenticated}
            component={Profile}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
