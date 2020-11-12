import { db } from "../services/firebase";

export function getPostByPID(pid) {
    var postQuery = "/posts/" + pid;
    let post = {};
    // Get post
    db.ref(postQuery).on("value", function (snap) {
        if (snap.val()) {
            // console.log(snap.val());
            post = snap.val();
            post.pid = pid;
        } else return -1;
    });
    return post;
}
