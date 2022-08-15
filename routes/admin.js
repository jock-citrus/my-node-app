const express = require('express');

const adminController = require('../controllers/admin');

// Router is like a mini express app which is able to be plugged in
// to main express instance.
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

module.exports = router;