const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  try {
    // Check how to use either username or email
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password_hash)
    
    if (!(user && passwordCorrect)) {
      return response.status(401).json({ error: 'invalid username or password' })
    }

    const userToken = {
      username: user.username,
      id: user._id
    }

    // think of adding an expiration time
    // check if it is best to store the token in localStorage or somewhere else
    // check what is server-side login token (investigate)
    const token = jwt.sign(userToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username })
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = loginRouter