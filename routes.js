const fs = require('fs');

const requestHandler = (req, res) => {
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
    // Executed when finished parsing the request (end event listener on req).
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString(); // message=<message>
      const message = parsedBody.split('=')[1]; // actual message
      // writeFileSync, as opposed to writeFile, will block code execution until file is created.
      // fs.writeFileSync('message.txt', message);
      // alternatively
      fs.writeFile('message.txt', message, err => {
        // write multiple Header metadata in one go
        // Can also be written as res.statusCode = 302 and then use res.setHeader for each header.
        // Location redirects req back to '/' route (above)
        res.writeHead(302, { 'Location': '/' })
        return res.end();
      });
    });
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

// module.exports = requestHandler;

// or

// module.exports = {
//   requestHandler,
//   someText: 'Some hard coded text'
// }

// or

exports.requestHandler = requestHandler;