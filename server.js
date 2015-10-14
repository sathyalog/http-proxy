var http = require('http');
var httpProxy = require('http-proxy');
var url = require('url');
var proxy = httpProxy.createProxy();
// Create your proxy server and set the target in the options.
//
//httpProxy.createProxyServer({target:'http://localhost:9000'}).listen(8000);
//httpProxy.createProxyServer({target:'http://www.google.com'}).listen(8000);

//
// Create your target server
//
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
//   res.end();
// }).listen(9000);

var app = http.createServer(function(req, res) {

  var hostname = req.headers.host.split(":")[0];
  var portname = req.headers.host.split(":")[1];
  var pathname = url.parse(req.url).pathname;
  
  // Options for the outgoing proxy request.
   var options = { host: hostname };
  
  // Routing logic
   if(pathname == "/") {
    options.port = 3003;
  } else if(pathname == "/upload") {
    options.port = 3002;
    options.path = "/"; 
  } else {
    options.port = 3001;
  }
  // (add more conditional blocks here)
 var targetURL = "http://"+hostname +":"+options.port;
   proxy.web(req, res, {
        target: targetURL
        
    });
console.log(req.headers.host.split(":")[0]+":"+options.port);
});

app.listen(3000);

console.log("Proxy listening on port 3000");