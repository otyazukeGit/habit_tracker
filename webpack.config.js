const path = require('path');

const outputPath = path.join(__dirname, 'build')

const mainConfig = {
	mode: "production",
	target: 'electron-main',
	entry: "./src/main.tsx",
	output: {
		path: outputPath,
		filename: "main.js"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader"
			}
		]
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	}
}

const rendererConfig = {
	mode: "production",
	target: 'electron-renderer',
	entry: "./src/renderer.tsx",
	output: {
		path: outputPath,
		filename: "renderer.js"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader"
			}
		]
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	node: {
		// 起動時に発生する Not allowed to load local resource 対策
		// https://github.com/electron/electron/issues/4867
		__dirname: false,
		__filename: false
	}
}


module.exports = [mainConfig, rendererConfig]
