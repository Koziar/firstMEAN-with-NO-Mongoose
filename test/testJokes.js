// require important stuff
var jokes = require('../model/jokes'),
    connection = require('../db/db'),
    expect = require('chai').expect,
    ObjectId = require('mongodb').ObjectID;


// 2 jokes for test
var testJokes = [
    {
        _id: ObjectId("56e5e59ec13817d418d40c1c"),
        joke: 'Reality is an illusion created by a lack of alcohol',
        type: ['short', 'alcohol', 'quote'],
        reference: {
            author: 'Someone',
            link: ''
        },
        lastEdited: new Date()
    },
    {
        _id: ObjectId("56e5e59ec13817d418d40c1d"),
        joke: 'I used to think the brain was the most important organ. Then I thought, look whatâs telling me that',
        type: ['short', 'joke'],
        reference: {
            author: 'Unknown',
            link: 'http://thoughtcatalog.com/christopher-hudspeth/2013/09/50-terrible-quick-jokes-thatll-get-you-a-laugh-on-demand/'
        },
        lastEdited: new Date()
    }
];

describe("The jokes factory", function () {

    before(function (done) {
        connection.connect("mongodb://localhost:27017/test", function () {
            done();
        });
    });

    beforeEach(function (done) {
        var db = connection.get();
        db.collection("jokes").deleteMany({}, function (err, data) {
            if (err) {
                throw new Error(err);
            }
            db.collection("jokes").insertMany(testJokes, function (err, data) {
                if (err) {
                    throw new Error(err);
                }
                done();
            });
        })
    });


    it("Should return all jokes (2)", function (done) {
        jokes.allJokes(function (err, data) {
            expect(data.length).to.be.equal(2);
            done();
        })
    });

    it("Should find one joke", function (done) {
        jokes.findJoke('56e5e59ec13817d418d40c1c', function (err, data) {
            expect(data[0].joke).to.be.equal("Reality is an illusion created by a lack of alcohol");
            done();
        })
    });

    it("Should edit a joke", function (done) {
        jokes.editJoke('56e5e59ec13817d418d40c1c', 'It works. Hahaha not really...', function (err, data) {
            expect(data.result.nModified).to.be.equal(1);
            done();
        })
    });

    it("Should delete a joke", function (done) {
        jokes.deleteJoke('56e5e59ec13817d418d40c1c', function (err, data) {
            expect(data.result.n).to.be.equal(1);
            done();
        })
    });

    it("Should add a new joke", function (done) {
        var newJoke = {
            joke: 'New joke to be added',
            type: ['test', 'joke'],
            reference: {
                author: 'me',
                link: ''
            },
            lastEdited: new Date()
        };

        jokes.addJoke(newJoke, function (err, data) {
            expect(data.ops[0].jokeToAdd.joke)
                .to.be.equal('New joke to be added');
            done();
        })
    });

    it("Should return a random joke", function (done) {
        jokes.randomJoke(function (err, data) {
            expect(data.joke).to.be.a('string');
            done();
        })
    });


});


