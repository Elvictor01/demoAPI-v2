'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const Entry = require('../model/demoEntry');

// establishing connection
var mongodb = require('../../../config/mongoURI');
var mongodbURI = mongodb.URI;
const conn = mongoose.createConnection(mongodbURI);

// '/' is based on /api/feedback
router.route('/:col/:userID')
    .put((req, res) => {
        const col_name = req.params.col;
        const coll = conn.collection(col_name);
        const userID = req.params.userID;
        var ID_array = [];
        coll.find({}).toArray(function(err, items) {
            items.forEach(function(item) {
                ID_array.push(item["userID"]);
            });
            // note that { userID } is simplified from { userID:userID }
            coll.findOneAndUpdate({ userID }, { $set: req.body }, function(err) {
                if (err) {
                    res.status(400).json(err);
                };
                if (ID_array.includes(userID)) {
                    res.json({ message: `Entry with userID (${userID}) updated.` });
                } else {
                    res.json({ message: `Entry with userID (${userID}) not found in collection (${col_name})` });
                };
            });
        });
    });

module.exports = router;