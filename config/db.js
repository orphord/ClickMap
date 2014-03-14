// Function to generate the URL to connect to the MongoDB -- takes into account
//  running locally vs. running on appfog
var generate_mongo_url = function(obj){
    var outStr = 'mongodb://orphord:happydays@paulo.mongohq.com:10018/CrowdMap_orphord';
    return outStr;
};

// Create vars for mongodb database and collections
var db = null;
var collection = ["crowdmap"];
var dbUrl = generate_mongo_url();

// Function(s) exposed to outside
module.exports = function() {
	var db = require("mongojs").connect(dbUrl, collection);
	return db;
};
