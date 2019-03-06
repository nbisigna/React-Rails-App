import React, { Component, Fragment } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick() {
    this.props.postPost({ post: this.state.post });
    this.setState({ post: '' });
  }

  render() {
    return (
      <Fragment>
        <input type="text" name="post" onChange={e => this.handleChange(e)} />
        <button onClick={this.handleClick}>Submit</button>
      </Fragment>
    );
  }
}

export default Form;
