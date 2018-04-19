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

var sql = 'SELECT * FROM spark.spark.TestCase' 

connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    } else {
        executeStatement(sql);
    }
});

function executeStatement(sql) {
    console.log('SQL going in ' + sql)
    request = new Request(sql, function(err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
        connection.close();
    });

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log(column.value);
            }
        });
    });

    connection.execSql(request);
}

module.exports = executeStatement;

