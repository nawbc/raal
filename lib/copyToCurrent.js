const fs = require('fs-extra');
const path = require('path');
const generateJson = require('./generateJson');
const chalk = require('chalk');
const { consoleError } = require('./utils/console');
const filterDir = '(node_modules|coverage|release)$';

const mkdirp = (src, isDir, callback) => {
	const isExist = fs.existsSync(src);
	if (!isExist && isDir) fs.mkdirSync(src);
	if (callback) callback(isExist);
};

const filterFunc = (src) => !(new RegExp(filterDir).test(src));

module.exports = function (info) {
	const { currentPath, argv, srcPath, program } = info;
	const destPath = path.resolve(currentPath, argv[0]);
	const srcTemplatePath = path.resolve(srcPath, './template');
	const targetPkgPath = path.resolve(destPath, './package.json');

	mkdirp(destPath, true, (isExist) => {
		if (isExist) {
			consoleError(destPath + ' has existed in current path , please rename it');
			process.exit(1);
		} else {
			fs.copy(srcTemplatePath, destPath, { filter: filterFunc })
				.then(() => {
					return generateJson(targetPkgPath, argv[0], program)
				})
				.then((a) => {
					if (a) console.log(chalk.green('Success: Template replication complete'));
				})
				.catch(err => {
					consoleError(err);
					process.exit(1);
				});
		}
	});
};
