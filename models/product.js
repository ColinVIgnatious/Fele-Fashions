const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: { type: Number, required: true, unique: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
  brand: { type: String, required: true },
  categoryId: { type: Number, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
