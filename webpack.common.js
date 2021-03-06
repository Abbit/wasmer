/* eslint-disable */

const { join, resolve } = require('path');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const dist = join(__dirname, 'dist');

module.exports = {
	entry: {
		app: './src/index',
	},
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx'],
		modules: [resolve(__dirname, 'node_modules'), 'node_modules'],
	},
	output: {
		path: dist,
		filename: '[name].[hash].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							['@babel/preset-typescript', { jsxPragma: 'h' }],
							['@babel/preset-react', { jsxPragma: 'h' }],
						],
						plugins: [
							['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
							'@babel/proposal-class-properties',
							'@babel/proposal-object-rest-spread',
							'@babel/plugin-transform-runtime',
						],
					},
				},
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							limit: 10000,
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanPlugin(),
		new CopyPlugin({ patterns: [{ context: 'static/', from: '**/*.*', to: dist }] }),
		new HtmlPlugin({ template: './src/index.html' }),
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			name: 'vendor',
		},
	},
};
