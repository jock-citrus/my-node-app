const express = require('express');
const path = require('path');

const rootDir = require('../util/path')
const adminData = require('./admin');

// Router is like a mini express app which is able to be plugged in
// to main express instance.
const router = express.Router();

// if using .use, '/' must go last because every route will be matched with 'starts with' '/'
// when using .get, it needs to be an exact match, so can go in any order
router.get('/', (req, res, next) => {
  // path.join will build the path in a way which works on both Linux and Windows systems.
  console.log(adminData.products);
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;