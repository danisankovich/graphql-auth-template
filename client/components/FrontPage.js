import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory, Link } from 'react-router';

import fetchAllSubmission from '../queries/submissions';

require("../css/styles.css")

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    }
  }

  toSubmission(id) {
    hashHistory.push(id);
  }

  render() {
    const { showForm } = this.state;
    const { data } = this.props;

    const toUpperCase = (title) => {
      const titleWords = title.split(/[\s\-\/]/g);
      return titleWords.map(word =>
        `${word.substr(0, 1).toUpperCase() + word.substr(1, word.length)}`
      ).join(' ');
    }

    return (<div>
      {data && !data.loading && <div>
        {data.submissions.map((e, i) => {
          let { title, id, responseIds } = e;

          return (
            <div className="col s12 m10 l10" key={id}>
              <div className="submission-holder" onClick={this.toSubmission.bind(this, id)}>
                <div className="array-index col s1 m1 l1">{i}) </div>
                <div className="submission-data col s11 m9 l9">
                  <a>{toUpperCase(title)}</a>

                  <div className="responseCounter hide-on-large-only">({responseIds.length})</div>
                  <div className="responseCounter hide-on-med-and-down">Responses: {responseIds.length}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>}
      {(!data || data.loading) && <div>

      </div>}
    </div>
    );
  }
}

export default graphql(fetchAllSubmission)(FrontPage);
