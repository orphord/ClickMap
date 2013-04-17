

// Function to generate the URL to connect to the MongoDB -- takes into account
//  running locally vs. running on appfog
var generate_mongo_url = function(obj){
    var outStr = '';
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        outStr = obj.username + ":" + obj.password + "@";
    }
    outStr = outStr + obj.hostname + ":" + obj.port + "/" + obj.db;

    return outStr;
}

// Create vars for mongodb database and collections
var db = null;
var hot = ["hot"];
if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongoData = env['mongodb-1.8'][0]['credentials'];
    var dbUrl = generate_mongo_url(mongoData);
    db = require('mongojs').connect(dbUrl, hot);

} else {
    var dbUrl = "mydb"; //"username:password@example.com/mydb";

}

// Using mongojs library for mongo db support
console.log("DB URL: " + dbUrl + "; HOT: " + hot);

// Function(s) exposed to outside
module.exports = function() {
	var db = require("mongojs").connect(dbUrl, hot);
	return db;
}
