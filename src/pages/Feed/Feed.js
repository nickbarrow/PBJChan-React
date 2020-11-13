import React, { Component } from 'react';
import Header from '../../components/Header';
import { auth, db, store } from '../../services/firebase';
import FileUploader from 'react-firebase-file-uploader';
import FeedView from './FeedView';
import Nav from '../../components/Nav';
import Kitchen from './Kitchen';

var icon_attribution = [
  {
    icon: 'profile',
    attr:
      'Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'
  },
  {
    icon: 'sandwich',
    attr:
      'Icons made by <a href="https://smashicons.com/" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'
  },
  {
    icon: 'settings',
    attr:
      'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'
  },
  {
    icon: 'arrow up',
    attr:
      'Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'
  },
  {
    icon: 'compose',
    attr:
      'Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'
  }
];

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      posts: [], // Array of fetched PBJs
      title: '', // Title of composing PBJ
      content: '', // Content of composing PBJ
      readError: null, // Error reporting for Firebase actions
      writeError: null, // Error reporting for Firebase actions
      loadingPosts: false,
      liked: [], // Array of PBJs liked this session.
      formVisible: false,
      dynamicElements: [],
      isUploading: false,
      progress: 0,
      storeFilename: '',
      photoURL: '',
      replyingPID: '',
      replyingName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.like = this.like.bind(this);
    this.myRef = React.createRef();

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });

    try {
      await db.ref('posts').push({
        authorDisplayName: this.state.user.displayName || 'random PBJer',
        authorPhoto: this.state.user.photoURL || '',
        uid: this.state.user.uid,
        content: this.state.content,
        photo: this.state.photoURL,
        timestamp: Date.now(),
        score: 0,
        replyingTo: this.state.replyingPID,
        reactions: []
      });
      this.setState({ content: '' });
    } catch (error) {
      this.setState({ writeError: error.message });
    }

    // const feedArea = this.myRef.current;
    this.modClasses('kitchen');
  }

  afterSubmit = () => {
    this.setState({ content: '' });
    this.modClasses('kitchen');
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
    } else if (value === 'remnove') {
      if (idx >= 0) arr.splice(idx, 1);
    }
    
    this.setState({ dynamicElements: arr });
  };

  //  Photo upload started.
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  // Update state as file upload progresses.
  handleProgress = (progress) => this.setState({ progress });

  // Handle upload error.
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  // Handle successful image upload.
  handleUploadSuccess = (filename) => {
    this.setState({
      progress: 100,
      isUploading: false,
      storeFilename: filename // Filename created when ImageUploader sends to Firestore.
    });

    // Get URL of stored image and update user photoURL.
    store
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        // Async, so wait for it to finish before updating state.
        this.setState({ photoURL: url });
      });
  };

  invokeKitchen = (replying) => {
    if (!replying) this.setState({ replyingPID: '', replyingName: '' });
    // if (window.innerWidth < 700) this.modClasses("mobile-kitchen");
    // else this.modClasses("desktop-kitchen");
    this.modClasses('kitchen');
  };

  rePBJ = (replying_id, replying_name) => {
    this.setState({
      replyingPID: replying_id,
      replyingName: replying_name
    });

    this.invokeKitchen(true);
  };

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
              replyingTo={this.state.replyingPID}
              replyingName={this.state.replyingName}
              />
          </div>

          {/* Post feed */}
          <FeedView
            repbj={this.rePBJ}
            modClasses={this.modClasses}
            dynamicElements={this.state.dynamicElements}
          />
        </div>
      </>
    );
  }
}
