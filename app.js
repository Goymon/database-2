const   express   = require('express'),
        app       = express(),
        db        = require('./db');


// const query = query => {
//     return new Promise((resolve, reject) => {
//         connection.query(query, function (err, results) {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results)
//         });
//     });
// };

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

// ROUTES START

app.get('/', (req, res) => {
    db.get().query('SELECT * FROM clients', (err, results) => {
        if (err) {
            return console.error(err);
        }
        res.send(results)
    })
});

app.get('/:name', (req, res) => {
    db.get().query(`SELECT * FROM clients where name = '${req.params.name}'`, (err, results) => {
        if (err) {
            return console.error(err);
        }
        res.send(results)
    });
});

// ROUTES END


db.connect(function (err) {
    if (err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1)
    } else {
        app.listen(3000, function () {
            console.log('Server is listening on port 3000...')
        })
    }
});