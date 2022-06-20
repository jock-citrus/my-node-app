const http = require('http');

// This function will be executed whenever a request reaches the server.
function requestListener(req, res) {
  const url = req.url;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
    res.write('</html>');
    // return not needed to return response, but to exit the function
    return res.end();  
  }
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
