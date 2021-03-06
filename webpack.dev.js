/* eslint-disable */

const { join } = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const WorkboxPlugin = require('workbox-webpack-plugin');

const dist = join(__dirname, 'dist');

module.exports = merge(commonConfig, {
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new WorkboxPlugin.InjectManifest({
			swSrc: './src/service_worker.ts',
			swDest: 'sw.js',
			exclude: [/\.*$/],
		}),
	],
	devServer: {
		contentBase: dist,
		port: process.env.PORT || 5000,
		historyApiFallback: true,
		compress: false,
		inline: true,
		hot: true,
	},
});
