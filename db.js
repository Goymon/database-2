var mysql = require('mysql')


var pool = null;

exports.connect = function (done) {
    pool = mysql.createPool({
        host: 'mysql.stackcp.com',
        port: '51019',
        user: 'kendev',
        password: 'sample2018',
        database: 'clients-32375ac5'
    })
    done();
}

exports.get = function () {
    return pool
}
