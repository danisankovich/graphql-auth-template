import gql from 'graphql-tag';

export default gql`
  {
    currentUser {
      id
      email
      username
      submissions {
        id
        title
        content
        responseIds
      }
    }
  }`
;
