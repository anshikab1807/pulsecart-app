const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  const { userId, products, totalAmount, address } = req.body;
  const order = await Order.create({ userId, products, totalAmount, address });
  res.json({ success: true, order });
});

module.exports = router;
