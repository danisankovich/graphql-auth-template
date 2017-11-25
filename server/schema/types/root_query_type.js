const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = graphql;
const UserType = require('./user_type');
const SubmissionType = require('./submission_type');
const ResponseType = require('./submission_type');

const Submission = mongoose.model('submission');
const Response = mongoose.model('response');

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
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }, req) {
        return Submission.findById(id);
      }
    },
    submissions: {
      type: new GraphQLList(SubmissionType),
      resolve(parentValue, args, req) {
        // return Submission.find({}).skip(Submission.count() - 20);
        return Submission.find();
      }
    },
    response: {
      type: ResponseType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Response.findById(id);
      }
    }
  }
});

module.exports = RootQueryType;
