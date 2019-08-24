const transformRenameImport = [
	"transform-rename-import",
	{
		"original": "^(.+?)\\.scss$",
		"replacement": "$1.css"
	}
];


const presets = [
	[
		"@babel/preset-env",
		{
			"targets": {
				"browsers": [
					"last 2 versions",
					"ie >= 8"
				]
			},
			"loose": true,
			"useBuiltIns": "usage",
			"corejs": "2",
		}
	],
	[
		"@babel/preset-react"
	],
	[
		"@babel/preset-typescript",
		{
			"isTSX": true,
			"allExtensions": true,
		}
	]
];

const plugins = [
	[
		"@babel/plugin-proposal-class-properties",
		{
			"loose": true
		}
	],
	[
		"@babel/plugin-syntax-dynamic-import"
	],
	[
		"@babel/plugin-transform-runtime"
	],
	[
		"import",
		{
			"libraryName": "muguet",
			"style": true
		}
	],
	process.env.NODE_ENV === 'production' && transformRenameImport
].filter(Boolean);




module.exports = { presets, plugins };
