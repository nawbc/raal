const pkg = require('../../package.json');
const banner = `
									Name: ${pkg.name}
											Author:  ${pkg.author}
											version: ${pkg.version}
										LICENSE ${pkg.license}`;
module.exports = banner;
