var ExampleHomePage = require('astrolabe').Page;

module.exports = ExampleHomePage.create({
		url: { value: baseUrl },
    landingLogo: { get: function() { return element(by.id("landing-logo")); }},
    dashBoardLink: { get: function() {return element(by.css("a.real-link[href='/dashboards']"))} },
    narrativeLink: { get: function() {return element(by.css("a.real-link[href='/narratives']"))} }
});