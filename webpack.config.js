const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = 
{
	entry	: './src/main.js',
	mode	: 'development',
	output	: 
	{
		path		: path.resolve(__dirname, 'build'),
		filename	: process.env.NODE_ENV === 'production' ? 'grid.min.js' : 'grid.js',
	},
	optimization: 
	{
		minimize: process.env.NODE_ENV === 'production' ? true : false,
		minimizer: [new TerserPlugin(
		{
			extractComments: false,
			terserOptions: 
			{
				format: {	comments: false,	},
			},
		})],
	},
	performance: 
	{
		maxAssetSize: 1024 * 1024 * 2, // 2 MB
		maxEntrypointSize: 1024 * 1024 * 2, // 2 MB
		hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
	},
	devServer: 
	{	
		static: 
		{
			directory: path.join(__dirname, 'public'),
			watch: true,
		},
		open: true,
		port: 1337,
		watchFiles: ['src/**/*'],
	},
};