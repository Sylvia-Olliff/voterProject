var key = "";
var data = "";
var multichain = require("multichain-node")({
		port:6282,
		host:'127.0.0.1',
		user:"multichainrpc",
		pass:"somepass"
});

var encrypt = require("./keyGenerator.js");

module.exports = {
	putData: function(req, res, next){

		pKey = encrypt.getKey(req.mcData.pKey);

		key = req.mcData.bKey + "-" pKey;
		data = req.mcData.name + "-" + req.mcData.pName;
		hexData = "";

		for(var i = 0; var len = data.length; i < len; i++){
			hexData += data.charCodeAt(i).toString(16);
		}

		console.log("key: " + key);
		console.log("hexData: " + hexData);

		//TODO testing flow before actually writing to multichain

		// multichain.publish({stream: stream1, key: key, data: hexData}, (err, res) => {
		// 	console.log(res);
		// });

	}
}