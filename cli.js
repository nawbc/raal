'use strict';

const copyToCurrent = require('./lib/copyToCurrent');
const chalk = require('chalk');
const pkg = require('./package.json');
const semver = require('semver');
var program = require('commander');

if (semver.lt(process.version, '8.0.0')) {
	console.error(chalk.red('node version needs to higher than v8'));
	process.exit(1);
}

program
	.version(pkg.version, '-v', '--version')
	.usage('[options] <name>')
	.option('-a,  --author <name>', 'add Author')
	.option('-l,  --license <name>', 'add License')
	.parse(process.argv);


if (program.args.indexOf('react') > -1 || program.args.indexOf('react-dom') > -1) {
	console.log();
	console.error(chalk.red(
		` item name can't include ${chalk.green('react, react-dom')} `
	));
	console.log();
} else if (program.args.length !== 1) {
	console.log();
	console.error(chalk.red(
		'Error: you need to input one name ! \n'
	));
	program.outputHelp(txt => chalk.green(txt));
	console.log();
} else {
	const currentPath = process.cwd();
	const argv = program.args;
	const srcPath = __dirname;
	copyToCurrent({ currentPath, argv, srcPath, program });
}
