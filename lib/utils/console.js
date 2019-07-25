const chalk = require('chalk');

exports.consoleError = function (err, callback) {
	console.log();
	console.error(chalk.red(err));
	if (callback) callback();
	console.log();
};

exports.consoleWarning = function (warn, callback) {
	console.log();
	console.error(chalk.yellow(warn));
	if (callback) callback();
	console.log();
};
