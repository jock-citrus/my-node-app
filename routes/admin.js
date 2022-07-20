const express = require('express');

// Router is like a mini express app which is able to be plugged in
// to main express instance.
const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'); // express will interpret and add header for text/html
});

// Trigger only for incoming post requests
router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;