var ExampleLogoutPage = require('astrolabe').Page;

module.exports = ExampleLogoutPage.create({
	url: { value: baseUrl + "/logout" }
});