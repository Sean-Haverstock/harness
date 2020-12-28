const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
const path = require('path');

const outputDirectory = 'dist';

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	entry: ['babel-polyfill', './client/index.tsx'],
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: './js/[name].bundle.js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
					},
				],
				exclude: /node_modules/,
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: './Less',
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					{ loader: 'css-loader' },
					{
						loader: 'less-loader',
						options: {
							strictMath: true,
							noIeCompat: true,
						},
					},
				],
			},
			{
				test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000',
			},
		],
	},
	resolve: {
		extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json', '.jpg'],
	},
	devServer: {
		port: 8050,
		hot: true,
		open: true,
		historyApiFallback: true,
		proxy: {
			'/api': 'http://localhost:3000',
		},
	},
	plugins: [
		new CleanWebpackPlugin([outputDirectory]),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new webpack.DefinePlugin(envKeys),
		new MiniCssExtractPlugin({
			filename: './css/[name].css',
			chunkFilename: './css/[id].css',
		}),
	],
};
