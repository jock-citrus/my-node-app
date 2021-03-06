const express = require('express');
const path = require('path');

const rootDir = require('../util/path')
// Router is like a mini express app which is able to be plugged in
// to main express instance.
const router = express.Router();

const products = [

];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;