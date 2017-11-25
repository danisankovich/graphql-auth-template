import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm';
import loginMutation from '../mutations/login';
import currentUserQuery from '../queries/currentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }
  onSubmit({ username, email, password }) {
    console.log(username, email, password)
    this.props.mutate({
      variables: { username, password },
      refetchQueries: [{ query: currentUserQuery }]
    }).catch((res) => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({errors});
    });
  }

  //called right before rerender
  componentWillUpdate(nextProps) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      hashHistory.push('/');
    }
  }

  render() {
    return (
      <div>
        <h3>Login:</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} isLogin={true}/>
      </div>
    )
  }
}

export default graphql(currentUserQuery)(
  graphql(loginMutation)(LoginForm)
);
