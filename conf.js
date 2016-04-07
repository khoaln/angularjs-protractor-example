var HtmlReporter = require('protractor-html-screenshot-reporter');
var moment = require('moment');

exports.config = {
    // TODO: add environemnt to switch between drive

    // Local web driver
    seleniumAddress: 'http://localhost:4444/wd/hub',

	// Browserstack
	//seleniumAddress: 'http://hub.browserstack.com/wd/hub',

    // Docker web driver (for testing)
    //seleniumAddress: 'http://192.168.33.10:49156/wd/hub',

    multiCapabilities: [
        //{ 'browserName': 'firefox' },
        {
            'browserName': 'chrome'
        }
	  	// Browserstack
		//{
		//	'browserName' : 'chrome',
		//	'browserstack.user' : 'khoale5',
		//	'browserstack.key' : 'mbbGTXhpjJ6Dr95spvkh',
		//
		//	'browser' : 'Chrome',
		//	'browser_version' : '43.0',
		//	'os' : 'OS X',
		//	'os_version' : 'Yosemite',
		//	'resolution' : '1280x1024'
		//}
    ],

    //framework: "jasmine2",

    suites: {
		login: 'specs/general/login/*Spec.js'
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 99999999999999
    },

    onPrepare: function() {
        global.config = require('./config.js');
		browser.driver.manage().window().setSize(1280, 4000);
        browser.getCapabilities().then(function (cap) {
            browser.browserName = cap.caps_.browserName;
        });

        var path = require('path');
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'screenshots/' + moment().format('YYYYMMMDD-HHmm'),
            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                // Return '<browser>/<specname>' as path for screenshots:
                // Example: 'firefox/list-should work'.
                return path.join(capabilities.caps_.browserName, descriptions.join('-'));
            }
        }));

		if (browser.params.baseUrl !== '') {
			global.baseUrl = browser.params.baseUrl;
		} else {
			global.baseUrl = global.config.baseUrl;
		}

        global.pInsights = require(__dirname + '/commons/pInsights.js');
		global.loginPage = pInsights.getPage('login');
		global.logoutPage = pInsights.getPage('logout');
		global.homePage = pInsights.getPage('home');

		global.notebookUrls = {};//store url to report
		global.ticketUrls = {};//store jira ticket to report
		global.reportInfo = {};//store information needed to report

		global.reportBaseUrl = config.reportBaseUrl || __dirname;

        browser.ignoreSynchronization = true;
        global.sharedSetup = function(usingGlobalDoc, page, waitElements) {
            beforeEach(function() {
                browser.driver.manage().deleteAllCookies();
                pInsights.checkLogin();

                if (page) {
                    pInsights.getPage(page).go();
                    pInsights.waitElementsPresent(waitElements);
                }
            });
        };
    },

    onComplete: function() {
        logoutPage.go();
    }
};
