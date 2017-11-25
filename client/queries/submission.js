import gql from 'graphql-tag';

export default gql`
  query fetchSubmission($id: ID!) {
    submission(id: $id) {
      id
      title
      content
      responses {
        id
        userId
        username
        content
      }
    }
  }
`;
