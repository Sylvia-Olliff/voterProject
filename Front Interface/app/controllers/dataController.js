var mysql 		 = require('mysql');
var connData     = require('../../config/database.js');
var conn   		 = mysql.createConnection(connData);
var electionDataSets = [];
var electionDataMold = require('../models/electionData.js');


module.exports = {
	getElectionData: function(req, res, next) {
		conn.connect();
		//This will be a join of all four table (or some combination therein)
		conn.query("SELECT * FROM elections WHERE E_FLAG=1", function(err, rows, fields) {
			if (err) { throw err;}

			conn.end();
			var electionID = rows[0].E_ID;
			var ballotKey = rows[0].B_KEY;
			conn.connect();
			conn.query("SELECT B_ID, P_ID, C_ID FROM ballot WHERE B_KEY=" + ballotKey, function(err, rows, fields){
				if(err) {throw err;}

				conn.end();
				var positionIDs = [];
				var candidateIDs = [];
				var ballotIDs = [];

				for(entry in rows) {
					positionIDs.push(entry.P_ID);
					candidateIDs.push(entry.C_ID);
					ballotIDs.push(entry.B_ID);
				}

				var ballotDataSet = {
					positions: positionIDs,
					candidates: candidateIDs,
					ballots: ballotIDs
				};
			});


			req.election = {
				data: electionDataSets
			};
			next();
		});
	}
}

function candidateDataQuery(P_ID, C_ID, E_ID) {
	conn.connect();

	conn.query("SELECT C_LAST_NAME, C_FIRST_NAME, C_AFFILIATION FROM candidates WHERE C_ID=" + C_ID, function(err, rows, fields) {
		if(err) {throw err;}

		//build out the async function set, that will capture paired position 
		// and candidate data. 
	});
}