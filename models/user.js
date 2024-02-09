const mongoose = require('mongoose')
const countries = require('../utils/countriesArray')
const ID = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  "user_id": {
    type: ID
  },
  "username": {
    type: String,
    required: true,
    unique: true,
    minLength: [4, "Username must be atleast 4 characters long"],
    maxLength: [20, "Username can't be more than 20 characters long"],
    match: [/^[a-z1-9]+$/, "Username is invalid"]
  },
  "email": {
    type: String,
    required: true,
    unique: true,
    match: [/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, "Email is invalid"]
  },
  "firstname": {
    type: String,
    maxLength: [30, "Firstname can't be larger than 30 characters long"],
    match: [/^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/, "Firstname is invalid"],
    trim: true,
    required: true
  },
  "lastname": {
    type: String,
    maxLength: [30, "Lastname can't be larger than 30 characters long"],
    match: [/^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/, "Lastname is invalid"],
    trim: true,
    required: true
  },
  "password_hash": {
    type: String,
    required: true,
    minLength: [8, "Password must be atleast 8 characters long"],
    maxLength: [30, "Password can't be more than 30 characters long"]
  },
  "country": {
    type: String,
    required: true,
    enum: countries
  },
  "birthday": {
    type: String,
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, "Birthday is invalid"]
  },
  "address_id": {
    type: ID,
    ref: 'Address'
  },
  "contact_id": {
    type: ID,
    ref: 'Contact'
  },
  "education_id": {
    type: ID,
    ref: 'Education'
  },
  "experience_id": {
    type: ID,
    ref: 'Experience'
  },
  "profile_id": {
    type: ID,
    ref: 'Profile'
  },
  "settings_id": {
    type: ID,
    ref: 'Settings'
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.user_id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)