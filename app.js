const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Registers a middleware which parses the req.body before calling next()
// and passing on to next middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
  console.log('This is middleware that always runs before calling "next" and passing on to next middleware')
  next();
});

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'); // express will interpret and add header for text/html
});

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

// '/' must go last because every route will be matched with 'starts with' '/'
app.use('/', (req, res, next) => {
  res.send('<p>Hello from Express!</p>'); // express will infer and add header for text/html
});

// calling listen will keep the server running
app.listen(3000);
