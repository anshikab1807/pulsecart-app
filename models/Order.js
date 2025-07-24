const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: String,
  products: [Object],
  totalAmount: Number,
  address: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
