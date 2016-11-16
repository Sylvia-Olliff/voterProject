

module.exports = {
	getElectionData: function(req, res, next) {
		var conn = req.connInfo;

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