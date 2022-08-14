const express = require('express');

const productsController = require('../controllers/products');

// Router is like a mini express app which is able to be plugged in
// to main express instance.
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;