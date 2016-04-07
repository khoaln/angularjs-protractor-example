describe('Example - Login', function() {

    beforeEach(function() {
        browser.driver.manage().deleteAllCookies();
        loginPage.go();
        pInsights.waitElementsPresent([loginPage.submit]);
    });

    it('should login successfully', function() {
        loginPage.logIn(config.username, config.password);
		pInsights.waitElementsPresent([homePage.dashBoardLink]);
        expect(homePage.dashBoardLink.isPresent()).toBe(true);
    });

    it('should not logged in with an invalid username and an error message is shown', function() {
        loginPage.logIn(config.username + "a", config.password);
        pInsights.waitElementsPresent([
            loginPage.username,
            loginPage.alertError
        ]);
        expect(loginPage.username.isPresent()).toBe(true);
        expect(loginPage.alertError.isPresent()).toBe(true);
    });

    it('should not logged in with an invalid password and an error message is shown', function() {
        loginPage.logIn(config.username, config.password + "a");
        pInsights.waitElementsPresent([
            loginPage.username,
            loginPage.alertError
        ]);
        expect(loginPage.username.isPresent()).toBe(true);
        expect(loginPage.alertError.isPresent()).toBe(true);
    });

    afterEach(function() {
        logoutPage.go();
		browser.sleep(5000);
    });
});