import gql from 'graphql-tag';

export default gql`
  mutation AddSubmission($userId: ID, $content: String, $title: String) {
    addSubmission(userId: $userId, content: $content, title: $title) {
      id
    }
  }
`;
