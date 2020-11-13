import React, { useState } from 'react';
import { db, store } from '../../services/firebase';
import FileUploader from 'react-firebase-file-uploader';

export default function Kitchen (props) {
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [progress, setProgress] = useState(0);

  var handleSubmit = async (e, props) => {
    e.preventDefault();
    await db.ref('posts').push({
      authorDisplayName: props.user.displayName || 'random PBJer',
      authorPhoto: props.user.photoURL || '',
      uid: props.user.uid,
      content: content,
      photo: img,
      timestamp: Date.now(),
      replyingTo: props.replyingTo,
      reactions: []
    });
    props.afterSubmit();
  }

  var handleSuccess = (filename) => {
    // Get URL of stored image and update user photoURL.
    store
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        // Async, so wait for it to finish before updating state.
        setImg(url);
        setProgress(100);
      });
  }

  return (
    <form className="pbj-form" onSubmit={(e) => { handleSubmit(e, props); }}>
      <div className="pbj-controls">
        <i className="fas fa-times-circle close-btn"
          onClick={() => {
            props.modClasses('kitchen');
          }}></i>
        <button type="submit" className="btn btn-primary submit-btn">
          Full Send
        </button>
      </div>

      {props.replyingTo !== '' ? (
        <h3 className="replying-title">
          Replying to {props.replyingName}
        </h3>
      ) : null}

      <div className="pbj">
        <textarea
          className="form-control"
          name="content"
          placeholder="What's on your mind..."
          onChange={(e) => {
            setContent(e.target.value)
          }}
          value={content}
          required></textarea>
        <label className="attaching-image">
          {progress === 0 ? (
            <span>
              <i className="far fa-image"></i> Upload Photo
            </span>
          ) : (
              <div className={`circle-loader ${progress === 100 ? 'load-complete' : ''}`}>
                <div className="checkmark draw"></div>
              </div>
            )}
          <FileUploader
            hidden
            accept="image/*"
            name="profileImg"
            randomizeFilename
            storageRef={store.ref('images')}
            onUploadError={() => {
              this.setState({
                isUploading: false
              });
              console.log('Upload error. Probably pretty fucked, too.');
            }}
            onUploadSuccess={handleSuccess}
          />
        </label>
      </div>
    </form>
  );
}