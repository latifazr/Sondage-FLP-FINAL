var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database/db');
var sujetCrud = require('./api/ApiSujet');
var userCrud = require('./api/ApiUser');
var passport = require('./passport/passport');
var app = express();
var http = require('http').createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/sujets',sujetCrud);
app.use('/users',userCrud);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

http.listen(3000, function() {console.log('listening to 3000')});