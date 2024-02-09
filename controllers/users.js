const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')

// Get users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Create a user
userRouter.post('/register', async (request, response) => {
  try {
    const { username, firstname, lastname, email, password, birthday, country } = request.body

    const emailRegistered = await User.findOne({ email })
    console.log(emailRegistered)
    if (emailRegistered) 
      return response.status(400).json({ error: 'email already registered' })

    const userRegistered = await User.findOne({ username })
    if (userRegistered)
      return response.status(400).json({ error: 'username already taken' })

    const password_hash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      firstname,
      lastname,
      email,
      birthday,
      password_hash,
      country
    })

    await user.save()

    response.status(201).json({ username, email, name: `${firstname} ${lastname}` })
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

// Delete user
userRouter.delete('/delete/:id', async (request, response) => {
  try {
    let decodedToken
    try {
      decodedToken = jwt.verify(request.token, process.env.SECRET)
    } catch (error) {
      return response.status(401).json({ error: 'invalid token' })
    }

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token 2' })
    }
    
    const user = await User.findById(request.params.id)
    console.log(user)
    const passwordUser = user.password_hash
    console.log(passwordUser)
    
    if (!passwordUser) {
      return response.status(401).json({ error: 'user not found' })
    }

    const passwordRequest = request.body.password
    const passwordCorrect = await bcrypt.compare(passwordRequest, passwordUser)
    if (!passwordCorrect) {
      return response.status(401).json({ error: 'password incorrect' })
    }

    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()

  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

// Edit user
userRouter.put('/update/:id', async (request, response) => {
  try {
    try {
      jwt.verify(request.token, process.env.SECRET)
    } catch (error) {
      return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(request.params.id)
    await User.findByIdAndUpdate(request.params.id, { ...user, ...request.body }, { new: true, runValidators: true, context: 'query' })
    response.status(201).json({ ...user, ...request.body })
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = userRouter