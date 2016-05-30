var connection = require("../db/db"),
    ObjectId = require('mongodb').ObjectID;
/*
 Querying MongoDB without mongooose
 Using the connection made from db.js
 */

function _allJokes(callback) {
    var db = connection.get();
    //An empty query document ({}) selects all documents in the collection:
    db.collection("jokes").find({}).toArray(function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

function _addJoke(jokeToAdd, callback) {
    var db = connection.get();
    db.collection("jokes").insertOne({jokeToAdd}, function (err, data) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data);
        }
    });
}

function _findJoke(id, callback) {
    var db = connection.get();
    //Returns one document that satisfies the specified query criteria.
    db.collection("jokes").find({"_id": ObjectId(id)}).toArray(function(err,data){
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

function _editJoke(jokeToEditID, newJokeText, callback) {
    var db = connection.get();
    db.collection("jokes").updateOne({
        "_id": ObjectId(jokeToEditID)
    }, {
        $set: {
            "joke": newJokeText,
            "lastEdited": new Date()
        }
    }, function (err, data) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data);
        }
    });
}

function _deleteJoke(id, callback) {
    var db = connection.get();
    db.collection("jokes").deleteOne({"_id": ObjectId(id)}, function (err, data) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data);
        }
    });
}


function _randomJoke(callback) {
    var db = connection.get();
    db.collection("jokes").find({}).toArray(function (err, data) {
        if (err) {
            callback(err);
        } else {
            var random = Math.floor((Math.random() * data.length));
            var randomElement = data[random];
            callback(null, randomElement);
        }
    })
}

module.exports = {
    allJokes: _allJokes,
    addJoke: _addJoke,
    findJoke: _findJoke,
    editJoke: _editJoke,
    deleteJoke: _deleteJoke,
    randomJoke: _randomJoke
};