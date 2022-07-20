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
  // send is an express util function
  res.send('<p>Hello from Express!</p>'); // express will interpret and add header for text/html
});

// calling listen will keep the server running
app.listen(3000);
