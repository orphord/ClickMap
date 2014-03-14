//#######################
// A library of functions to encapsulate application security
//#######################

var passport = require('passport'),
orfFun = require('../../OrfLib/commonFunctions'),
TwitterStrategy = require('passport-twitter').Strategy,
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
express = require('express'),
path = require('path');

// When a user logs in the user record is saved in the session; if user record
// is stored in the DB maybe only the userID needs to be serialized
passport.serializeUser(function(user, done) {
	console.log('serializing user');
  done(null, user.id);
});
passport.deserializeUser(function(obj, done) {
	console.log('DEserializing obj: ' + obj.toString());
  done(null, obj);
});


module.exports = function(app) {
	console.log('Initializing protect exports');
	
	app.get('/login', function(req, res) {
		console.log('Login route engaged');
		res.sendfile(path.resolve(__dirname, '../public/login.html'));
	});

	// Google login routes
	app.get('/auth/google',
					passport.authenticate('google',
																{scope: ['https://www.googleapis.com/auth/userinfo.profile'] }),
					function(req, res) {
						console.log('This should never be called because Google is authenticating');
					}
				 );

	app.get('/auth/google/return',
					passport.authenticate('google', { failureRedirect: '/login' }),
					function(req, res) {
						console.log('In the google success redirection');
						res.redirect('/');
					}
				 );

	// Twitter login routes
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', 
					passport.authenticate('twitter', 
																{ successReturnToOrRedirect: '/',
																	failureRedirect: '/login' }),
					function(req, res) {
						console.log('In the twitter success redirection');
						res.redirect('/');
					}
				 );
};

var GOOGLE_CLIENT_ID = '924997112203-6c86b3j4s0rvbusa70mdfe13hnnlul3e.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = 'm0_oHHXpvN-39oiWjZHc8NxY';
passport.use(new GoogleStrategy( {
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: 'http://127.0.0.1:1337/auth/google/return'

  },
 function(accessToken, refreshToken, profile, done) {
	 process.nextTick(function() {
		 return done(null, profile);
	 });
 })
);

var TWITTER_KEY = 'f4B4ZE2zHz8tEZMOv523PA';
var TWITTER_SECRET = 'wggrpmVihyAqFojXTKD4aQ6cck57QJhdFf1Zhghjdo';
passport.use(new TwitterStrategy({
	consumerKey: TWITTER_KEY,
	consumerSecret: TWITTER_SECRET,
	callbackURL: 'http://127.0.0.1:1337/auth/twitter/callback'

},
	function(token, tokenSecret, profile, done) {
		console.log("Twitter strategy callback...");
		// probably want to store twitter profile w/ user in db
		var user = profile;
		return done(null, user);
	}
));
