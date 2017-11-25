import gql from 'graphql-tag';

export default gql`
  {
    submissions {
      id
      title
      username
      content
      responseIds
    }
  }
`;
