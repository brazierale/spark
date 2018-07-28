const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const executeSql = require('./tedious')

const testCase = 'spark.dbo.TestCase';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('Request received by express');
    next();
});

app.get('/api/testCases', (req, res) => {
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
        console.log(`Returned test case:  ${result}`);
        res.send({ express: result });
    });
});

app.put('/api/testCases/:id', (req, res) => {
    let newSummary = req.body.summary;
    let sql = `UPDATE ${testCase} SET Summary='${newSummary}' WHERE ID = ${req.params.id}`;

    executeSql(sql, function(result) {
        // should only log this when any actual result is returned
        console.log(`Updated test case:  ${req.params.id}: ${newSummary}`);
        res.send();
    });
});

app.post('/api/testCases', (req, res) => {
    let summary = req.body.summary;
    let sql = `INSERT INTO ${testCase} VALUES ('${summary}')`;

    executeSql(sql, function(result) {
        // need to only return the message when successfully added
        console.log(`Added test case:  ${summary}`);
        res.send();
    });
});

app.delete('/api/testCases/:id', (req, res) => {
    let sql = `DELETE FROM ${testCase} WHERE ID = ${req.params.id}`;
    console.log(`Deleting... ${sql}`);

    executeSql(sql, function(result) {
        // need to only return the message when successfully deleted
        console.log(`Deleted test case: ${req.params.id}`);
        res.send();
    });
});


app.listen(5000, () => console.log('Example app listening on port 5000!'));