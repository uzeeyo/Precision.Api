const express = require('express');
const { getAllProducts, searchProducts, addProduct, editProduct, deleteProduct } = require('../controllers/productController');
const { route } = require('./customerRouter');

const router = express.Router();

//parent server/api/products/*** 
router.get('/search', searchProducts);
router.get('/', getAllProducts);
router.post('/', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct);

module.exports = router;