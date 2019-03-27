const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const Quotes = require('./db/data');

router
    .use(express.static('resources'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .get("/quotes/:id", (req, res) => {
        res.json(Quotes.getQuotes(req.params.id));
    })
    .use((req, res) => {
        res.status(400);
        res.json({
            error: "Bad request"
        });
    });

module.exports = router;