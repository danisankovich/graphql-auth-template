const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const SubmissionType = new GraphQLObjectType({
  name: 'SubmissionType',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }
});

module.exports = SubmissionType;
