const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const profileSchema = new mongoose.Schema({
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "profile_id": {
    type: ID
  },
  "presentation": String,
  "firstname": String,
  "lastname": String,
  "birthdate": Date,
  "lenguages": [String],
  "gender_id": {
    type: ID,
    ref: 'Gender'
  }
})

profileSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.profile_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Profile', profileSchema)