const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
  },
	devtool: 'source-map',
  entry: ['@babel/polyfill', './src/index.ts'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
	},
  module: {
		rules: [
			{
				test: /\.ts?$/,
				use: {
          loader: 'babel-loader',
          options: {
            presets: [
							'@babel/preset-env',
							'@babel/preset-typescript'
						],
          },
        },
				exclude: ['/node_modules'],
			},
			{
				test: /\.css$/, 
				use: ["style-loader", "css-loader"], 
			},
		],
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
			},
			minify: process.env.NODE_ENV === 'production' ? {
				collapseWhitespace: true,
				removeComments: true,
			} : false,
			hash: true,
    })
  ]
};