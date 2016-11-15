//Main server file for Voter Interface

var express  	 = require('express');
var app      	 = express();
var server   	 = require('http').createServer(app);
var port 	 	 = 8888;
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mysql 		 = require('mysql');
var connData     = require('./config/database.js');
var connection   = mysql.createConnection(connData);
var morgan 		 = require('morgan');


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',   
  extended: true
}));

app.set('view engine', 'ejs');

var args  = {
	app: app,
	express: express,
	connection: connection
}
require(__dirname + "/app/routes.js")(args);

server.listen(port);
console.log('The magic happens on port ' + port);