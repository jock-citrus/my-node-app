const http = require('http');
const routes = require('./routes')

const server = http.createServer(routes);

// calling listen will keep node running
server.listen(3000);
