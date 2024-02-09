const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const contactSchema = new mongoose.Schema({
  "contact_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "email_id": {
    type: ID,
    ref: 'Email'
  },
  "phone_id": {
    type: ID,
    ref: 'Phone'
  },
  "social_net_id": {
    type: ID,
    ref: 'SocialNet'
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.contact_id = returnedObject._id 
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Contact', contactSchema)