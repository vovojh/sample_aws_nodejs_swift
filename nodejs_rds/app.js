var constants = require('../constants')
var mysql = require('mysql');

var host = constants.urlForRDSInstance()
var database = constants.dbnameForAccounts()
var user = constants.usernameForRDS()
var password = constants.passwordForRDS()
var port = constants.portForRDS()

var connection = mysql.createConnection({
	host : host,
	database : database,
	user : user,
	password : password,
	port : port
});

connection.connect(function(err) {
		if (err) {
			console.error('Database connection failed: ' + err.stack);
			return;
		}
		console.log('Connected to database.');
});

connection.end();
