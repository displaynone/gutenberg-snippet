/**
 * webpack HMR
 */
const webpack = require( 'webpack' );
const common = require( './webpack.config.js' );
const merge = require( 'webpack-merge' );

/**
 * webpack main config
 */
module.exports = merge( common, {
	mode: 'development',
	devtool: 'inline-source-map',

	devServer: {
		host: 'localhost',
		port: 3000,
		historyApiFallback: true,
		hotOnly: true,
		inline: true,
		disableHostCheck: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
} );

module.exports.plugins.unshift( new webpack.HotModuleReplacementPlugin() );
module.exports.output = {
	publicPath: 'http://localhost:3000/',
};
module.exports.module.rules[ 1 ].use[ 0 ] = {
	loader: 'style-loader',
};
module.exports.module.rules[ 1 ].use[ 1 ].options.sourceMap = true;
module.exports.module.rules[ 1 ].use[ 3 ].options.sourceMap = true;
