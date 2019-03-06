import React, { Component, Fragment } from 'react';
import Form from './form';
import Post from './post';
import Edit from './edit';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.postPost = this.postPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch('/posts.json')
      .then(res => res.json())
      .then(json => {
        this.setState({
          posts: json.map(post => {
            return {
              post: post.post,
              id: post.id,
              isEditing: false,
              url: post.url
            };
          })
        });
      });
  }

  postPost(post) {
    fetch('/posts.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post: post })
    })
      .then(res => res.json())
      .then(json => {
        let posts = this.state.posts;
        posts.push(json);
        this.setState({ posts });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deletePost(post) {
    fetch(`/posts/${post.id}.json`, { method: 'DELETE' })
      .then(() => {
        let posts = this.state.posts;
        posts = posts.filter(item => {
          return item.id != post.id;
        });
        this.setState({ posts });
      })
      .catch(err => {
        console.log(err);
      });
  }

  editPost(post) {
    let posts = this.state.posts;
    posts = posts.map(item => {
      return item.id === post.id
        ? {
            post: item.post,
            id: item.id,
            isEditing: !item.isEditing,
            url: item.url
          }
        : item;
    });
    this.setState({ posts });
  }

  updatePost(post) {
    fetch(`/posts/${post.id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post: post })
    })
      .then(res => res.json())
      .then(json => {
        let posts = this.state.posts;
        posts = posts.map(item => {
          return item.id === json.id ? json : item;
        });
        this.setState({ posts });
      });
  }

  render() {
    return (
      <Fragment>
        <Form postPost={this.postPost} />
        {this.state.posts.map(post => {
          return post.isEditing ? (
            <Edit
              key={post.url}
              post={post}
              updatePost={this.updatePost}
              cancelEdit={this.editPost}
            />
          ) : (
            <Post
              key={post.url}
              post={post}
              editPost={this.editPost}
              deletePost={this.deletePost}
            />
          );
        })}
      </Fragment>
    );
  }
}

export default Posts;
