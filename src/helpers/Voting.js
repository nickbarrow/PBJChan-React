import db from "../services/firebase";

export default function like(post, liked) {
  let updatedPost = post;
  let updatedLiked = liked;
  updatedPost.score++;
  updatedLiked.push(post.pid);
  db.ref(`/posts/${post.pid}`).update(updatedPost);
  return updatedLiked;
}
