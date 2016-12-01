const crypto 		 = require('crypto');
// const cipher 		 = "voterProject Rocks!"; 


module.exports = {
	genKey: function(req, res, next) {
		var secret = req.body.secret;

		var hash = crypto.createHmac('sha256').update(secret).digest('hex');

		req.pKey = hash;

		next();
	},

	getKey: function(secret) {
		var hash = crypto.createHmac('sha256').update(secret).digest('hex');

		return hash;		
	}

}