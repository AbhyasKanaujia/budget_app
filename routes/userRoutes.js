// routes/userRoutes.js

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

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

      // Check if the email is already registered
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' })
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

module.exports = router
