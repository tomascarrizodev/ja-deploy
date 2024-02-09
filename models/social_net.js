const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const socialNetsSchema = new mongoose.Schema({
  "social_nets_id": {
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
  "social_net": [socialNetSchema]
})

const SocialNets = mongoose.model('SocialNets', socialNetsSchema)

socialNetsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.social_nets_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const socialNetSchema = new mongoose.Schema({
  "social_net_id": {
    type: ID
  },
  "social_nets_id": {
    type: ID,
    ref: 'SocialNets'
  },
  "contact_id": {
    type: ID,
    ref: 'Contact'
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "social_net_name": String,
  "social_net_url": String
})

socialNetSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.social_net_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const SocialNet = mongoose.model('SocialNet', socialNetSchema)

module.exports = { SocialNets, SocialNet }