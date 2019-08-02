const { exec } = require('child_process');
const chalk = require('react-dev-utils/chalk');
const path = require('path');
const copy = require('recursive-copy');

const args = process.argv.slice(2)[0]
const isLib = args === 'lib';


const compileWithBabel = () => new Promise((resolve, reject) => {
	console.log(`${isLib ? 'babel' : 'tsc'} start compile.....`)
	exec(`npm run ${isLib ? 'lib:babel' : 'es:tsc'}`, (err, stdout) => {
		if (err) reject(err);
		resolve(stdout);
	})
})

const generateDts = () => new Promise((resolve, reject) => {
	console.log('start generate d.ts.....')
	exec(`npm run ${isLib ? 'dts:lib' : 'dts:es'}`, (err) => {
		if (err) reject(err);
		resolve('d.ts generates successfully');
	})
})

const compileScss = () => new Promise((resolve, reject) => {
	console.log('start compile scss.....')
	exec('npm run scss', (err, stdout, stderr) => {
		resolve(err ? stderr : 'Scss has been compiled successfully');
	})
})

const copyCssToLib = (src, target) => new Promise((resolve, reject) => {
	copy(src, target, {
		overwrite: true,
		filter: /\.css$/,
	}, (err) => {
		if (err) reject(err);
		resolve('CSS in the library has been successfully copied')
	})
})

compileWithBabel()
	.then((std) => {
		console.log(chalk.cyan(std));
		return compileScss();
	})
	.then((std) => {
		console.log(chalk.yellow(std));
		console.log();
		return copyCssToLib(
			path.resolve(process.cwd(), './lib'),
			path.resolve(process.cwd(), `./release/${isLib ? 'lib' : 'es'}`),
		);
	})
	.then((std) => {
		console.log(chalk.green(std));
		console.log();
		return generateDts();
	})
	.then((std) => {
		console.log(chalk.magenta(std));
		console.log();
	})
	.catch((err) => {
		console.log(chalk.red(err));
	})
