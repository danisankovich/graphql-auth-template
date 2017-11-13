import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory, Link } from 'react-router';

import fetchSubmission from '../queries/submission';

require("../css/styles.css")

class Submission extends Component {
  constructor(props) {
    super(props);
  }

  toSubmission(id) {
    hashHistory.push(id);
  }

  render() {
    const { data } = this.props;
    const { submission, loading } = data;

    return (
      <div className="row">
        {!loading && submission && <div>
          <div className="col s12">
            <h3 className="submissionTitle">{submission.title}</h3>
          </div>
          <div className="col s12">
            <p className="submissionContent">{submission.content}</p>
          </div>
          <div className="col s12">
            {(submission.responses || []).map((response) => {
              return (
                <div key={response.id}>
                  <p className="responseContent">{response.content}</p>
                </div>
              )
            })}
          </div>
        </div>}
        {loading && <div></div>}
      </div>

    );
  }
}

export default graphql(fetchSubmission, {
  options: (props) => {
    return {
      variables: {
        id: props.params.id
      }
    }
  }
})(Submission);
