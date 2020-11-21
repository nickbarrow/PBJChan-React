import React, { Component } from "react";
import Header from "../components/Header";
import { auth, db, store } from "../services/firebase";
import FileUploader from "react-firebase-file-uploader";
import Nav from "../components/Nav";

var noUserPhoto = "https://image.flaticon.com/icons/svg/61/61205.svg";

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: auth().currentUser,
            displayName: auth().currentUser.displayName,
            photoURL: auth().currentUser.photoURL || noUserPhoto,
            email: auth().currentUser.email,
            status: "Idle",
            headerText: auth().currentUser.displayName || "Random PBJer",
            isUploading: false,
            progress: 0,
            storeFilename: ""
        };

        // console.log("User displayName: ", auth().currentUser.displayName);
        // console.log("User photoURL:    ", auth().currentUser.photoURL);

        this.headerRef = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUser = this.updateUser.bind(this);

        this.handleUploadStart = this.handleUploadStart.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleUploadError = this.handleUploadError.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    }

    // Update state as user fields are modified.
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    // TODO:
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
            await db.ref("chats").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid
            });
            this.setState({ content: "" });
            chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    // TODO: Update user properties on respective "Update" click.
    updateUser(value) {
        var val = value;
        var update = {}; // Data to be updated.

        switch (val) {
            case "photoURL":
                console.log("updating url: ", this.state.photoURL);
                update = {
                    photoURL: this.state.photoURL
                };
                break;
            case "displayName":
                update.displayName = this.state.displayName;
                this.setState({ headerText: this.state.displayName });
                break;
            default:
                break;
        }

        auth()
            .currentUser.updateProfile(update)
            .catch((error) => {
                console.log(error);
            });

        this.setState({ status: val + " updated." });
    }

    //  Profile pic upload started.
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
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then((url) => {
                // Async, so wait for it to finish before updating state.
                this.setState({ photoURL: url });
                this.updateUser("photoURL");
            });
    };

    render() {
        return (
            <>
                <Nav />

                <div className="profile">
                    <Header title={this.state.headerText} />

                    <div className="profile-card">
                        
                        <div className="profile-img"
                            style={{
                                backgroundImage: `url(${this.state.photoURL})`
                            }}>
                            {/* <img className="profile-img" src={this.state.photoURL} alt="User" /> */}
                            <label className="profile-img-input">
                                Choose Image
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    name="profileImg"
                                    randomizeFilename
                                    storageRef={store.ref("images")}
                                    onUploadStart={this.handleUploadStart} // TODO
                                    onUploadError={this.handleUploadError} // TODO
                                    onUploadSuccess={this.handleUploadSuccess} // TODO
                                    onProgress={this.handleProgress} // TODO
                                />
                            </label>
                        </div>
                        
                        <div className="profile-info">
                            <div className="profile__item">
                                <div className="profile__item-label">
                                    <p className="d-inline">display name:</p>
                                </div>

                                <div className="profile__item-value">
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={this.state.displayName || ""}
                                        onChange={this.handleChange}
                                    />
                                    <button
                                        className="update-btn"
                                        onClick={(e) => {
                                            this.updateUser("displayName");
                                        }}>
                                        Update
                                    </button>
                                </div>
                            </div>

                            {/* Update Email. */}
                            <div className="profile__item">
                                <div className="profile__item-label">
                                    <p className="d-inline">email:</p>
                                </div>

                                <div className="profile__item-value">
                                    <input
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    <button
                                        className="update-btn"
                                        onClick={(e) => {
                                            this.updateUser("email");
                                        }}>
                                        Update
                                    </button>
                                </div>
                            </div>

                            {/* Update Password. */}
                            <div className="profile__item">
                                <div className="profile__item-label">
                                    <p className="d-inline">password:</p>
                                </div>

                                <div className="profile__item-value">
                                    <input
                                        type="text"
                                        name="password"
                                        placeholder="********"
                                    />
                                    <button
                                        className="update-btn"
                                        onClick={(e) => {
                                            this.updateUser("password");
                                        }}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-danger logout-btn"
                        onClick={() => {
                            auth().signOut();
                        }}>
                        Log Out</button>
                </div>
            </>
        );
    }
}
