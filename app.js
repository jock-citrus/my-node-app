const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const rootDir = require('./util/path')

const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Registers a middleware which parses the req.body before calling next()
// and passing on to next middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// catch all filter for any requests that don't match any routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', 'page-not-found.html'));
})

// calling listen will keep the server running
app.listen(3000);
