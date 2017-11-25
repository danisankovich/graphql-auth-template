import gql from 'graphql-tag';

export default gql`
  query fetchSubmission($id: ID!) {
    submission(id: $id) {
      id
      username
      title
      content
      responses {
        id
        userId
        username
        content
        helpful
      }
    }
  }
`;
