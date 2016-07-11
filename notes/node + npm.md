# npm scripts

[Script types](https://docs.npmjs.com/misc/scripts):

* prepublish: Run BEFORE the package is published. (Also run on local npm install without any arguments.)
* publish, postpublish: Run AFTER the package is published.
* preinstall: Run BEFORE the package is installed
* install, postinstall: Run AFTER the package is installed.
* preuninstall, uninstall: Run BEFORE the package is uninstalled.
* postuninstall: Run AFTER the package is uninstalled.
* preversion, version: Run BEFORE bump the package version.
* postversion: Run AFTER bump the package version.
* pretest, test, posttest: Run by the npm test command.
* prestop, stop, poststop: Run by the npm stop command.
* prestart, start, poststart: Run by the npm start command.
* prerestart, restart, postrestart: Run by the npm restart command. Note: npm restart will run the stop and start scripts if no restart script is provided.

# Packages

Packages can be installed locally without

`npm install --save ./lib/plottable`

_where `./` is the base directory_

