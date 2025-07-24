const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Dummy auth (can be upgraded to JWT)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) user = await User.create({ email, password });
  else if (user.password !== password)
    return res.status(401).json({ success: false, message: 'Invalid credentials' });

  res.json({ success: true, user });
});

module.exports = router;
