const express = require('express')
const app = express()
const executeSql = require('./tedious')

const testCase = 'spark.spark.TestCase';

app.get('/api/testCases', (req, res) =>  {
    let sql = `SELECT * FROM ${testCase} FOR JSON AUTO`;

    executeSql(sql, function(result) {
        console.log('Returned test cases: ' + result);
        res.send({ express: result });
    });
});

app.get('/api/testCases/:id', (req, res) => {
    let sql = `SELECT * FROM ${testCase} WHERE ID = ${req.params.id} FOR JSON AUTO`;

    executeSql(sql, function(result) {
        console.log('Returned test case: ' + result);
        res.send({ express: result });
    });
})

app.post('api/testCases', (req, res) => {
    let summary = res.params.summary;
    let sql = `INSERT INTO ${testCase} VALUES ('${res.params.summary}')`;

    executeSql(sql, function(result) {
        console.log('Added test case: ' + result);
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