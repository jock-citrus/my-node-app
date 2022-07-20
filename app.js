const http = require('http');

const express = require('express');

const app = express();

// next allows the request to continue to the next middleware in line
app.use((req, res, next) => {
  console.log("In middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("In middleware 2");
});

const server = http.createServer(app);

// calling listen will keep node running
server.listen(3000);
