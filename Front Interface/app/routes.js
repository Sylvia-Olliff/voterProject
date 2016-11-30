//main routes file
// var controllerExample = require('./controllers/electionController.js');
var dataController = require('./controllers/dataController.js');
var multichainController = require('./controllers/multichainController.js');


module.exports = function(args) {
	var app 	= args.app;
	var express = args.express;

	app.use('/css', express.static(__dirname + '/views/css/'));
	app.use('/js', express.static(__dirname + '/views/js/'));
	app.use('/img', express.static(__dirname + '/views/img/'));
	app.use('/css/img', express.static(__dirname + '/views/img/'));

	app.get('/', function(req, res) {
		res.render(__dirname + "/views/index.ejs");
	});

	app.get('/elections', function(req, res) {
		res.render(__dirname + "/views/elections.ejs");
	});

	app.get('/electionData', dataController.getElectionData, function(req, res) {
		var data = req.electionData;

		res.render(__dirname + "/views/electionInfoSet.ejs", {data: data}, function(err, html) {
			if (err) {throw err;}

			res.send(html);
		});
	});

	app.post('/voteData', dataController.translateBallot, multichainController.putData, function(req, res) {
		res.send("Test success");
	});

	app.get('/*', function(req, res) {
		res.render(__dirname + "/views/404.ejs");
	});

	app.post('/*', function(req, res) {
		res.render(__dirname + "/views/404.ejs");
	});

}