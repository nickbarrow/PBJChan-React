import React, { Component } from 'react';
import Header from '../../components/Header';
import { auth, db } from '../../services/firebase';
import FeedView from './FeedView';
import Nav from '../../components/Nav';
import Kitchen from './Kitchen';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      liked: [], // Array of PBJs liked this session.
      dynamicElements: [],
      replyingPID: null,
      replyingName: ''
    };
    this.like = this.like.bind(this);
  }

  // Update # likes a post has.
  like(e, pid) {
    // Pre-built string for querying a specific post.
    var postQuery = '/posts/' + pid;
    var update = {};

    // Get post.
    db.ref(postQuery).on('value', function (snapshot) {
      if (snapshot.val()) update = snapshot.val();
      else return -1;
    });

    // Prevent double-liking:
    if (this.state.liked.includes(pid)) {
      // TODO: unlike()
      this.state.liked.pop(pid);
      update.likes = update.likes - 1;
      db.ref(postQuery).update(update);
    } else {
      this.state.liked.push(pid);
      update.likes = update.likes + 1;
      db.ref(postQuery).update(update);

      // db.ref("/users/liked").update(); sumn like dat
    }
  }

  // Used to create dynamic elements.
  modClasses = (class_name, value) => {
    if (value === undefined) value = "toggle";
    var arr = this.state.dynamicElements;
    // Get index of class in dynamicElements
    var idx = arr.indexOf(class_name);

    if (value === 'toggle') {
      // If exists in array, remove
      if (idx >= 0) arr.splice(idx, 1);
      // Else add to array
      else arr.push(class_name);
    } else if (value === 'add') {
      if (idx < 0) arr.push(class_name);
    } else if (value === 'remove') {
      if (idx >= 0) arr.splice(idx, 1);
    }
    
    this.setState({ dynamicElements: arr });
  };

  // Mark pbj as replying.
  reply = (replyingPID) => {
    this.setState({ replyingPID });
    this.modClasses('kitchen');
  };

  afterSubmit = () => {
    this.modClasses('kitchen', 'remove');
    this.setState({ replyingPID: null, replyingName: '' });
  }

  render() {
    return (
      <>
        {/* Navigation bar/sidebar (desktop) */}
        <Nav modClasses={this.modClasses} />
        <div className="page feed-view">
          <Header title={this.state.user?.displayName || 'PBJChan'} />
          
          <div className={`kitchen ${this.state.dynamicElements.includes('kitchen') ? 'active' : ''}`}>
            <Kitchen
              user={this.state.user}
              afterSubmit={this.afterSubmit}
              replyingPID={this.state.replyingPID}
              modClasses={this.modClasses}
              />
          </div>

          {/* Post feed */}
          <FeedView
            reply={this.reply}
            modClasses={this.modClasses}
            dynamicElements={this.state.dynamicElements}
          />
        </div>
      </>
    );
  }
}
