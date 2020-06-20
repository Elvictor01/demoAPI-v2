'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const mongodbURI = 'mongodb://user:p123456@ds263248.mlab.com:63248/heroku_5qkz777p'
const conn = mongoose.createConnection(mongodbURI);

// '/' is based on /api/feedback
router.route('/:col/:userID')
    .get((req, res) => {
        const col_name = req.params.col;
        const coll = conn.collection(col_name);
        const userID = req.params.userID;
        coll.find({ userID }).toArray(function(err, info) {
            if (err) {
                res.status(400).json(err);
            };
            res.json(info);
        });
    });

module.exports = router;