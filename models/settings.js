const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const settingsSchema = new mongoose.Schema({
  "settings_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "dark_theme": {
    type: Boolean,
    default: false
  },
  "private": {
    type: Boolean,
    default: true
  } 
})

settingsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.settings_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Settings', settingsSchema)