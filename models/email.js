const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const emailSchema = new mongoose.Schema({
  "email_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "email": {
    type: String,
    ref: 'User'
  },
  "email_contact": String,
  "private": Boolean
})

emailSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.email_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Email', emailSchema)