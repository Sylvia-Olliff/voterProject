//Election instance

var ElecInstance = function (args) {
	//Candidate Info
	this.lastName = args.lastName;
	this.firstName = args.firstName;
	this.affiliation = args.affiliation;
	//Position Info
	this.position = args.position;
	//Election Info
	this.ballotKey = args.ballotKey;
	this.electKey = args.electKey;
	this.voterKey = args.voterKey;
}

ElectInstance.Prototype.fullName = function() {
	return this.lastName + ", " + this.firstName;
}

ElectInstance.Prototype.getPosition = function() {
	return this.position;
}

