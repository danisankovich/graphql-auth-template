const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./user_type');
const SubmissionType = require('./submission_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    testField: { type: GraphQLID },
    currentUser: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    submission: {
      type: SubmissionType,
      resolve(parentValue, args, req) {
        return { parentValue, args, req };
      }
    }
  }
});

module.exports = RootQueryType;
