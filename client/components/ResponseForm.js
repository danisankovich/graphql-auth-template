import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import mutation from '../mutations/addResponse';
import fetchSubmission from '../queries/submission';

class ResponseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  changeForm(e) {
    this.setState({input: e.target.value})
  }

  submitResponse(e) {
    e.preventDefault();

    this.props.mutate({
      variables: {
        userId: this.props.currentUser.id,
        username: this.props.currentUser.username,
        content: this.state.input,
        submissionId: this.props.submissionId
      },
      refetchQueries: [
        {
          query: fetchSubmission,
          variables: { id: this.props.submissionId }
        }
      ]
    }).then(() => {
      this.setState({input: ''});
    }).catch(res => {
      console.log(res)
      const errors = res.graphQLErrors.map((error) => {
        return error.message;
      });
    })
  }
  render() {
    return (
      <div className="textarea-container">
        <form onSubmit={this.submitResponse.bind(this)}>
          <textarea
            placeholder="Provide a response"
            className="response-textarea"
            onChange={this.changeForm.bind(this)}
            value={this.state.input}
          >
          </textarea>
          <div className="SCB-creed">
            At Secular Confession Booth we strive to create a positive atmosphere
            of help and understanding. If you have any insight or words of encouragement
            to provide, please do so. And remember, always be kind, respectful, and honest.
          </div>
          <button type="submit" className="save-response-button">Save</button>
        </form>
      </div>
    )
  }
}

export default graphql(mutation)(ResponseForm);
