/**
 * webpack
 *
 * Triggered via NPM commands to build development or production
 * environments with the commands:
 *
 * npm run dev
 *
 * or
 *
 * npm run build
 *
 * This file concatinates and minifies your CSS and JS and runs
 * transformations where configured.
 */
const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const convertToCamelCase = ( str ) => {
	return str.replace(
		/\W+(.)/g,
		function( match, chr ) {
			return chr.toUpperCase();
		}
	);
};

/**
 * webpack main config
 */
module.exports = {
	mode: 'production',
	/**
	 * JavaScript entry points.
	 *
	 * Note that index.js in the blocks is the main entry point of the block,
	 * This is compiled into editor.js in the assets/js folder.
	 */
	entry: {
		blocks: './src/blocks.js',
		frontend: './src/frontend.js',
	},
	output: {
		path: path.resolve( __dirname, './assets' ),
		filename: 'js/[name].js',
	},
	devtool: 'cheap-eval-source-map',
	module: {
		rules: [
			// Babel
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-react' ],
					},
				},
			},
			// Scss
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require( 'autoprefixer' ),
							],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							url: false,
							sourceMap: false,
						},
					},
				],
			},
		],
	},
	externals: [
		{
			react: 'React',
			'react-dom': 'ReactDOM',
			jquery: 'jQuery',
			lodash: 'lodash',
			'highlight.js': 'hljs',
		},
		// Define Wordpress libraries as externals
		// see https://webpack.js.org/configuration/externals/#function
		function( context, request, callback ) {
			const wpLibMatches = request.match( /^\@(wp|wordpress)\/(.*)/i );

			if ( wpLibMatches ) {
				return callback( null, 'window.wp.' + convertToCamelCase( wpLibMatches[ 2 ] ) );
			}
			callback();
		},
	],
	plugins: [

		new webpack.NamedModulesPlugin(),
		new MiniCssExtractPlugin( {
			filename: 'css/[name].css',
			chunkFilename: 'css/[name].css',
		} ),
	],
};
