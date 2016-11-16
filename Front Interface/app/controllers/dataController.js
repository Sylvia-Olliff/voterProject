var mysql 		 = require('mysql');
var connData     = require('../../config/database.js');
var conn   		 = mysql.createConnection(connData)

module.exports = {
	getElectionData: function(req, res, next) {
		conn.connect();
		conn.query("SELECT 1 + 1 as TEST", function(err, rows, fields) {
			if (err) { throw err;}

			console.log(rows[0].TEST);
			console.log(fields);

			conn.end();
			next();
		});
	}
}