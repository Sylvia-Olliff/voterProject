var mysql 		 = require('mysql');
var connData     = require('../../config/database.js');
var conn   		 = mysql.createConnection(connData)

module.exports = {
	getElectionData: function(req, res, next) {
		conn.connect();
		conn.query("SELECT * FROM test_table", function(err, rows, fields) {
			if (err) { throw err;}

			console.log(rows[0]);
			console.log(fields);

			conn.end();
			next();
		});
	}
}