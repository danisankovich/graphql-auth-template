const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;
const UserType = require('./types/user_type');
const SubmissionType = require('./types/submission_type');
const AuthService = require('../services/auth');
const User = mongoose.model('user');
const Submission = mongoose.model('submission');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { username, email, password }, req) {
        return AuthService.signup({ username, email, password, req })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { username, password }, req) {
        return AuthService.login({ username, password, req });
      }
    },
    addSubmission: {
      type: UserType,
      args: {
        content: { type: GraphQLString },
        title: { type: GraphQLString },
        userId: { type: GraphQLID },
        username: { type: GraphQLString}
      },
      resolve(parentValue, { content, username, userId, title }) {
        return User.addSubmission(userId, username, content, title);
      }
    },
    addResponse: {
      type: SubmissionType,
      args: {
        content: { type: GraphQLString },
        userId: { type: GraphQLID },
        username: { type: GraphQLString },
        submissionId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, username, submissionId, content }, req) {
        return Submission.addResponse(userId, submissionId, content, username);
      }
    }
  }
})

module.exports = mutation;
