const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const bootcampsSchema = new mongoose.Schema({
  "bootcamps_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "bootcamps": [bootcampSchema]
})

const Bootcamps = mongoose.model('Bootcamps', bootcampsSchema)

const bootcampSchema = new mongoose.Schema({
  "bootcamp_id": {
    type: ID
  },
  "bootcamps_id": {
    type: ID,
    ref: 'Bootcamps'
  },
  "bootcamp_title": String,
  "company": String,
  "duration": Date,
  "description": String
})

bootcampsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.bootcamps_id = returnedObject._id 
    delete returnedObject._id
    delete returnedObject.__v
  }
})
bootcampSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.bootcamp_id = returnedObject._id 
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Bootcamp = mongoose.model('Bootcamp', bootcampSchema)

module.exports = { Bootcamps, Bootcamp }