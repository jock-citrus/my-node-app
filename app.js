const http = require('http');

// This function will be executed whenever a request reaches the server.
function requestListener(req, res) {
  console.log(req.url, req.method, req.headers)
  // type of content which is part of response is HTML
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js server!</h1></body>');
  res.write('</html>');
  // Nothing else after end, because end is when server will send response to client.
  res.end();
}

const server = http.createServer(requestListener);

// calling listen will keep node running
server.listen(3000);
