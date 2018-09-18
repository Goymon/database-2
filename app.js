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
    getTable('owner', res);
});
app.post('/owner', async(req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = req.body.age;

    db.sql().query(`INSERT INTO owner(fname, lname, age) VALUES('${fname}', '${lname}', ${age})`, (err1, InsertResults) => {
        getTable('owner', res);
    });
});
//OWNERS ROUTE END

//PROPERTY TYPE ROUTE START
app.get('/property-type', (req, res) => {
    getTable('propertytype', res);
});
app.post('/property-type', async (req, res) => {
    const type = req.body.type;

    db.sql().query(`INSERT INTO propertytype(type) VALUES('${type}')`, (err1, InsertResults) => {
        getTable('propertytype', res);
    });
});
//PROPERTY TYPE ROUTE END

//PROPERTY ROUTE START
app.get('/property', (req, res) => {
    getTable('properties', res);
});
app.post('/property', async (req, res) => {
    const type = req.body.type,
          owner = req.body.owner,
          size = req.body.size,
          noofbedrooms = req.body.noofbedrooms,
          noofbathrooms = req.body.noofbathrooms,
          rate = req.body.rate;

    db.sql().query(`INSERT INTO property(propertytype_id, owner_id, size, no_ofbedrooms, no_ofbathrooms, rate) VALUES('${type}', '${owner}', '${size}', '${noofbedrooms}', '${noofbathrooms}', '${rate}')`, (err1, InsertResults) => {
        getTable('properties', res);
    });
});
//PROPERTY ROUTE END

//PROPERTY ROUTE START
app.get('/tenant', (req, res) => {
    getTable('tenant', res);
});
app.post('/tenant', async (req, res) => {
    const fname = req.body.fname,
          lname = req.body.lname,
          age = req.body.age,
          marital_status = req.body.marital_status,
          occupation = req.body.occupation;

    db.sql().query(`INSERT INTO tenant(fname, lname, age, marital_status, occupation) VALUES('${fname}', '${lname}', ${age}, '${marital_status}', '${occupation}')`, (err1, InsertResults) => {
        getTable('tenant', res);
    });
});
//PROPERTY ROUTE END


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


// FUNCTIONS 

function getTable(tableName, res) {
    db.sql().query(`SELECT * FROM ${tableName}`, (err, results) => {
        if (err) {
            return console.error(err);
        }
        res.send(results);
    });
}