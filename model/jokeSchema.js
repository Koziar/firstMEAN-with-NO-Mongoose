// grab the things we need
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create a schema
var jokeSchema = new Schema({
    joke: String,
    type: Array,
    reference: { author: String, link: String },
    lastEdited: { type : Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var Joke = mongoose.model('Joke', jokeSchema);
// ready to go!

module.exports = Joke;
