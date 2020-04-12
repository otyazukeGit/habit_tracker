const path = require('path');

const outputPath = path.join(__dirname, 'dist')

const mainConfig = {
	mode: "development",
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
	mode: "development",
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
	}
}


module.exports = [mainConfig, rendererConfig]
