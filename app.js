const http = require('http');

// This function will be executed whenever a request reaches the server.
function requestListener(req, res) {
  console.log(req)
  setTimeout(() => {
    process.exit()
  }, 3000)
}

const server = http.createServer(requestListener);

// calling listen will keep node running
server.listen(3000);