const fs = require('fs');
const http = require('http');

// This function will be executed whenever a request reaches the server.
function requestListener(req, res) {
  const { url, method } = req;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
    res.write('</html>');
    // return not needed to return response, but to exit the function
    return res.end();  
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    // Every time a chunk of incoming data from a request has been parsed, the below
    // method will be executed. Here we are collecting all data from the request
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    // Executed when finished parsing the request (end event listener on req). This will actually happen
    // after the response has been sent. This means if we are doing something inside of the the
    // req.on('end') listener, then we should move return res.end() inside of the listener.
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString(); // message=<message>
      const message = parsedBody.split('=')[1]; // actual message
      fs.writeFileSync('message.txt', message); // write message to file
    });
    // write multiple Header metadata in one go
    // Can also be written as res.statusCode = 302 and then use res.setHeader for each header.
    // Location redirects req back to '/' route (above)
    res.writeHead(302, { 'Location': '/' })
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
