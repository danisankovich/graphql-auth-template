import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory} from 'react-router';

import currentUserQuery from '../../queries/currentUser';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    // whenever a query updates
    componentWillUpdate(nextProps) {
      const { data } = nextProps;

      if (!data.loading && !data.currentUser) {
        hashHistory.push('/login');
      }
    }
    render() {
      console.log(this.props.data)
      return <WrappedComponent {...this.props} />
    }
  }
  return graphql(currentUserQuery)(RequireAuth)
}
