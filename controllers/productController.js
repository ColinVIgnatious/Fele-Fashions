const Category = require('../models/category');
const Product = require('../models/product');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({
      totalCategories: categories.length,
      categories: categories
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const category = await Category.findOne({ categoryId });
    const products = await Product.find({ categoryId });
    res.json({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      products: products
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.addProduct = async (req, res) => {
    const { productName, price, productImage, brand, categoryId } = req.body;
    try {

      const lastProduct = await Product.findOne().sort({ productId: -1 });
      const productId = lastProduct ? lastProduct.productId + 1 : 1;
  
      console.log('Received product data:', { productId, productName, price, productImage, brand, categoryId });
      
      const product = new Product({ productId, productName, price, productImage, brand, categoryId });
      await product.save();
      res.json({ message: 'Product saved successfully' });
    } catch (error) {
      console.error('Error saving product:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };