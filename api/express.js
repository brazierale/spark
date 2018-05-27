const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const executeSql = require('./tedious')

const testCase = 'spark.spark.TestCase';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/testCases', (req, res) =>  {
    let sql = `SELECT * FROM ${testCase} FOR JSON AUTO`;

    executeSql(sql, function(result) {
        // should only log this when any actual result is returned
        console.log('Returned test cases: ' + result);
        res.send({ express: result });
    });
});

app.get('/api/testCases/:id', (req, res) => {
    let sql = `SELECT * FROM ${testCase} WHERE ID = ${req.params.id} FOR JSON AUTO`;

    executeSql(sql, function(result) {
        // should only log this when any actual result is returned
        console.log('Returned test case: ' + result);
        res.send({ express: result });
    });
});

app.post('/api/testCases', (req, res) => {
    let summary = req.body.summary;
    let sql = `INSERT INTO ${testCase} VALUES ('${summary}')`;

    executeSql(sql, function(result) {
        // need to only return the message when successfully added
        console.log('Added test case: ' + summary);
        res.send();
    });
});

app.delete('/api/testCases/:id', (req, res) => {
    let sql = `DELETE FROM ${testCase} WHERE ID = ${req.params.id}`;

    executeSql(sql, function(result) {
        // need to only return the message when successfully deleted
        console.log('Deleted test case: ' + req.params.id);
        res.send();
    });
});


app.listen(5000, () => console.log('Example app listening on port 5000!'));

//app.post('/', (req, res) => res.send(req.)

// (req, res) => indicates passing variables 'req' and res' into a function that comes after =>
// req = request, res = response
// this is shorthand for function(req, res) {}
// passed into get as get requires an address and a function to execute

// use tedious to connect to mssql