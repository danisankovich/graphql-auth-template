import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/currentUser';
import mutation from '../mutations/addSubmission';

class SubmissionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        userId: this.props.data.currentUser.id,
        username: this.props.data.currentUser.username,
        content: this.state.content,
        title: this.state.title,
      },
      refetchQueries: [{ query: currentUserQuery }]
    }).then(() => {
      this.setState({title: '', content: ''});
      this.props.closeForm({target: {}}, 'submitted');
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="submissionFormContainer" onClick={(e) => this.props.closeForm(e, 'offClick')}>
        <div className="submissionFormInner">
          <i
            onClick={(e) =>this.props.closeForm(e, 'closeButton')}
            className="material-icons right closeColor">close<
          /i>
          <h3>Get It Off Your Back</h3>
          <form onSubmit={this.onSubmit.bind(this)}>
            <label>Title: </label>
            <input
              onChange={event => this.setState({title: event.target.value})}
              value={this.state.title}
            />

          <label htmlFor="textarea1">Body: </label>
              <textarea
                id="textarea1"
                className="materialize-textarea"
                onChange={event => this.setState({content: event.target.value})}
                value={this.state.content}
              ></textarea>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action">
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default graphql(mutation)(SubmissionForm);
