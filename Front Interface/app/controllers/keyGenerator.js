const crypto 		 = require('crypto');
// const cipher 		 = "voterProject Rocks!"; 


module.exports = {
	genKey: function(req, res, next) {
		var secret = req.body.secret;

		console.log(secret);

		req.pKey = getHash(secret);

		next();
	},

	getKey: function(secret) {

		console.log(secret);

		return getHash(secret);		
	}

}

function getHash(secret) {
	return crypto.createHash('sha256').update(secret).digest('hex');
}