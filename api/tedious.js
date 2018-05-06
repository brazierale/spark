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

var connection = new Connection(config);
connection.on('connect', function(err) {
    if (err) {
        console.log('error')
        console.log(err);
    } else {
        
    }
});

function executeStatement(sql, callback) {
    let result = [];
    request = new Request(sql, function(err, rowCount) {
        if (err) {
            console.log(err);
        }
        console.log('Closing connction');
        connection.close();
        callback(result);
    });

    request.on('row', function(columns) {
        result.push(columns[0].value);
    });

    connection.execSql(request);
}

module.exports = executeStatement;

