//controller for processing voter data

module.exports = {
	vote: function(req, res, next) {
		console.log("I'm voting now...");
			req.exampleVote = {
				voteInfo: "I voted!"
			};
		next();
	},
	getElection: function(req, res, next) {
		req.federal = {
			position: "President",
			name: "Chuck, Morris"
		};
		next();
	}
}