const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');

const app = express();

// Set global config value on express app
app.set('view engine', 'ejs');
// Telling express app that the views are in the /views dir.
// This is the default location express would look for,
// but leaving here as an example.
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Registers a middleware which parses the req.body before calling next()
// and passing on to next middleware
app.use(bodyParser.urlencoded({ extended: false }));
// pass in a folder we want to grant read access to.
// we want to grant access to the public dir so in the HTML
// files we can reference the stylesheets
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

// catch all filter for any requests that don't match any routes
app.use((req, res, next) => {
  res.render('404', {docTitle: 'Page Not Found', path: '' });
});

// calling listen will keep the server running
app.listen(3000);
