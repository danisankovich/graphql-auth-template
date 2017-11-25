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
  username: String,
  responseIds: [{
    type: Schema.Types.ObjectId,
    ref: 'response'
  }]
});

SubmissionSchema.statics.addResponse = function(userId, submissionId, content, username) {
  const Response = mongoose.model('response');

  return this.findById(submissionId)
    .then(submission => {
      const response = new Response({ userId, submission: submissionId, content, username })

      submission.responseIds.push(response)

      return Promise.all([response.save(), submission.save()])
        .then(([response, submission]) => submission);
    });
}

SubmissionSchema.statics.findResponses = async function(id) {
  const User = mongoose.model('user');

  const submission = await this.findById(id).populate('responseIds');

  return submission.responseIds;
}

mongoose.model('submission', SubmissionSchema);
