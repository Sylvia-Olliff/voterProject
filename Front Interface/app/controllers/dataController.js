var mysql 		 = require('mysql');
var connData     = require('../../config/database.js');
var conn   		 = mysql.createConnection(connData);
var electionDataSets = [];
var electionDataMold = require('../models/electionData.js');


module.exports = {
	getElectionData: function(req, res, next) {
		conn.connect();
		//This will be a join of all four table (or some combination therein)
		conn.query("SELECT * FROM elections", function(err, rows, fields) {
			if (err) { throw err;}

			console.log(fields);
			conn.end();

			for(entry in rows) {
				var electionData = electionDataMold;
				electionData.positon = entry.P_NAME;
				electionData.firstName = entry.C_FIRSTNAME;
				electionData.lastName = entry.C_LASTNAME;
				electionData.party = entry.C_AFFILIATION;

				electionDataSets.push(electionData);
			}

			req.election = {
				data: electionDataSets
			};
			next();
		});
	}
}