const express = require('express')
const app = express()

app.get('/api/getTestCases', (req, res) =>  {
    res.send({ express: 'Hello World!' });
});

app.listen(5000, () => console.log('Example app listening on port 5000!'));

//app.post('/', (req, res) => res.send(req.)

// (req, res) => indicates passing variables 'req' and res' into a function that comes after =>
// req = request, res = response
// this is shorthand for function(req, res) {}
// passed into get as get requires an address and a function to execute

// use tedious to connect to mssql