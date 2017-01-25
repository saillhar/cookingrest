var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'killb1ll',
    database: 'cookingapp'
})


app.get('/user', function(req, resp){
    connection.getConnection(function(error, tempCont){
        if (!!error) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log('Connected');
            tempCont.query("SELECT * from user", function (error, rows, fields){
                if(!!error){
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
})
app.listen(1337);

/*

connection.connect(function(error) {
    if(!!error){
        console.log('Error');
    }else{
        console.log('Connected');
    }
})

app.get('/user', function(req, resp){
    connection.query("select name from user", function(error, rows, fields){
    if(!!error){
        console.log('Error request');
    }else{
        console.log('succes request select');
        console.log(rows);
    }
    })
})
*/