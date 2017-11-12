const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const SubmissionSchema = new Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  responses: {
    type: Schema.Types.ObjectId,
    ref: 'response'
  }
});

mongoose.model('submission', SubmissionSchema);
