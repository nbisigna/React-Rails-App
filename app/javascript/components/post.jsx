import React, { Fragment } from 'react';

const Post = ({ post, editPost, deletePost }) => {
  return (
    <Fragment>
      <h3>{post.post}</h3>
      <button onClick={() => deletePost(post)}>delete Post</button>
      <button onClick={() => editPost(post)}>Edit Post</button>
    </Fragment>
  );
};

export default Post;
