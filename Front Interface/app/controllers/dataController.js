var mysql 		 = require('mysql');
var async 		 = require('async');
var connData     = require('../../config/database.js');
var conn   		 = mysql.createConnection(connData);
var electionDataSets = [];
var electionDataMold = require('../models/electionData.js');


module.exports = {
	getElectionData: function(req, res, next) {
		/*
		 * This could be alternatively done in a single query using a series of subqueries all tied
		 * together, or potentially via join between the three tables involved. However, for 
		 * demonstration purposes this method was used to demonstration both nexted callback functions
		 * and what can lead to the dreaded "callback hell"
		 */


		//First retrieve which eleciton and ballot sets are active
		conn.query("SELECT E_ID, B_KEY FROM elections WHERE E_FLAG=1", function(err, rows, fields) {
			if (err) { throw err;}

			var electionID = rows[0].E_ID;
			var ballotKey = rows[0].B_KEY;

			//Then use the results of that query to capture all of the records in the ballots table that
			//match the active ballot key. NOTE: These are returning a set of IDs for the positions and 
			//candidates table to pull the actual data for both.
			conn.query("SELECT P_ID, C_ID, B_ID FROM ballot WHERE B_KEY=" + ballotKey, function(err, rows, fields){
				if(err) {throw err;}

				var posCanFuncs = [];
				
				//As this will be a collection of individual queries for each ballot record we are binding
				//the individual sets of data from the above query to an instance of the function 
				//candidateDataQuery then adding it to an array (posCanDuncs)
				for(entry in rows) {
					var posCanArgs = {C_ID: rows[entry].C_ID, P_ID: rows[entry].P_ID, E_ID: electionID, B_ID: rows[entry].B_ID};
					posCanFuncs.push(candidateDataQuery.bind(null, posCanArgs));
				}

				//Using the async library each of the functions added to the posCanFuncs Array are executed
				// in parallel.
				async.parallel(posCanFuncs, function(err, results) {
					if(err) {throw err;}
					req.electionData = results;

					next();
				});
			});
		});
	},

	translateBallot: function(req, res, next) {
		//ideally this would be an array containing all of the ids for everything the user voted for.
		// However, for this demo the user can only vote for one position so we are treating this 
		// as a singular.
		var ballotID = req.body.vote;

		conn.query("SELECT P_ID, C_ID, B_KEY FROM ballot WHERE B_ID=" + ballotID, function(err, rows, fields){
			if(err) {throw err;}
			
			var C_ID = rows[0].C_ID;
			var P_ID = rows[0].P_ID;
			var B_Key = rows[0].B_KEY;

			var P_Key = req.pKey;
			
			conn.query("SELECT C_LAST_NAME, C_FIRST_NAME, C_AFFILIATION FROM candidates WHERE C_ID=" + C_ID, function(err, rows, fields) {
				if(err) {throw err;}

				var name = rows[0].C_LAST_NAME + ", " + rows[0].C_FIRST_NAME;

				conn.query("SELECT P_NAME FROM positions WHERE P_ID=" + P_ID, function(err, rows, fields) {
					if(err) {throw err;}

					var pName = rows[0].P_NAME;


					//Once we have translated the ballot Ids of who they voted for back into real world 
					// data add the needed values to the object to be used by multichainController.js
					req.mcData = {
						pKey: P_Key,
						bKey: B_Key,
						name: name,
						pName: pName
					}

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
	var B_ID = args.B_ID;

	conn.query("SELECT C_LAST_NAME, C_FIRST_NAME, C_AFFILIATION FROM candidates WHERE C_ID=" + C_ID, function(err, rows, fields) {
		if(err) {throw err;}

		var instanceData = [];
		instanceData["CandidateData"] = {
			lastName: rows[0].C_LAST_NAME,
			firstName: rows[0].C_FIRST_NAME,
			affiliation: rows[0].C_AFFILIATION
		}

		conn.query("SELECT P_NAME FROM positions WHERE P_ID=" + P_ID, function(err, rows, fields) {
			if(err) {throw err;}

			instanceData["positionData"] = {
				name: rows[0].P_NAME,
				id: B_ID;
			}

			callback(null, instanceData);
		}); 
	});
}