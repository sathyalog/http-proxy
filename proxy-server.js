var http = require("http");

http.createServer(function(req, res) {
  res.end("Request received on 3001");
}).listen(3001);

http.createServer(function(req, res) {
  res.end("Request received on 3002");
}).listen(3002);


http.createServer(function(req, res) {
  res.end("Request received on 3003");
}).listen(3003);