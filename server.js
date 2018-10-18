// This is a comment to test push
var express = require('express')
, http = require('http')
, path = require('path');

// Make express app object
var app = express();

// Set static directory
app.use('/', express.static(path.join(__dirname, '/public')));

// set routes
require('./config/routes')(app);


// spin up server
console.log('about to set port');
app.set('port', process.env.VMC_APP_PORT || 3000);
console.log('about to start server');

app.listen(app.get('port'), function() {
	console.log('Node server listening at port: ' + app.get('port'));
	}
);
console.log('server start')


