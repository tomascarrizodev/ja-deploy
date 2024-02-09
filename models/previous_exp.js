const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const previousExpSchema = new mongoose.Schema({
  "previous_exp_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "previous_exps": [previousExpsSchema]
})
const PreviousExp = mongoose.model('PreviousExp', previousExpSchema)

const previousExpsSchema = new mongoose.Schema({
  "previous_exp_main_id": {
    type: ID
  },
  "previous_exp_id": {
    type: ID,
    ref: 'PreviousExp'
  },
  "job_position": String,
  "company": String,
  "duration": Date,
  "responsabilities": [String]
})

previousExpsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.previous_exp_main_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
previousExpSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.previous_exp_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const PreviousExps = mongoose.model('PreviousExps', previousExpsSchema) 

module.exports = { PreviousExp, PreviousExps }