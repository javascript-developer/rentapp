var express = require('express');
var body_parser = require('body-parser');
var mongoose = require('mongoose')
var config = require('./app/config');
var utils = require('./app/utils');
var login = require('./app/routes/login')
var admin = require('./app/routes/admin')
var user = require('./app/routes/user');
var app = express();

mongoose.connect(config.db.connection_string);
app.use(express.static(__dirname + '/public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true})); 

app.use('/api/login',login);
app.use('/api/admin', admin);
app.use('/api/user', user);

app.listen(config.app.port,function () {
	console.log('Server started on port :'+config.app.port);
});