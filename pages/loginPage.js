var ExampleLoginPage = require('astrolabe').Page;

module.exports = ExampleLoginPage.create({
	url: { value: baseUrl + '/login' },

	username: { get: function() { return element(by.id("login-username")); }},
	password: { get: function() { return element(by.id("login-password")); }},
	alertError: { get: function() { return element(by.css("#login-form .alert-error")); }},
	submit: { get: function() { return element(by.xpath("//form[@id='login-form']//button[.='Log In']")); }},
	typeUsername: { value: function (keys) { return this.username.sendKeys(keys); }},
	typePassword: { value: function (keys) { return this.password.sendKeys(keys); }},
	logIn: { value: function (username, password) { 
		this.typeUsername(username);
		this.typePassword(password);
		this.submit.click();
	}}
});