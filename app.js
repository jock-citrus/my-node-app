const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Registers a middleware which parses the req.body before calling next()
// and passing on to next middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

// calling listen will keep the server running
app.listen(3000);
