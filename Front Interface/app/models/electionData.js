//election data description

module.exports = {
	position: String,
	firstName: String,
	lastName: String,
	party: String,
	combine: function() {
		return lastName + ", " + firstName;
	}
}