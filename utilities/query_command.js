const mysql = require('mysql');

var query_command = function query_command(query) {
    const mysqlConnection = {
        host: '128.199.214.155',
        user: 'savemom',
        port: '3306',
        password: 'savemom@aclab1201',
        database: 'line_bot',
        timezone: "ict",
        multipleStatements: true
    };

    return new Promise(function (resolve, reject) {
        const con = mysql.createConnection(mysqlConnection);
        con.connect(function (err) {
            con.query(query, function (err, result, fields) {
                if (err) {
                    // console.log(err);
                    resolve(err);

                    // res.send({
                    //     "errorCode": err.code
                    // })
                } else {
                    resolve(result);
                    // res.send(result)
                }
                con.end();
            });
        });
    });
}

module.exports = {
    query_command
};