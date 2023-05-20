const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
  // Access authenticated user data
  console.log(req.user); // { id: 'user_id', username: 'john_doe' }

  // Process the protected route logic here

  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;
