// Import db provider
import { db } from "../services/firebase";

// Returns a post object by its PID.
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

// Easy array of months (short version).
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

// Format post timestamp.
export function formatTime(timestamp) {
    const d = new Date(timestamp);
    const currentDate = new Date();

    var dateTime = "";

    if (d.getDate() !== currentDate.getDate())
        dateTime += `${months[d.getMonth()]} ${d.getDate()}, `;

    // Get 12hr format & pad minutes with 0 if necessary.
    dateTime += `${d.getHours() % 12}:${d.getMinutes() < 10 ? '0': ''}${d.getMinutes()}`;
    if (d.getHours() % 12) dateTime += "pm";
    else dateTime += "am";

    return dateTime;
}
