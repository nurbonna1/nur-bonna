// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // assumes db.js exports MySQL connection

// Register Route (POST)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const [existingUsers] = await db.promise().query(
      'SELECT * FROM Users WHERE username = ?',
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).send('Username already taken');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await db.promise().query(
      'INSERT INTO Users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
