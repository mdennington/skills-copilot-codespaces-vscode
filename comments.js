// Create web server
// 1. Load the http module

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = require('./comments');

// 2. Create a server
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    pathname += 'index.html';
  }
  var filePath = path.join(__dirname, pathname);
  fs.readFile(filePath, 'binary', function (err, fileContent) {
    if (err) {
      console.log('404' + filePath);
      res.writeHead(404, 'not found');
      res.end('<h1>404 Not Found</h1>');
    } else {
      console.log('ok' + filePath);
      res.writeHead(200, 'OK');
      res.write(fileContent, 'binary');
      res.end();
    }
  });
}).listen(8080);

console.log('Server has started.');
