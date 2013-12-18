//#######################
// A container for middleware functions
//#######################
var express = require('express')
, passport = require('passport')

module.exports = {
	cookieParser: express.cookieParser(),
	session: express.session({secret: 'yo mama'}),
	initPassport: passport.initialize(),
	passportSession: passport.session()
}