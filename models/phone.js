const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const phoneSchema = new mongoose.Schema({
  "phone_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "contact_id": {
    type: ID,
    ref: 'Contact'
  },
  "country": {
    type: String,
    ref: 'User'
  },
  "phone_code": Number,
  "phone_number": Number,
  "private": Boolean
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.phone_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema)