const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const SubmissionType = require('./submission_type');
const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    submissions: {
      type: new GraphQLList(SubmissionType),
      resolve(parentValue) {
        return User.findSubmissions(parentValue.id);
      }
    }
  }
});

module.exports = UserType;
