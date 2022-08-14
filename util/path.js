const path = require('path');

// __dirname is a global variable which holds the absolute path from root of our
// operating system to the directory of file where is referenced. (e.g ../my-node-app/routes/shop.js)
// Here we want to update and override to be an absolute path from OS to
// application level dir. (e.g ../my-node-app)
module.exports = path.dirname(require.main.filename);