import React, { Component, Fragment } from 'react';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ''
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({ post: this.props.post.post });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleClick() {
    let post = {
      post: this.state.post,
      id: this.props.post.id,
      isEditing: false
    };
    this.props.updatePost(post);
  }
  handleCancel() {
    this.props.cancelEdit(this.props.post);
  }
  render() {
    return (
      <Fragment>
        <br />
        <br />
        <input
          type="text"
          name="post"
          value={this.state.post}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <br />
        <button onClick={this.handleClick}>Submit</button>
        <button onClick={this.handleCancel}>Cancel</button>
      </Fragment>
    );
  }
}

export default Edit;
