var url = require('url')

var dbUrl = "mydb";
var hot = ["hot"];
var mongo = require("mongojs");
var db = mongo(dbUrl, hot);

module.exports = function(app) {
  app.get('/', function(req, res) {
		res.end('This is a string');
  });

  app.get('/click', function(req, res) {
		console.log('click route URL: ' + req.url);
		handler(req, res);
		res.end('you clicked something');
  });
}

function handler(req, res) {
  console.log('In handler() function');
  var urlStuff = url.parse(req.url, true);
  var inLoc = urlStuff.query.loc;
  var inApp = urlStuff.query.app;

	// Define and codify location
  var location = mapLocToDBLoc(inLoc.toString());

	// set timestamp
  var timest = new Date().getTime();
  db.hot.insert({'loc':location, 'app':inApp, 'time':timest});

  res.writeHead(200, {'Content-Type': 'text/javascript'});
  res.end('toRun(\'{\"loc\": [' 
					+ location 
					+ '], \"time\":' 
					+ timest + '}\')');

}

function mapLocToDBLoc(mapLoc) {
  console.log('In mapLocToDBLoc() function.');
  var locStrings = mapLoc.replace(/\s+/g, "").replace("(","").
		replace(")","").split(",");
  var DBLoc = [];
  DBLoc[0] = parseFloat(locStrings[0]);
  DBLoc[1] = parseFloat(locStrings[1]);

  return DBLoc;
}
