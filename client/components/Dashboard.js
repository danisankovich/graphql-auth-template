import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import currentUserQuery from '../queries/currentUser';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="row">
        <div className="col s12">
          {data.currentUser && <h3>Welcome {data.currentUser.email}</h3>}
        </div>
        <div className="col s12">
          {data.currentUser && data.currentUser.submissions.map((submission) =>
              <h4 key={submission.id}>{submission.title}</h4>
          )}
        </div>
      </div>

    );
  }
}

export default Dashboard;
