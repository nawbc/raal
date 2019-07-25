const fs = require('fs-extra');
const path = require('path');
const generateJson = require('./generateJson');
const chalk = require('chalk');
const { consoleError } = require('./utils/console');
const NODE_MODULES = 'node_modules$';

const mkdirp = (src, isDir, callback) => {
	const isExist = fs.existsSync(src);
	if (!isExist && isDir) fs.mkdirSync(src);
	if (callback) callback(isExist);
};

const filterFunc = (src) => !(new RegExp(NODE_MODULES).test(src));

module.exports = function (info) {
	const { currentPath, argv, srcPath, program } = info;
	const destPath = path.resolve(currentPath, argv[0]);
	const srcTemplatePath = path.resolve(srcPath, './template');
	const targetPkgPath = path.resolve(destPath, './');

	mkdirp(destPath, true, (isExist) => {
		if (isExist) {
			consoleError(destPath + ' has existed in current path , please rename it');
			process.exit(1);
		} else {
			fs.copy(srcTemplatePath, destPath, { filter: filterFunc })
				.then(() => {
					generateJson(targetPkgPath, argv[0], program)
						.then((a) => {
							if (a) console.log(chalk.green('Success: template is copied finish'));
						})
						.catch(err => {
							consoleError(err);
							process.exit(1);
						});
				})
				.catch((err) => {
					consoleError(err);
				});
		}
	});
};
