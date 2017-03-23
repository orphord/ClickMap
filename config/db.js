// Function to generate the URL to connect to the MongoDB -- takes into account
//  running locally vs. running on appfog
var generate_mongo_url = function(obj){
    var outStr = 'mongodb://localhost:27017/ClickMap';
    return outStr;
};

// Create vars for mongodb database and collections
var db = null;
var collection = ["crowdmap"];
var dbUrl = generate_mongo_url();

// Function(s) exposed to outside
module.exports = function() {
	console.log('DB exported function URL: ' + dbUrl);
	var db = require("mongojs")(dbUrl, collection);
	return db;
};
