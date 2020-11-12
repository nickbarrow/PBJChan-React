import React from "react";

function Reply(props) {
    return (
        <div className="reply" id={props.post.pid}>
            <h3>{props.post.authorDisplayName}</h3>
            <h3>{props.post.content}</h3>
        </div>
    );
}

export default Reply;
