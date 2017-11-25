import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import { hashHistory} from 'react-router';

import signupMutation from '../mutations/signup';
import currentUserQuery from '../queries/currentUser';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }
  onSubmit({ username, email, password }) {
    this.props.mutate({
      variables: { username, email, password },
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
        <h3>Sign Up:</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
      </div>
    )
  }
}

export default graphql(currentUserQuery) (
  graphql(signupMutation)(SignupForm)
);
