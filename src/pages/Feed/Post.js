import React, { Component } from "react";
import { formatTime } from "../../helpers/utilities";
import Reply from "./Reply";
import { db } from "../../services/firebase";
// Import icons
import { SmileyIcon } from "@primer/octicons-react";
import { BsReply } from "react-icons/bs";
import {
    TiArrowBackOutline as TiReplyIcon,
    TiArrowRepeat
} from "react-icons/ti";
// Utilities
import {
    ReactionPicker, returnReaction, slimReactions, reactionCount
} from './../../helpers/PostUtilities';

// Img for users with no photo set.
const noAuthorImg = "https://image.flaticon.com/icons/svg/61/61205.svg";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    react = (reaction) => {
        let update = this.props.post;
        let updateReactions = this.props.post.reactions || [];
        updateReactions.push(reaction);
        update.reactions = updateReactions;

        db.ref(`/posts/${this.props.post.pid}`).update(update);
        if (this.props.dynamicElements.includes(`reactions-${this.props.post.pid}`))
            this.props.modClasses(`reactions-${this.props.post.pid}`, 'remove');
    };

    render() {
        // Calculate slim reactions here so we get accurate list every render.
        var reactions = slimReactions(this.props.post.reactions);

        return (
            <div className="post" key={this.props.post.pid}>
                <div className="post__left">
                    {/* Photo in separate div for desired layout. */}
                    <div className="uploader-image">
                        <img src={this.props.post.authorPhoto || noAuthorImg} alt="Author" />
                    </div>

                    {/* Interactions */}
                    <div className="interactions">
                        <div className="reaction-picker"
                            onClick={() => {
                                this.props.modClasses(`reactions-${this.props.post.pid}`);
                            }}>
                            <SmileyIcon size={20} />

                            <ReactionPicker 
                                reactionPickerActive={this.props.dynamicElements.includes(`reactions-${this.props.post.pid}`)}
                                react={this.react} />
                        </div>
                        <div
                            className="reply-icon"
                            onClick={() => { this.props.reply(this.props.post.pid); }}>
                            <TiReplyIcon />
                        </div>
                    </div>
                </div>

                <div className="post__right">
                    <div className="uploader-info">
                        <p className="uploader-name-date">
                            <span style={{ color: "dodgerblue" }}>
                                @{this.props.post.authorDisplayName || "Author"}
                            </span>
                            {" • "}
                            <span className="timestamp">
                                {formatTime(this.props.post.timestamp)}
                            </span>
                        </p>

                        {/* Show text if pbj is a reply */}
                        {this.props.replying !== null ? (
                            <div className="replying__container">
                                <p className="replying-to">
                                    <BsReply size={16} />
                                    Replying to{" " + this.props.replying.authorDisplayName}
                                </p>
                            </div>
                        ) : null}

                        <p className={`post-text ${this.props.post.content.includes('>') ? 'green' : ''}`}>{this.props.post.content}</p>

                        {/* Post Photo */}
                        {this.props.post.photo ? (
                            <div className="post-image"
                                style={{ backgroundImage: `URL(${this.props.post.photo})` }}
                                onClick={() => {this.props.openLightbox(this.props.index); }}
                            ></div>
                        ) : null}

                        {/* Reactions container */}
                        <div className="post-reactions">
                            {reactions.map((r, idx) => {
                                return (
                                    <div key={`replyingto${this.props.post.pid}-${idx}`} className="reaction" onClick={() => { this.react(r); }}>
                                        {/* Get reaction icon */}
                                        {returnReaction(r)}
                                        <p className="reaction-count">
                                            {reactionCount(this.props.post.reactions, r)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Replies */}
                        {this.props.replyingToMe.length ? (
                            <div className="replies">
                                {this.props.replyingToMe.map((reply) => {
                                    return (
                                        <Reply
                                            key={
                                                "op_" +
                                                this.props.post.pid +
                                                "r_" +
                                                reply.pid
                                            }
                                            post={reply}
                                        />
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}
