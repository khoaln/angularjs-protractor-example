describe('Example - Logout', function() {
    it('should logout successfully', function() {
        browser.driver.manage().deleteAllCookies();
        loginPage.go();
        pInsights.waitElementsPresent([loginPage.submit]);
        loginPage.logIn(config.username, config.password);
        logoutPage.go();
        pInsights.waitElementsPresent([loginPage.username]);
        expect(loginPage.username.isPresent()).toBe(true);
    });
});