const express = require('express');
const router = express.Router();

let userCart = {};

router.post('/add', (req, res) => {
  const { userId, product } = req.body;
  if (!userCart[userId]) userCart[userId] = [];
  userCart[userId].push(product);
  res.json({ success: true, cart: userCart[userId] });
});

router.get('/:userId', (req, res) => {
  const cart = userCart[req.params.userId] || [];
  res.json(cart);
});

module.exports = router;
