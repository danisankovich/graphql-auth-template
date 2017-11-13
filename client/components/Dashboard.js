import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory, Link } from 'react-router';

require("../css/styles.css")

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { data } = this.props;

    return (
      <div className="row">
        <div className="col s12">
          {data.currentUser && <h3>Welcome {data.currentUser.username} ({data.currentUser.email})</h3>}
        </div>
        <div className="col s12">
          {data.currentUser && data.currentUser.submissions.map((submission) =>
            <Link
              to={submission.id}
              className="submissionItem"
              key={submission.id}
            >{submission.title}</Link>
          )}
        </div>
      </div>

    );
  }
}

export default Dashboard;
