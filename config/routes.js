var url = require('url');
var dbCreate = require('./db');
var db = dbCreate();

// Function(s) exposed to outside
module.exports = function(app) {
  app.get('/click', function(req, res) {
		console.log('click route URL: ' + req.url);
		clickHandler(req, res);
  });
  app.get('/heat', function(req, res) {
		console.log('heat request URL: ' + req.url);
		heatHandler(req, res);
  });
}

// Function to handle clicks (used by get '/click' route
function clickHandler(req, res) {
  console.log('In handler() function');
  var urlStuff = url.parse(req.url, true);
  var inLoc = urlStuff.query.loc;
  var inApp = urlStuff.query.app;

	// Define and codify location
  var location = mapLocToDBLoc(inLoc.toString());

	// set timestamp
  var timest = new Date().getTime();

	// insert data to mongodb
  var reslt = db.hot.insert({'loc':location, 'app':inApp, 'time':timest});
  console.log("RESULT: " + reslt);

	// create response to return to client
  res.writeHead(200, {'Content-Type': 'text/javascript'});
  res.end('toRun(\'{\"loc\": [' 
					+ location 
					+ '], \"time\":' 
					+ timest + '}\')');

}

// Function to handle heat requests
function heatHandler(req, res) {
	console.log("Heat Handler called...");
}


// Function to map incoming location to database location
function mapLocToDBLoc(mapLoc) {
  console.log('In mapLocToDBLoc() function.');
  var locStrings = mapLoc.replace(/\s+/g, "").replace("(","").
		replace(")","").split(",");
  var DBLoc = [];
  DBLoc[0] = parseFloat(locStrings[0]);
  DBLoc[1] = parseFloat(locStrings[1]);

  return DBLoc;
}
