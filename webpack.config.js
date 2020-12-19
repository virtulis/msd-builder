const miniCss = require('mini-css-extract-plugin');
const html = require('html-webpack-plugin');

module.exports = (env, argv) => ({
	entry: './src/builder.tsx',
	output: {
		filename: 'builder.js',
		path: process.cwd() + '/dist/'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
			},
			{
				test: /\.scss$/,
				use: [
					argv.mode !== 'production' ? 'style-loader' : miniCss.loader,
					'css-loader',
					'sass-loader',
				]
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.mjs', '.js', '.json'],
	},
	plugins: [
		new html({
			template: 'src/builder.html',
		}),
		new miniCss()
	],
	devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
	mode: argv.mode || 'development'
});
