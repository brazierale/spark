const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const executeSql = require('./tedious');
const TYPES = require('tedious').TYPES;

const TESTCASE = 'spark.dbo.TestCase';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('Request received by express');
    next();
});

app.get('/api/testCases', (req, res) => {
    let sql = `SELECT * FROM ${TESTCASE} FOR JSON AUTO`;

    executeSql(sql, (result) => {
        // should only log this when any actual result is returned
        console.log('Returned test cases: ' + result);
        res.send({ express: result });
    });
});

app.get('/api/testCases/:id', (req, res) => {
    let sql = `SELECT * FROM ${TESTCASE} WHERE ID = ${req.params.id} FOR JSON AUTO`;

    executeSql(sql, (result) => {
        // should only log this when any actual result is returned
        console.log(`Returned test case:  ${result}`);
        res.send({ express: result });
    });
});

app.put('/api/testCases/:id', (req, res) => {
    let newSummary = req.body.summary;
    let sql = `UPDATE ${TESTCASE} SET Summary='${newSummary}' WHERE ID = ${req.params.id}`;

    executeSql(sql, (result) => {
        // should only log this when any actual result is returned
        console.log(`Updated test case:  ${req.params.id}: ${newSummary}`);
        res.send({ express: result });
    });
});

app.post('/api/testCases', (req, res) => {
    let summary = req.body.summary;
    let sql = `INSERT INTO ${TESTCASE} VALUES ('${summary}')`;

    executeSql(sql, (result) => {
        // need to only return the message when successfully added
        console.log(`Added test case:  ${summary}`);
        res.send({ express: result });
    });
});

app.delete('/api/testCases/:id', (req, res) => {
    let sql = `DELETE FROM ${TESTCASE} WHERE ID = ${req.params.id}`;
    console.log(`Deleting... ${sql}`);

    executeSql(sql, (result) => {
        // need to only return the message when successfully deleted
        console.log(`Deleted test case: ${req.params.id}`);
        res.send({ express: result });
    });
});


app.listen(5000, () => console.log('Example app listening on port 5000!'));