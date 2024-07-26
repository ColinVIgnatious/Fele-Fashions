const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Category = require('./models/category');
const Product = require('./models/product');
require('dotenv').config();

const seedData = async () => {
  await connectDB();

  const categories = [
    { categoryId: 1, categoryName: 'Footwear' },
    { categoryId: 2, categoryName: 'T-Shirts' },
    { categoryId: 3, categoryName: 'Jackets' },
    { categoryId: 4, categoryName: 'Jeans' },
  ];

  const products = [
    { productId: 11, productName: 'Jack and Jones Leather boots', price: 4999, productImage: 'https://m.media-amazon.com/images/I/71ZLToAJrYL._AC_UY1000_.jpg', brand: 'Jack and Jones', categoryId: 1 },
    { productId: 12, productName: 'Nike Air Jordans', price: 8999, productImage: 'https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/89c121fc-3d07-4de0-aef6-bcc9c2764a2c/air-jordan-1-2022-lost-and-found-chicago-the-inspiration-behind-the-design.jpg', brand: 'Nike', categoryId: 1 },
    
  ];

  try {
    await Category.insertMany(categories, { ordered: false });
  } catch (error) {
    if (error.code === 11000) {
      console.warn('Duplicate key error ignored');
    } else {
      console.error('An error occurred:', error);
    }
  }

  try {
    await Product.insertMany(products, { ordered: false });
  } catch (error) {
    if (error.code === 11000) {
      console.warn('Duplicate key error ignored');
    } else {
      console.error('An error occurred:', error);
    }
  }

  console.log('Data seeded successfully');
  mongoose.connection.close();
};

seedData();

