const express = require('express'),
    app = express(),
    db = require('./db'),
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

//=================== ROUTES START
app.get('/', (req, res) => {
    res.send('INDEX ROUTE')
});

//OWNERS ROUTE START
app.get('/owner', (req, res) => {
    db.sql().query('SELECT * FROM owner', (err, results) => {
        if (err) {
            return console.error(err);
        }
        res.send(results)
    })
});
app.post('/owner', async(req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = req.body.age;

    db.sql().query(`INSERT INTO owner(fname, lname, age) VALUES('${fname}', '${lname}', ${age})`, (err1, InsertResults) => {
        db.sql().query('SELECT * FROM owner', (err2, results) => {
            if (err1 || err2) {
                return console.error(err1 || err2);
            }
            res.send(results);
        });
    });
});
//OWNERS ROUTE END

app.get('/tenant', (req, res) => {
    db.sql().query('SELECT * FROM tenant', (err, results) => {
        if (err) {
            return console.error(err);
        }
        res.send(results)
    })
});


// app.get('/:name', (req, res) => {
//     db.get().query(`SELECT * FROM clients where name = '${req.params.name}'`, (err, results) => {
//         if (err) {
//             return console.error(err);
//         }
//         res.send(results)
//     });
// });

//=================== ROUTES END


db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1)
    } else {
        app.listen(3000, function() {
            console.log('Server is listening on port 3000...')
        })
    }
});