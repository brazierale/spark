const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const logger = require("morgan");
const Data = require("./dataSchema");

const app = express();
const router = express.Router();

// mongoDB connection to spark database
const dbRoute = 'mongodb+srv://alex:dpAFhp9Or8o0ZKKQ@mongo-mvqti.mongodb.net/spark?retryWrites=true';
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to database")
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use((req, res, next) => {
    console.log('Request received by express');
    next();
});


// for now GET gets all data, should be updated to only look in testcase collection?
router.get("/testCases", (req,res) => {
    Data.find((err, data) => {
        if (err) return res.json( {success: false, error: err });
        return res.json({ success:true, data: data });
    });
});

// get details for a single test case
router.get("/testCases/:id", (req, res) => {
    Data.findOne( {id: req.params.id}, (err, data) => {
        if (err) return res.json ( {success:false, error: err });
        return res.json( {success:true, data: data });
    });
});

// create a new test case
router.post("/testCases", (req, res) => {
    let data = new Data();
    const { id, summary } = req.body;
    data.id = id;
    data.summary = summary;

    data.save(err => {
        if (err) return res.json({success:false, error: err });
        return res.json({ success: true });
    });
});

// update an existing test case
router.put("/testCases/:id", (req, res) => {
    Data.findOneAndUpdate( {id: req.params.id}, req.body.update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// delete a test case
router.delete("/testCases/:id", (req, res) => {
    Data.findOneAndDelete( {id: req.params.id}, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// append /api to http requests
app.use("/api", router);

app.listen(5000, () => console.log('Example app listening on port 5000!'));