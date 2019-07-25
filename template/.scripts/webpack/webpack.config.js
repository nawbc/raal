'use strict'
const fs = require('fs-extra');
const webpack = require("webpack");
const resolve = require('resolve');
const banner = require('../utils/banner');
const resolveJsonPath = require('../utils/resolveJsonPaths');
const configJson = require('../config.json');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { names, rootPath, constPaths, publicExtUrl } = configJson;
const WebpackProgressBar = require('webpack-progress-bar')

const rPath = resolveJsonPath(rootPath, constPaths);
const isTs = fs.existsSync(rPath.tsConfig);


//======================================================================
// come from create-react-app to get the public path
//======================================================================
function ensureSlash(inputPath, needsSlash) {
	const hasSlash = inputPath.endsWith('/');
	if (hasSlash && !needsSlash) {
		return inputPath.substr(0, inputPath.length - 1);
	} else if (!hasSlash && needsSlash) {
		return `${inputPath}/`;
	} else {
		return inputPath;
	}
}

const getPublicUrl = json => process.env.PUBLIC_URL || require(json).homepage;

const getServedPath = (json) => {
	const publicUrl = getPublicUrl(json);
	const servedUrl = process.env.PUBLIC_URL || (publicUrl ? url.parse(publicUrl).pathname : publicExtUrl);
	return ensureSlash(servedUrl, true);
}

module.exports = function (env, action) {
	const isDevelopment = env === 'development';
	const isProduction = env === 'production';
	const isApp = action === 'app';
	const isLib = action === 'lib';
	const filterUseless = (e) => e !== false && e !== undefined && e !== null;
	const publicPath = isProduction ? getServedPath(rPath.packageJson) : isDevelopment && '/';
	const isRelativeAssetPaths = publicPath === './';
	const publicUrl = isProduction ? publicPath.slice(0, -1) : isDevelopment && '';
	let enPath = null;

	if ((isDevelopment || isProduction) && isApp) {
		enPath = {
			entry: rPath.appEntryTsx,
			output: rPath.appOutput
		}
	} else if (isProduction && isLib) {
		enPath = {
			entry: rPath.libEntryTsx,
			output: rPath.libOutput
		}
	}

	//======================================================================
	// lib plugin
	//======================================================================

	const libPlugin = [
		isDevelopment && new webpack.BannerPlugin(banner),
		isDevelopment && new WatchMissingNodeModulesPlugin(rPath.nodeModules),
		isProduction && new MiniCssExtractPlugin({
			filename: 'static/css/[name].css',
			chunkFilename: 'static/css/[name].chunk.css',
		}),
		isTs && new ForkTsCheckerWebpackPlugin({
			typescript: resolve.sync('typescript', {
				basedir: rPath.nodeModules,
			}),
			async: isDevelopment,
			useTypescriptIncrementalApi: true,
			checkSyntacticErrors: true,
			tsconfig: rPath.tsConfig,
			reportFiles: [
				'**',
				'!**/*.json',
				'!**/__tests__/**',
				'!**/?(*.)(spec|test).*',
				'!**/src/setupProxy.*',
				'!**/src/setupTests.*',
			],
			watch: rPath.appSrc,
			silent: true,
			formatter: isProduction ? typescriptFormatter : undefined,
		}),
	].filter(e => filterUseless(e));
	//======================================================================
	// app plugin concat lib plugin
	//======================================================================
	const appPlugin = [
		new HtmlWebpackPlugin(
			{
				inject: true,
				template: rPath.appHtml,
			},
			isProduction
				? {
					minify: {
						removeComments: true,
						collapseWhitespace: true,
						removeRedundantAttributes: true,
						useShortDoctype: true,
						removeEmptyAttributes: true,
						removeStyleLinkTypeAttributes: true,
						keepClosingSlash: true,
						minifyJS: true,
						minifyCSS: true,
						minifyURLs: true,
					},
				}
				: undefined
		),
		new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
			NODE_ENV: process.env.NODE_ENV || 'development',
			PUBLIC: publicUrl,
		}),
		isDevelopment && new webpack.HotModuleReplacementPlugin(),
		isDevelopment && new CaseSensitivePathsPlugin(),
		new ManifestPlugin({
			fileName: '_manifest.json',
			publicPath: rPath.appPublic,
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		isProduction &&
		new WorkboxWebpackPlugin.GenerateSW({
			clientsClaim: true,
			exclude: [/\.map$/, /_manifest\.json$/],
			importWorkboxFrom: 'cdn',
			navigateFallback: rPath.appHtml,
			navigateFallbackBlacklist: [
				new RegExp('^/_'),
				new RegExp('/[^/]+\\.[^/]+$'),
			],
		}),
		new WebpackProgressBar({
			incomplete: {
				bg: 'white',
				content: ' '
			},
			complete: {
				bg: 'cyan',
				content: ' '
			},
			width: 25,
			clear: true,
			total: 100
		})
	].concat(libPlugin).filter(e => filterUseless(e));

	//======================================================================

	const optimization = {
		minimize: isProduction,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					parse: {
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,

						comparisons: false,
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true,
					},
				},

				parallel: true,
				cache: true,
				sourceMap: isProduction,
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					map: isProduction
						? {
							inline: false,
							annotation: true,
						} :
						false
				},
			}),
		],
		splitChunks: {
			chunks: 'all',
			name: false,
		},
		runtimeChunk: true,
	};
	//======================================================================
	const modules = {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|mjs|jsx)$/,
				enforce: 'pre',
				use: [
					{
						options: {
							formatter: require.resolve('react-dev-utils/eslintFormatter'),
							eslintPath: require.resolve('eslint'),
						},
						loader: require.resolve('eslint-loader'),
					},
				],
				include: rPath.appSrc,
			},
			{
				oneOf: [
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: 'static/source/[name].[hash:8].[ext]',
						},
					},

					{
						test: /\.(js|mjs|jsx|ts|tsx)$/,
						include: rPath.appSrc,
						loader: require.resolve('babel-loader'),
						options: {
							customize: require.resolve(
								'babel-preset-react-app/webpack-overrides'
							),
							plugins: [
								[
									require.resolve('babel-plugin-named-asset-import'),
									{
										loaderMap: {
											svg: {
												ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
											},
										},
									},
								],
							],
							cacheDirectory: true,
							cacheCompression: isProduction,
							compact: isProduction,
						},
					},
					{
						test: /\.(js|mjs)$/,
						exclude: /@babel(?:\/|\\{1,2})runtime/,
						loader: require.resolve('babel-loader'),
						options: {
							babelrc: false,
							configFile: false,
							compact: false,
							presets: [
								[
									require.resolve('babel-preset-react-app/dependencies'),
									{ helpers: true },
								],
							],
							cacheDirectory: true,
							cacheCompression: isProduction,
							sourceMaps: isProduction,
						},
					},
					{
						test: /\.s(c|a)ss$/,
						use: [
							{
								loader: "style-loader"
							},
							{
								loader: "css-loader"
							},
							{
								loader: "sass-loader"
							}
						]
					},
					{
						test: /\.css$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: "css-loader",
								options: Object.assign(
									{
										sourceMap: isProduction,
									},
									isRelativeAssetPaths ? { publicPath: '../../' } : {}
								)
							}
						]
					},
					{
						loader: require.resolve('file-loader'),
						exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.htm?(.|l)$/, /\.json$/],
						options: {
							name: 'static/source/[name].[ext]',
						},
					},
				]
			}
		],
	};

	//========================================================
	const output = Object.assign(
		{
			path: enPath.output,
			filename: isProduction && isApp ?
				'static/js/[name].js' :
				isDevelopment && 'static/js/bundle.js',
			chunkFilename: 'static/js/[name].chunk.js',
			pathinfo: isDevelopment,
		},
		isLib && isProduction ?
			{
				library: names.library,
			} : {}
	)

	return {
		entry: [
			isDevelopment &&
			require.resolve('react-dev-utils/webpackHotDevClient'),
			enPath.entry
		].filter(e => filterUseless(e)),
		output: output,
		mode: env && 'development',
		devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
		optimization: optimization,
		module: modules,
		resolve: {
			extensions: [".js", ".json", ".jsx", ".tsx", ".ts", ".json", ".css", ".scss"]
		},
		plugins: (isLib && isProduction) ? libPlugin : appPlugin,
		node: {
			module: 'empty',
			dgram: 'empty',
			dns: 'mock',
			fs: 'empty',
			net: 'empty',
			tls: 'empty',
			child_process: 'empty',
		},
	};
}
