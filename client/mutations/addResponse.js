import gql from 'graphql-tag';

export default gql`
  mutation AddResponse($userId: ID, $username: String, $content: String, $submissionId: ID) {
    addResponse(userId: $userId, username: $username, content: $content, submissionId: $submissionId) {
      id
    }
  }
`;
