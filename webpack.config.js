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
const path              = require( 'path' );
const webpack           = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

/**
 * WordPress Block Components.
 * 
 * Defines the WordPress Block Components.
 */
const wplib = [
  'blocks',
  'components',
  'date',
  'editor',
  'element',
  'i18n',
  'utils',
  'data',
];

/**
 * Extract CSS from JS.
 */
const adminCSS = new ExtractTextPlugin( {
	filename: './assets/css/admin.css',
} );

const blockCSS = new ExtractTextPlugin( {
	filename: './assets/css/block.css',
} );

const blockEditorCSS = new ExtractTextPlugin( {
	filename: './assets/css/block-editor.css',
} );

const editorCSS = new ExtractTextPlugin( {
	filename: './assets/css/editor.css',
} );

const styleCSS = new ExtractTextPlugin( {
	filename: './assets/css/style.css',
} );

/**
 * ExtractTextPlugin Config.
 * 
 * Configuration for the ExtractTextPlugin which extracts CSS from JS.
 * Note that the autoprefixer plugin is used here, so that CSS is 
 * prefixed with Cross-Browser variations.
 */
const extractConfig = {
	use: [
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				plugins: [ require( 'autoprefixer' ) ],
			},
		},
		{
			loader: 'sass-loader',
			query: {
				outputStyle:
				'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
			},
		},
	],
};

/**
 * webpack main config
 */
module.exports = {
	/**
	 * JavaScript entry points. 
	 * 
	 * Note that index.js in the blocks is the main entry point of the block,
	 * This is compiled into editor.js in the assets/js folder.
	 */ 
	entry: {
		'./assets/js/admin' : './assets/src/js/admin.js',
		'./assets/js/block-editor' : './blocks/block-editor.js',
		'./assets/js/block' : './blocks/block.js',
		'./assets/js/script' : './assets/src/js/script.js',
	},
	output: {
		path: path.resolve( __dirname ),
		filename: '[name].js',
	},
	/**
	 * Externals
	 * 
	 * Loop through the WordPress dependancies, and include each one when compiling.
	 * 
	 * Also Include any external code (such as React and ReactDOM), that third party
	 * libraries may be dependant on.
	 */
	externals: wplib.reduce((externals, lib) => {
		externals[`wp.${lib}`] = {
			window: ['wp', lib],
		};
		return externals;
	}, {
		'react': 'React',
		'react-dom': 'ReactDOM',
	}),
	watch: true,
	devtool: 'cheap-eval-source-map',
	module: {
		rules: [
			// Run babel to compile JSX and ESNext into ES5
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				},
			},
			// Extract CSS from JS
			{
				test: /admin\.s?css$/,
				use: adminCSS.extract( extractConfig ),
			},
			{
				test: /block\.s?css$/,
				use: blockCSS.extract( extractConfig ),
			},
			{
				test: /blockEditor\.s?css$/,
				use: blockEditorCSS.extract( extractConfig ),
			},
			{
				test: /editor\.s?css$/,
				use: editorCSS.extract( extractConfig ),
			},
			{
				test: /style\.s?css$/,
				use: styleCSS.extract( extractConfig ),
			},
		],
	},
	plugins: [
		adminCSS,
		blockCSS,
		blockEditorCSS,
		editorCSS,
		styleCSS,
	],
};
