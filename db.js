var mysql = require('mysql')


var pool = null;

exports.connect = function(done) {
    pool = mysql.createPool({
        host: 'mysql.stackcp.com',
        port: '51076',
        user: 'pogingpogi',
        password: 'database2',
        database: 'property-management-363999ef'
    })
    done();
}

exports.sql = function() {
    return pool
}