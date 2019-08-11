'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = (env, argv) => {
	const wwwFolder = env.WWW;
	console.log('www = '+ wwwFolder);
	let conf = {
		entry: {
			main: [
				'./_devapp/index.js',
			]
		},
		output: {
			path: path.resolve(__dirname, '..', wwwFolder, 'docflow', 'assets', 'bundle'),
			filename: '[name].bundle.js'
		},
		resolve: {
			extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
			modules: [
				'node_modules',
				path.resolve(__dirname, '_devapp')
			],
			alias: {
				['~']: path.resolve(__dirname, '_devapp')
			}
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|tsx|ts)$/,
					exclude:path.resolve(__dirname, 'node_modules'),
					use: {
					loader: 'babel-loader',
					options: {
						presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								'@babel/preset-typescript'
							],
							plugins : [
								["@babel/plugin-proposal-decorators", { "legacy": true }],
								'@babel/plugin-syntax-dynamic-import',
								['@babel/plugin-proposal-class-properties', { "loose": true }]
							]
						}
					},
				},
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
							{
								loader: 'css-loader',
							},
							'postcss-loader',
							'sass-loader'
						]
					})
				},
				{
					test: /.(png|woff(2)?|eot|ttf|svg|gif|jpg|jpeg)(\?[a-z0-9=\.]+)?$/,
					use: [
					{
						loader: 'file-loader',
						options: {
							name: '../css/[hash].[ext]'
						}
					}
					]
				},
				{
					test : /\.css$/,
					use: ['style-loader', 'css-loader', 'postcss-loader']
				}
			]
		},
		// externals: {
		// 	myApp: 'myApp',
		// },
		//
		//path.resolve(__dirname, '..', wwwFolder, 'docflow', 'assets', 'css', 'app.css')
		plugins: [
			new ExtractTextPlugin(path.join('..', 'css', 'app.css')),
			new webpack.DefinePlugin({
				'__DEV__' : JSON.stringify(true),
				'__API_HOST__' : JSON.stringify('https://portal.agrocentrua.com/docflow'),
			}),
		],
	};

	if (env.NODE_ENV === 'production') {
		conf.optimization = {
			minimize: true
		};
	}
	return conf;
}

module.exports = config;
