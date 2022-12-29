// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
//console.log(JSON.stringify(req.header));

// var ip = req.headers['x-real-ip']; undefined
// var ip2 = req.headers['x-client-ip']; undefined
// var ip3 = req.headers['x-forwarded-for']; undefined

// your first API endpoint...
app.get('/api/whoami', function (req, res) {

//var myIp = req.ip;
//res.send(myIp); gives 127... on render
// var ip3 = req.headers['x-forwarded-for'].split(",")[0]; 

var cfConnecting = req.headers['cf-connecting-ip']; // works as is behind nginx proxy(?)
var language = req.headers['accept-language'];
var agent = req.headers['user-agent'];

res.json({ipaddress: cfConnecting, language: language, software: agent })

});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
