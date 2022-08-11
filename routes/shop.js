const express = require('express');
const adminData = require('./admin');

// Router is like a mini express app which is able to be plugged in
// to main express instance.
const router = express.Router();

// if using .use, '/' must go last because every route will be matched with 'starts with' '/'
// when using .get, it needs to be an exact match, so can go in any order
router.get('/', (req, res, next) => {
  const { products } = adminData;
  // render will use templating engine defined in app.js, and will look in views dir for templating
  // file of same name. This will render shop.pug.
  res.render('shop', {
    docTitle: 'Shop',
    path: '/admin/shop',
    prods: products
  })
});

module.exports = router;