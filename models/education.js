const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const educationSchema = new mongoose.Schema({
  "education_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: "User"
  },
  "title": String,
  "university": String,
  "max_level": String,
  "courses_id": {
    type: ID,
    ref: 'Courses'
  },
  "bootscamps_id": {
    type: ID,
    ref: 'Bootcamps'
  }
})

educationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.education_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Education', educationSchema)