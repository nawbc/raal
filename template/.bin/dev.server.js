'use strict'

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const chalk = require('react-dev-utils/chalk');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const openBrowser = require('react-dev-utils/openBrowser');
const webpackConfig = require('../.scripts/webpack/webpack.config');
const resolveJsonPath = require('../.scripts/utils/resolveJsonPaths');
const { port, constPaths, rootPath, host } = require('../.scripts/config.json');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const fs = require('fs');
const os = require('os');
const {
	createCompiler,
	prepareUrls,
	choosePort
} = require('react-dev-utils/WebpackDevServerUtils');

const DEFAULT_PORT = parseInt(process.env.PORT) || port;
const rPath = resolveJsonPath(rootPath, constPaths);

if (!checkRequiredFiles([rPath.appHtml, rPath.appEntryTsx, rPath.libEntryTsx])) {
	process.exit(1);
}

const handleHost = () => {
	let HOST;
	switch (os.platform()) {
		case 'win32':
			HOST = os.networkInterfaces()['WLAN'] ? os.networkInterfaces()['WLAN'][1]['address'] : '0.0.0.0';
			break;
		case 'linux':
			HOST = os.networkInterfaces()['eth0'] ? os.networkInterfaces()['eth0'][1]['address'] : '0.0.0.0';
			break;
		default:
			HOST = '0.0.0.0';
			break;
	}
	return HOST;
}
// if exist the host in config.json, use config.json first
const finalHost = host || handleHost();

choosePort(host, DEFAULT_PORT).then(port => {
	if (port === void 0) return 0;

	const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
	const appName = resolveJsonPath.name;
	const useTypeScript = fs.existsSync(constPaths.tsConfig);
	const urls = prepareUrls(protocol, finalHost, port);

	const devSocket = {
		warnings: warnings =>
			devServer.sockWrite(devServer.sockets, 'warnings', warnings),
		errors: errors =>
			devServer.sockWrite(devServer.sockets, 'errors', errors),
	};
	const config = webpackConfig('development', 'app');
	const serverConfig = {
		compress: true,
		clientLogLevel: 'none',
		contentBase: rPath.appPublic,
		watchContentBase: true,
		hot: true,
		publicPath: '/',
		quiet: true,
		https: protocol === 'https',
		host: finalHost,
		overlay: false,
		historyApiFallback: {
			disableDotRule: true,
		},
		public: urls.lanUrlForConfig,
		before(app, server) {
			app.use(evalSourceMapMiddleware(server));
			app.use(errorOverlayMiddleware());
			app.use(noopServiceWorkerMiddleware());
		},
	};

	const compiler = createCompiler({
		appName,
		config,
		devSocket,
		urls,
		useTypeScript,
		webpack,
	});

	const devServer = new WebpackDevServer(compiler, serverConfig);
	devServer.listen(port, finalHost, (err) => {
		if (err) console.trace(chalk.red(err));
		if (process.stdout.isTTY) {
			clearConsole();
		}
		console.log(chalk.green(`Muguet development server runing on ${finalHost}:${port} ...\n`));
		openBrowser(urls.localUrlForBrowser);
	})
})
