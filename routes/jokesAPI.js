var express = require('express'),
    router = express.Router(),
    jokes = require('../model/jokes');

router.get('/joke/random', function (req, res, next) {
    jokes.randomJoke(function (err, joke) {
        if (err) {
            res.send(err);
        } else {
            res.json(joke);
        }
    })
});

router.get('/jokes', function (req, res, next) {
    jokes.allJokes(function (err, jokes) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(jokes);
        }
    })
});

router.post('/joke', function (req, res, next) {
    var newJoke = req.body; //.joke;
console.log(newJoke);
    jokes.addJoke(newJoke, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            console.log(data.ops[0]);
            res.json(data.ops[0]);
        }
    })
});

router.put('/joke', function (req, res, next) {
    var joke = req.body;

    jokes.editJoke(joke._id, joke.joke, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.status(204).end();
        }
    })
});

router.get('/joke/:id', function (req, res, next) {
    jokes.findJoke(req.params.id, function (err, joke) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(joke);
        }
    })
});

router.delete('/joke/:id', function (req, res, next) {
    var jokeId = req.params.id;
    jokes.deleteJoke(jokeId, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json({deleted: jokeId});
        }
    })
});

module.exports = router;
