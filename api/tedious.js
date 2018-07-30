var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    // add user by opening Security section in the object explorer
    userName: 'spark',
    password: 'thesights',
    server: 'ALEX-XPS13',
    database: 'spark',
    options: {
        instanceName: 'SQLEXPRESS'
    }
}
// I'm pretty sure this needs to be split out into multiple functions
function executeStatement(request, callback) {
    var connection = new Connection(config);
    console.log('Connecting to database...')

    console.log(request);

    connection.on('connect', (err) => {
        if (err) {
            console.log('error')
            console.log(err);
        } else {

            let result = [];

            request.on('row', (columns) => {
                result.push(columns[0].value);
            });

            request.on('requestCompleted', () => {
                connection.close();
                console.log('Connection closed');

                callback(result);
            });

            connection.execSql(request);
        }
    });
    
}

module.exports = executeStatement;

