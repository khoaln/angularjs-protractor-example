# angularjs-protractor-example

An example for using Protractor (https://angular.github.io/protractor/#/) on automation end to end testing for Angularjs projects.

## Setup
* Install packages:
	<pre>
    npm install
    </pre>
* Creat config.js file:
    > Duplicate "sample.config.js" file and rename to "config.js". Then modify the configuration values.
## Run server
* Or in case using protractor built in:
	<pre>
    ./node_modules/.bin/webdriver-manager update
    ./node_modules/.bin/webdriver-manager start
    </pre>
## Run tests
* Run all test cases:
	<pre>
    ./node_modules/.bin/protractor conf.js
    </pre>
* Run 'smartquery' test suite:
	<pre>
    ./node_modules/.bin/protractor conf.js --suite=login
    </pre>
* Run one test spec:
    <pre>
    ./node_modules/.bin/protractor conf.js --specs path/to/spec/file.js
    </pre>
* Using iit() to run only one test case or ddescribe() to run only the test cases in that describe(). (fit() and fdescribe()
in case using jasmine2

