const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('This is middleware that always runs before calling "next" and passing on to next middleware')
  next();
})

app.use('/add-product', (req, res, next) => {
  res.send('<p>The "Add Product" Page</p>'); // express will interpret and add header for text/html
});

// '/' must go last because every route will be matched with 'starts with' '/'
app.use('/', (req, res, next) => {
  res.send('<p>Hello from Express!</p>'); // express will infer and add header for text/html
});

// calling listen will keep the server running
app.listen(3000);
