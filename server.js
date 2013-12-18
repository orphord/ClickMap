var express = require('express')
, http = require('http')
, path = require('path')
, passport = require('passport')
, ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
, middlewares = require('./config/middlewares');


var app = express();

// Initialize middleware
app.configure(function() {
	app.use(middlewares.cookieParser);
	app.use(middlewares.session);
	app.use(middlewares.initPassport);
	app.use(middlewares.passportSession);
	app.use(app.router);
});

// Define routes including a secured route to everything
app.all('/',
	ensureLoggedIn('/login'),
				function(req, res, next) {
					console.log('Successful Login callback');
					next();
				});
app.use('/', express.static(path.join(__dirname, '/public')));
require('./config/routes')(app);
require('./config/protect')(app);

// spin up server
var listenPort = (process.env.VMC_APP_PORT || 1337);
app.listen(listenPort);

console.log('Node server listening at port: ' + listenPort);
