var key = "";
var data = "";
//Connect to the multichain node hosted on the same VM as the webserver
var multichain = require("multichain-node")({
		port:6282,
		host:'127.0.0.1',
		user:"multichainrpc",
		pass:"somepass"
});

var encrypt = require("./keyGenerator.js");

module.exports = {
	putData: function(req, res, next){

		bKey = encrypt.getKey(req.mcData.bKey);

		key = req.mcData.pKey + "-" + bKey;
		data = req.mcData.name + "-" + req.mcData.pName;
		hexData = "";

		for(var i = 0; i < data.length; i++){
			hexData += data.charCodeAt(i).toString(16);
		}

		//The Personal Key and ballot key should be combined and encrypted as 256bit encoded hexadecimal
		//The data to be written should be converted straight to hexadecimal

		console.log("key: " + key);
		console.log("hexData: " + hexData);

		req.example = {
			key: key,
			hexData: hexData
		};

		//TODO testing flow before actually writing to multichain

		// multichain.publish({stream: stream1, key: key, data: hexData}, (err, res) => {
		// 	console.log(res);
		//	next();
		// });

		next();

	}
}