var MongoClient = require('mongodb').MongoClient;
var connection;

var connect = function(url, done) {
    if (connection) return done();

    MongoClient.connect(url, function(err, db) {
        if (err){
            return done('Unable to connect to the mongoDB server. Error:', err);
        }
        connection = db;
        console.log("DB connection ready");
        done();
    })
};
var get = function() {
    return connection;
};
var close = function(done) {
    if (connection) {
        connection.close(function(err, result) {
            connection= null;
            done(err)
        })
    }
};
module.exports.connect = connect;
module.exports.get = get;
module.exports.close = close;