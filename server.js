var express = require('express')
, http = require('http')
, path = require('path');


var app = express();

app.use(express.static(__dirname + '/public'));

require('./config/routes')(app);

// spin up server
var listenPort = (process.env.VMC_APP_PORT || 1337);
app.listen(listenPort);

console.log('Node server listening at port: ' + listenPort);
