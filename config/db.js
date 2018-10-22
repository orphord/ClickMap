var prom = require('promise');
var MongoClient = require("mongodb").MongoClient;

// Function to generate the URL to connect to the MongoDB -- takes into account
//  running locally vs. running on appfog
//var generate_mongo_url = function(){
//    var outStr = 'mongodb://localhost:27017';
//    return outStr;
//};

// Create vars for mongodb database URL
var dbUrl = 'mongodb://localhost:27017';
var dbName = 'ClickMap';

// Initialize db stuff
console.log('DB exported function URL: ' + dbUrl);

var collection = null;
//, collection);
//var db = client.db()
MongoClient.connect(dbUrl, function(err, client) {
	const db = client.db(dbName);
	collection = db.collection('crowdmap');

});


// Function(s) exposed to outside
module.exports = {

	addClick: function(location, appName, timestamp) {
	  var reslt = collection.insertOne({'loc':location, 'app':appName, 'time':timestamp});
	  console.log("RESULT: " + reslt);
	},

	getHeat: function(query) {
		let docList = [];
		console.log("Query in collection.find: " + query);
		 return collection.find(query).toArray();

	}

//		db.crowdmap.find(query, function(err, docs) {
//			console.log("In DB.find() callback;Points from DB within: ");
//			if(err === null) {
		
//			} else {
//				console.log("ERR: " + err.toString());
//			}
//		});

}
	function getHeatDocs(query) {
		return new prom()
	}

