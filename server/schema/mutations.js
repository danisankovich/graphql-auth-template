const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;
const UserType = require('./types/user_type');
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
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req })
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
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
    addSubmission: {
      type: UserType,
      args: {
        content: { type: GraphQLString },
        title: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parentValue, { content, userId, title }) {
        return User.addSubmission(userId, content, title);
      }
    },
    // getSubmission: {
    //   type: UserType,
    //   args: {
    //     userId: { type: GraphQLID },
    //     submissionIds: { type: GraphQLList }
    //   },
    //   resolve(parentValue, { userId }) {
    //     return User.getSubmissions(userId)
    //   }
    // }
  }
})

module.exports = mutation;
