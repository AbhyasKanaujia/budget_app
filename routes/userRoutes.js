// routes/userRoutes.js

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

// User registration endpoint
router.post(
  '/register',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],
  async (req, res) => {
    // Validation errors handling
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { username, email, password, name } = req.body

      // Check if the email or username is already registered
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      })

      if (existingUser) {
        // Determine whether the duplicate value is an email or username
        if (existingUser.email === email) {
          return res.status(409).json({ error: 'Email already exists' })
        } else {
          return res.status(409).json({ error: 'Username already taken' })
        }
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create a new user instance
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        name,
      })

      // Save the new user to the database
      await newUser.save()

      res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
      console.error('User registration error:', error)
      res.status(500).json({ error: 'Server error' })
    }
  }
)

// User Login
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  async (req, res) => {
    // Validation errors handling
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { email, password } = req.body

      // Check if the user exists in the database
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Compare the input password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Generate a JSON Web Token (JWT)
      const token = jwt.sign({ userId: user._id }, jwtSecret)

      // Send the JWT as a response
      res.json({ token })
    } catch (error) {
      console.error('User login error:', error)
      res.status(500).json({ error: 'Server error' })
    }
  }
)

module.exports = router
