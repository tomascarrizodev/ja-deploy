const mongoose = require('mongoose')
const ID = mongoose.Schema.Types.ObjectId

const coursesSchema = new mongoose.Schema({
  "courses_id": {
    type: ID
  },
  "user_id": {
    type: ID,
    ref: 'User'
  },
  "courses": [courseSchema]
})

const Courses = mongoose.model('Courses', coursesSchema)

const courseSchema = new mongoose.Schema({
  "course_id": {
    type: ID
  },
  "courses_id": {
    type: ID,
    ref: 'Courses'
  },
  "course_title": String,
  "company": String,
  "duration": Date,
  "description": String
})

coursesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.courses_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
courseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.course_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Course = mongoose.model('Course', courseSchema)

module.exports = { Courses, Course }