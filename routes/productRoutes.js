const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


const checkApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey !== 'abcd-efgh-ijlk-1234') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};

router.get('/categories', checkApiKey, productController.getCategories);
router.get('/list', checkApiKey, productController.getProductsByCategory);
router.post('/save', checkApiKey, productController.addProduct);

module.exports = router;


