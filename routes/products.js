const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Admin: add product
router.post('/add', async (req, res) => {
  const { name, price, imageUrl } = req.body;
  const product = await Product.create({ name, price, imageUrl });
  res.json({ success: true, product });
});

module.exports = router;
