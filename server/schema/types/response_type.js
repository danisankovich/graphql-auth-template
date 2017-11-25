const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = graphql;
const Response = mongoose.model('response');

const ResponseType = new GraphQLObjectType({
  name:  'ResponseType',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    username: { type: GraphQLString },
    helpful: { type: GraphQLInt },
    song: {
      type: require('./submission_type'),
      resolve(parentValue) {
        return Response.findById(parentValue).populate('submission')
          .then(response => {
            return response.submission
          });
      }
    }
  })
});

module.exports = ResponseType;
