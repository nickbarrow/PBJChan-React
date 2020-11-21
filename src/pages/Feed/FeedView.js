import React, { Component } from "react";
import { auth, db } from "../../services/firebase";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import { getPostByPID } from "../../helpers/utilities";

import Post from "./Post";

export default class FeedView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: auth().currentUser,
            posts: [], // Array of fetched PBJs
            page: 1,
            replyingTo: null,
            readError: null, // Error reporting for Firebase actions
            writeError: null, // Error reporting for Firebase actions
            loadingPosts: false,
            /* Necessary to have separate array of just photos as not
                all posts will have a photo (trying to access every posts
                photo if it doesnt have one may lead to unexpected results) */
            photos: [],
            lightboxOpen: false,
            photoIndex: 0 // Needed for react-image-lightbox
        };
        this.like = this.like.bind(this);
        // this.openLightbox = this.openLightbox.bind(this);
    }

    // Grabs posts on component mount.
    componentDidMount() {
        this.posts = db.ref("posts").orderByChild("timestamp").limitToLast(10);
        this.posts.on("value", (snapshot) => {
            let posts = [],
                photos = [];
            // Push each post to temporary posts array.
            snapshot.forEach((post) => {
                var tmpPost = post.val();
                // Get own pid.
                tmpPost.pid = post.key;
                // Empty reactions for older posts.
                if (tmpPost.reactions === undefined) tmpPost.reactions = [];
                posts.push(tmpPost);
                photos.push(tmpPost.photo);
            });

            // posts.reverse();
            photos.reverse();
            this.setState({ posts, photos });
        });
    }

    // Returns true if a post has replies.
    hasReplies(current_pid) {
        let c = false;
        this.state.posts.forEach((post) => {
            if (post.replyingTo === current_pid) c = true;
        });
        return c;
    }

    // If post is a reply, return OP
    isReplying(post) {
        if (post.replyingTo !== "" && post.replyingTo !== undefined)
            return getPostByPID(post.pid);
        return null;
    }

    openLightbox = (idx) => {
        this.setState({ photoIndex: idx, lightboxOpen: true });
    };

    // Update post score, update state liked posts.
    like = (post) => {
        var update = post;
        let updateLiked = this.state.liked; // This works much better if you cache state.liked

        // If already liked, unvote.
        if (updateLiked.includes(post.pid)) {
            update.score--;
            updateLiked.pop(post.pid);
        } else {
            update.score++;
            updateLiked.push(post.pid);
        }

        // Update state liked.
        this.setState({ liked: updateLiked });
        // Update post's score.
        db.ref(`/posts/${post.pid}`).update(update);
    };

    dislike = (post) => {
        var update = post;
        let updateDisliked = this.state.disliked; // This works much better if you cache state.disliked

        // If already disliked, unvote.
        if (updateDisliked.includes(post.pid)) {
            update.score++;
            updateDisliked.pop(post.pid);
        } else {
            update.score--;
            updateDisliked.push(post.pid);
        }

        // Update state disliked.
        this.setState({ disliked: updateDisliked });
        // Update post's score.
        db.ref(`/posts/${post.pid}`).update(update);
    };

    // @param {string} val - Action to perform on post.
    vote = (post, val) => {
        if (val === "like") {
            this.like(post);
            // Update user's liked posts.
            db.ref("/users/" + this.state.user.uid + "/liked").set(
                this.state.liked
            );
        } else {
            this.dislike(post);
            // Update user's liked posts.
            db.ref("/users/" + this.state.user.uid + "/disliked").set(
                this.state.disliked
            );
        }
    };

    render() {
        return (
            <div id="feed" className="feed">
                {/* Feed Loading... */}
                {this.state.loadingPosts && <h2>Loading...</h2>}

                {/* Feed */}
                {this.state.posts.map((post, idx) => {
                    let now = Date.now();
                    let hourMS = 1000 * 60 * 60;

                    // if (post.timestamp < now.getTime()) {
                    //     console.log("OLD M8");
                    // }
                    if (post.replyingTo) {
                        // console.log(`>${post.replyingTo}<`)
                        return null;
                    } else return (
                        <Post
                            post={post}
                            index={idx}
                            key={post.pid}
                            replying={this.isReplying(post)} // Returns a post if true
                            replyingToMe={this.state.posts.filter(
                                (p) => p.replyingTo === post.pid
                            )}
                            openLightbox={this.openLightbox}
                            modClasses={this.props.modClasses}
                            dynamicElements={this.props.dynamicElements}
                            reply={this.props.reply}
                        />
                    );
                })}

                {/* Photo lightbox */}
                {this.state.lightboxOpen && (
                    <Lightbox
                        mainSrc={this.state.photos[this.state.photoIndex]}
                        imageCaption={
                            this.state.posts[this.state.photoIndex].content
                        }
                        imageTitle={
                            this.state.posts[this.state.photoIndex].title
                        }
                        onCloseRequest={() =>
                            this.setState({ lightboxOpen: false })
                        }
                    />
                )}
            </div>
        );
    }
}
