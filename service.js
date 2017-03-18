var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();

var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'killb1ll',
    database: 'cookingapp'
})

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.Header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.Header('Access-Control-Allow-Credentials', false);
//     next();
// });
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.get('/user', function (req, resp) {
    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log('Connected');
            tempCont.query("SELECT * from user", function (error, rows, fields) {
                if (!!error) {
                    console.log('Error in the query');
                } else {
                    resp.setHeader('Access-Control-Allow-Origin', '*');
                    resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                    resp.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                    resp.setHeader('Access-Control-Allow-Credentials', false);
                    resp.json(rows);
                }
            })
        }
    })
});
app.get('/recipe', function (req, resp) {
    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log('Connected');
            tempCont.query('SELECT * from recipe', function (error, rows, fields) {
                if (!!error) {
                    console.log('Error in the query');
                } else {
                    resp.setHeader('Access-Control-Allow-Origin', '*');
                    resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                    resp.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                    resp.setHeader('Access-Control-Allow-Credentials', false);
                    resp.json(rows);
                }
            })
        }
    })
});
app.post('/recipe/create', function (req, resp) {
    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            tempCont.release();
            console.log('Error create recipe cr');
        } else {
            console.log('Connected cr');
            var addRecipeQuery = 'insert into recipe (name,image_url,preparation_time,cooking_time,ingredients,steps) values ('
                + '"' + req.body.name + '",'
                + '"' + req.body.image + '",'
                + '"' + req.body.preparation_time + '",'
                + '"' + req.body.cooking_time + '",'
                + '"' + req.body.ingredients + '",'
                + '"' + req.body.steps + '");';
            tempCont.query(addRecipeQuery, function (error, rows, fields) {
                if (!!error) {
                    console.log('Error in the query create recipe cr');
                    console.log(addRecipeQuery);
                } else {
                    resp.setHeader('Access-Control-Allow-Origin', '*');
                    resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                    resp.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                    resp.setHeader('Access-Control-Allow-Credentials', false);
                    // resp.end();
                    resp.send(req.body);
                }
            })
        }
    })
});
app.listen(1337);

/*

 full server.js code:

var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser= require('body-parser');

var app = express();

app.set('port', 3000);

app.use(express.static(path.normalize(__dirname + '/')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing       application/x-www-form-urlencoded

app.get('/main', function(req, res) {
    var name = 'MyNameFromServer';
    res.send(name);
});

app.post('/view1', function(req, res) {
    console.log(res.body.desc);
    res.end();
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
*/