import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory, Link } from 'react-router';

import SubmissionForm from './SubmissionForm';

require("../css/styles.css")

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    }
  }

  showForm() {
    this.setState({showForm: true, showDescription: false});
  }

  showDescription(status) {
    this.setState({showDescription: status});
  }

  closeForm(e, type) {
    if ((type === 'submitted') || (e.target.className === 'submissionFormContainer' && type === 'offClick') || (type === 'closeButton')) {
      this.setState({showForm: false});
    }
  }

  render() {
    const { showForm } = this.state;
    const { data } = this.props;

    return (
      <div className={"row adjustment" + (showForm ? ' formStatus' : '')}>
        <div className="col s12">
          {data.currentUser && <h3
            className="sameLine">
              Welcome {data.currentUser.username} ({data.currentUser.email})
              <div
                onClick={this.showForm.bind(this, this.state.showForm)}
                onMouseEnter={this.showDescription.bind(this, true)}
                onMouseLeave={this.showDescription.bind(this, false)}
                className="btn-floating btn-large red newSubmissionButton inlined"
                ><i className="material-icons">add</i></div>
                {this.state.showDescription && <div className="inlined addDescriptor">
                  <div className="arrow-left inlined"></div>
                  <div className="inlined boundary">Submit A Thought</div>
                </div>}
            </h3>}

        </div>
        <div className="col s12">
          {data.currentUser && data.currentUser.submissions && data.currentUser.submissions.map((submission) => {
            let { content, id, title, responses } = submission;
            if (content.length > 99) {
              content = `${content.substr(0, 98)}...`
            }
            if (title.length > 15) {
              title = `${title.substr(0, 14)}...`
            }
            const titleWords = title.split(/[\s\-\/]/g);
            const uppedTitle = titleWords.map(word =>
              `${word.substr(0, 1).toUpperCase() + word.substr(1, word.length)}`
            ).join(' ');

            return (
              <div className="col s12 m6 l4 mySub" key={id}>
                <Link to={id}>
                  <div className="card">
                    <div className="card-content">
                      <div className="card-title">
                        {uppedTitle} <span className="response-count">({responses.length})</span>
                      </div>
                      <p className="link-content">{content}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
        {showForm && <div>
          <SubmissionForm {...this.props } closeForm={this.closeForm.bind(this)} />
        </div>}
      </div>

    );
  }
}

export default Dashboard;
