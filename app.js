const http = require('http');

const express = require('express');

const app = express();

const server = http.createServer(app);

// calling listen will keep node running
server.listen(3000);
