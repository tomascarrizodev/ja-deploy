const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const experienceSchema = new mongoose.Schema({
  "experience_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "responsabilities": [String],
  "experience_field": String,
  "job_position": String,
  "company": String,
  "entrance": Date,
  "desire_position": String,
  "previous_exp_id": {
    type: ID,
    ref: 'PreviousExp'
  }
})

experienceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.experience_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Experience', experienceSchema)