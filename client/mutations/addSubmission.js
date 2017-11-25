import gql from 'graphql-tag';

export default gql`
  mutation AddSubmission($userId: ID, $username: String, $content: String, $title: String) {
    addSubmission(userId: $userId, username: $username, content: $content, title: $title) {
      id
    }
  }
`;
