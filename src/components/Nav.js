import React, { Component } from "react";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
var scroll = Scroll.animateScroll;

var noUserPhoto = "https://image.flaticon.com/icons/svg/61/61205.svg";

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      heading: "PBJ Chan"
    };
  }

  render() {
    return (
      <div className="nav">
        <ul>
          {/* Feed */}
          <li>
            <Link to="/feed" className="sidebar__icon">
              <img src="images/sandy.svg" alt="Melty PB&J thin outline" />
              <h2 className="nav-header">Feed</h2>
            </Link>
          </li>

          {/* Profile */}
          <li>
            <Link to="/profile" className="sidebar__icon">
              <img src="images/profile.svg" alt="Person profile thin outline" />
              <h2 className="nav-header">Profile</h2>
            </Link>
          </li>

          {/* Settings */}
          {/* <li>
                        <div className="sidebar__icon"
                            onClick={() => {
                                let now = new Date(Date.now());
                                console.log("FULL: ", Date.now());
                                console.log("TEST: ", now.getTime());
                            }}>
                            <img src="/images/settings.svg" alt="settings" />
                            <h2 className="nav-header">Settings</h2>
                        </div>
                    </li> */}

          {/* Scroll to top */}
          {/* <li>
                        <div className="sidebar__icon"
                            onClick={() => {
                                scroll.scrollToTop({ containerId: "feed" });
                            }}>
                            <img src="images/top.svg" alt="Arrow pointing up thin outline" />
                            <h2 className="nav-header">Top</h2>
                        </div>
                    </li> */}

          {/* Kitchen */}
          <li>
            <div
              className="sidebar__icon"
              onClick={() => {
                if (this.props.modClasses)
                  this.props.modClasses("kitchen");
              }}
            >
              <img src="images/cook.svg" alt="Kitchen thin black" />
              <h2 className="nav-header">Kitchen</h2>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
