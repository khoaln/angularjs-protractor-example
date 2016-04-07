var moment = require('moment');
var waitTime = 120000;

module.exports = {
    pages: {},
    globalDocId: '',
    userId: '',

    getPage: function(page) {
        var self = this;
        if (typeof self.pages[page] == 'undefined') {
            self.pages[page] = require(__dirname + '/../pages/' + page + 'Page.js');
        }
        return self.pages[page];
    },

	/**
	*Wait for all the elements to be available in the DOM
	*elements: an array of elements
	*wait: timeout time in ms
	*/
    waitElementsPresent: function(elements, wait) {
		var timeout;
		if (typeof wait !== 'undefined') {
			timeout = wait;
		} else {
			timeout = waitTime;
		}
        browser.wait(function() {
            var res = true;
            elements.forEach(function(el) {
                res = res && el.isPresent();
            });
            return res;
        }, timeout);
    },

	waitElementsDisplayed: function(elements) {
		browser.wait(function() {
			var res = true;
			elements.forEach(function(el) {
				res = res && el.isDisplayed();
			});
			return res;
		}, waitTime);
	},

    checkLogin: function() {
        this.getPage('login').go();
        if (this.userId === "") {
            this.waitElementsPresent([this.getPage('login').submit]);
            this.getPage('login').logIn(config.username, config.password);
            this.userId = browser.executeScript("return window.localStorage.getItem('Meteor.userId');");
        }
        this.waitElementsPresent([this.getPage('home').dashBoardLink]);
    },

	performClick: function(element, f) {
		this.waitElementsPresent([element]);
		if (typeof f === 'undefined') f = function(){};
		browser.executeScript('arguments[0].click()', element.getWebElement()).then(f, function(err){
			console.log(err);
		});
	},

	currentDate: function() {
		return moment().format('YYYY-MM-DD HH:mm:ss');
	},

	performDoubleClick: function(element) {
		this.waitElementsPresent([element]);
		browser.actions().doubleClick(element).perform();
		//var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
		//element.sendKeys(ctrlA);
		return element;
	},

	waitElementDisappear: function(element, maxWaitTime) {
		if (typeof maxWaitTime === 'undefined') {
			maxWaitTime = 10000;
		}

		browser.wait(function()
		{
			return browser.isElementPresent(element)
			  .then(function(presenceOfElement) {return !presenceOfElement});
		}, maxWaitTime);
	}
};