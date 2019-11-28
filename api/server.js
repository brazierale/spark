const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const logger = require("morgan");

const app = express();
const testCasesRouter = require("./routes/testCasesRouter");

// mongoDB connection to spark database
const dbRoute = 'mongodb+srv://alex:CXy0oQwqChhzDc1N@mongo-mvqti.mongodb.net/spark?retryWrites=true';
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

// append /api to http requests
app.use("/api/testCases", testCasesRouter);

app.listen(5000, () => console.log('Example app listening on port 5000!'));