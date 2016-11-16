//main routes file
var controllerExample = require('./controllers/electionController.js');
var dataController = require('./controllers/dataController.js');


module.exports = function(args) {
	var app 	= args.app;
	var express = args.express;
	var conn 	= args.connection;

	app.use('/css', express.static(__dirname + '/views/css/'));
	app.use('/js', express.static(__dirname + '/views/js/'));
	app.use('/img', express.static(__dirname + '/views/img/'));
	app.use('/css/img', express.static(__dirname + '/views/img/'));

	app.get('/', function(req, res) {
		res.render(__dirname + "/views/index.ejs");
	});

	app.get('/testSQL', dataController.getElectionData, function(req, res) {
		res.send("test complete");
	});

	app.get('/elections', controllerExample.getElection, function(req, res) {
		res.render(__dirname + "/views/elections.ejs", {federal: req.federal}, function(err, html) {
			if (err) {throw err;}

			res.send(html);
		});
	});

	app.get('/test', controllerExample.getElection, controllerExample.vote, function(req, res){
		console.log(req.exampleVote);
		console.log(req.exampleElection);
		res.send("Success");
	});

	app.get('/*', function(req, res) {
		res.render(__dirname + "/views/404.ejs");
	});

	app.post('/*', function(req, res) {
		res.render(__dirname + "/views/404.ejs");
	});

}