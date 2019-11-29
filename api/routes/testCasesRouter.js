const express = require('express');

const Data = require("../dataSchema");

const router = express.Router();


// for now GET gets all data, should be updated to only look in testcase collection?
router.get("/", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success:true, data: data });
    });
});

// get all tags
router.get("/tags", (req, res) => {
    Data.distinct('tags', (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success:true, data: data });
    });
});

// get details for a single test case
router.get("/:key", (req, res) => {
    Data.findOne({key: req.params.key}, (err, data) => {
        if (err) return res.json ({ success: false, error: err });
        return res.json({ success:true, data: data });
    });
});

// create a new test case
router.post("/", (req, res) => {
    let data = new Data();
    const { key, sortId, summary, description, steps, tags } = req.body;
    data.key = key;
    data.sortId = sortId;
    data.summary = summary;
    data.description = description;
    data.steps = steps;
    data.tags = tags;
    
    data.save(err => {
        if (err) return res.json({success:false, error: err });
        return res.json({ success: true });
    });
});

// update an existing test case
router.put("/:key", (req, res) => {
    Data.findOneAndUpdate({ key: req.params.key }, req.body.update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// delete a test case
router.delete("/:key", (req, res) => {
    Data.findOneAndDelete({ key: req.params.key }, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

module.exports = router;