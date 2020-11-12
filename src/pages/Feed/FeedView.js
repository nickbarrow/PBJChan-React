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
            replying: null,
            readError: null, // Error reporting for Firebase actions
            writeError: null, // Error reporting for Firebase actions
            loadingPosts: false,
            liked: [], // Array of PBJs liked this session.
            disliked: [],
            /* Necessary to have separate array of just photos as not
                all posts will have a photo (trying to access every posts
                photo if it doesnt have one may lead to unexpected resutls) */
            photos: [],
            lightboxOpen: false,
            photoIndex: 0 // Needed for react-image-lightbox
        };
        this.like = this.like.bind(this);
        // this.openLightbox = this.openLightbox.bind(this);
    }

    // Grabs posts on component mount.
    componentDidMount() {
        this.posts = db.ref("posts");
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

            posts.reverse();
            photos.reverse();
            this.setState({ posts, photos });
        });

        /*
        try {
            // Get ALL posts on mount. TODO: not do that
            db.ref("posts").on("value", (snapshot) => {
                let posts = [];
                let photos = [];
                // Each post...
                snapshot.forEach((post_snap) => {
                    var tmp_post = post_snap.val();
                    tmp_post.pid = post_snap.key; // Create PID using db entry's key.
                    // Empty reactions for older posts.
                    if (tmp_post.reactions === undefined)
                        tmp_post.reactions = [];

                    posts.push(tmp_post); // Push to grand posts array
                    photos.push(tmp_post.photo); // Push current post photo to photos array for lightbox.

                    let q = `/users/${this.state.user.uid}/`;
                    // Get user likes.
                    db.ref(q + "liked/").on("value", (liked_snap) => {
                        // Set state liked to user's liked posts.
                        if (liked_snap.val() === null)
                            this.setState({ liked: [] });
                        else this.setState({ liked: liked_snap.val() });
                    });
                    // Get user dislikes.
                    db.ref(q + "disliked/").on("value", (disliked_snap) => {
                        // Set state liked to user's liked posts.
                        if (disliked_snap.val() === null)
                            this.setState({ disliked: [] });
                        else this.setState({ disliked: disliked_snap.val() });
                    });
                });

                posts.reverse(); // Posts come in oldest first.
                photos.reverse();
                this.setState({ posts, photos, loadingPosts: false });
            });
        } catch (error) {
            // DB probably doesn't exist/no permissions.
            this.setState({ readError: error.message, loadingPosts: false });
        }
        */
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
                    return (
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
