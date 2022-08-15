const express = require('express');
const shopController = require('../controllers/shop');

// Router is like a mini express app which is able to be plugged in
// to main express instance.
const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/checkout', shopController.getCheckout);

module.exports = router;