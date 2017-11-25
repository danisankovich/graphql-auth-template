const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const ResponseSchema = new Schema({
  content: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  submission: {
    type: Schema.Types.ObjectId,
    ref: 'submission'
  }
});

// ResponseSchema
//   .pre('findOne', function() {
//     this.populate('user')
//   })
//   .pre('find', function() {
//     this.populate('user')
//   })
// ResponseSchema.statics.findUser = async function(id) {
//   const User = mongoose.model('user');
//
//   const user = await User.findById(id);
//   return user;
// }

mongoose.model('response', ResponseSchema);
