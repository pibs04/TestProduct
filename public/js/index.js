$(document).ready(function() {

	ko.applyBindings(new LoginViewModel());

});

function LoginViewModel() {
	var self = this;

	self.username = ko.observable();
	self.password = ko.observable();

	self.login = function() {
		
		validateUser(self.username(), self.password());
	};

}

function validateUser(username, password) {
	var validUsers = { username: "test", password: "test"};

	if(username == validUsers.username && password == validUsers.password) {
		window.open('http://localhost:8000/home', "_self");
	}
}