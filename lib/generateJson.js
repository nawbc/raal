const pkg = require('../template/package.json');
const fs = require('fs-extra');

module.exports = (targetPkg, name, program) => new Promise((resolve, reject) => {
	const customContent = {
		author: program.author || '',
		version: '0.0.0',
		name: name,
		license: program.license || ''
	};

	if (fs.existsSync(targetPkg)) {
		const genPkg = JSON.stringify({
			...pkg,
			...customContent
		}, null, '\t');
		fs.writeFile(targetPkg, genPkg, { encoding: 'utf8' }, function (err) {
			if (err) reject(err);
			resolve(true);
		});
	}
});

