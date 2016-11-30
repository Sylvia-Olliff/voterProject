var mysql 		 = require('mysql');
var async 		 = require('async');
var connData     = require('../../config/database.js');
var conn   		 = mysql.createConnection(connData);
var electionDataSets = [];
var electionDataMold = require('../models/electionData.js');


module.exports = {
	getElectionData: function(req, res, next) {
		//This will be a join of all four table (or some combination therein)
		conn.query("SELECT E_ID, B_KEY FROM elections WHERE E_FLAG=1", function(err, rows, fields) {
			if (err) { throw err;}

			// conn.end();
			var electionID = rows[0].E_ID;
			var ballotKey = rows[0].B_KEY;
			// conn.connect();
			conn.query("SELECT P_ID, C_ID FROM ballot WHERE B_KEY=" + ballotKey, function(err, rows, fields){
				if(err) {throw err;}

				// conn.end();
				var posCanFuncs = [];
				
				for(entry in rows) {
					var posCanArgs = {C_ID: rows[entry].C_ID, P_ID: rows[entry].P_ID, E_ID: electionID};
					posCanFuncs.push(candidateDataQuery.bind(null, posCanArgs));
				}

				async.parallel(posCanFuncs, function(err, results) {
					if(err) {throw err;}
					req.electionData = results;

					next();
				});
			});
		});
	}
}

function candidateDataQuery(args, callback) {
	var C_ID = args.C_ID;
	var P_ID = args.P_ID;
	var E_ID = args.E_ID;
	// conn.connect();

	conn.query("SELECT C_LAST_NAME, C_FIRST_NAME, C_AFFILIATION FROM candidates WHERE C_ID=" + C_ID, function(err, rows, fields) {
		if(err) {throw err;}

		// conn.end();
		var instanceData = [];
		instanceData["CandidateData"] = {
			lastName: rows[0].C_LAST_NAME,
			firstName: rows[0].C_FIRST_NAME,
			affiliation: rows[0].C_AFFILIATION
		}

		// conn.connect();

		conn.query("SELECT P_NAME FROM positions WHERE P_ID=" + P_ID, function(err, rows, fields) {
			if(err) {throw err;}

			// conn.end();
			instanceData["positionData"] = {
				name: rows[0].P_NAME
			}

			callback(null, instanceData);
		}); 
	});
}