const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const genderSchema = new mongoose.Schema({
  "gender_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "profile_id": {
    type: ID,
    ref: 'Profile'
  },
  "gender": String,
  "private": Boolean
})

genderSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.gender_id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Gender', genderSchema)