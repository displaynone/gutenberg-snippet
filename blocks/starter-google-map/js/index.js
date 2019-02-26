/**
 * Block.
 * 
 * This is where we define our block.
 */

/**
 * Import Assets.
 * 
 * With webpack, we import the SCSS into the JS so that it can be parsed.
 * Dont worry, these will be compiled into their respective CSS files.
 */
import '../scss/blockEditor.scss'; // Block editor styles
import '../scss/block.scss';       // Block styles

/**
 * Block Dependencies.
 */

// From Block
import initMap from './initMap';
import loadLibrary from './loadLibrary'; // TODO: Make this PHP load
import attributes from './attributes'; // Attribute Registration
import Inspector from './inspector';   // InspectorControls (Sidebar)

// Imported from WordPress
import classnames from 'classnames'; // Enables us to concat classnames

// Internal Block Libraries
const { registerBlockType } = wp.blocks;
const { Fragment }          = wp.element;
const { __ }                = wp.i18n; // Localization

/**
 * Register Block
 */
export default registerBlockType( 'plugin-name/starter-google-map', {

	// Set the title.
	title: __( 'Starter Google Map', 'plugin-name' ),

	// Set the description.
	description: __( 'Display a responsive Google Map in your content, complete with a handful of configuration options.', 'plugin-name' ),
	
	// Select a category.
	category: 'starter-blocks', // Custom (see ./index.php)
	// category:   'common',
	// category:   'embed',
	// category:   'formatting',
	// category:   'layout',
	// category:   'widgets',

	// Set the icon.
	icon: {
		background: '#2cc795',    // Icon custom background colour
		foreground: '#fff',       // Icon custom forground colour
		src: 'location-alt' // WordPress Dashicon reference (we can pass an svg for custom icon)
	},
	keywords:[
		__( 'Google Maps Embed' ),
		__( 'Google Maps' ),
		__( 'Google' ),
	],

	// Supports options
	// https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/#supports-optional
	supports: {
		align: true,
		anchor: false,
		html: false,
		multiple: false,
		reusable: false,
	},

	// Allow component to be used once only.
	useOnce: true,

	// Import the attributes
	attributes,

	/**
	 * Edit
	 * 
	 * If we were doing something with an API we would use withSelect here, and use slightly
	 * different syntax, but we are not in this example.
	 */
	edit: props => {

		/**
		 * Extract Props
		 * 
		 * We could access props by typing props.attributes.name, or props.name.
		 * However setting them up here gives us an easy reference of what we can
		 * use in our component.
		 */
		const {
			attributes: {
				gMapEmbedAPIKey,
				gMapEmbedLocation,
				gMapEmbedInfoWindowTitle,
				gMapEmbedInfoWindowContent,
				gMapEmbedType,
				gMapEmbedZoom,
				gMapEmbedDisableUI,
				gMapEmbedSkipFetch,
			},
			className, 
			setAttributes, 
			isSelected,
		} = props;

		// Create an empty timeout variable.
		let timeout = null;

		/**
		 * Functions.
		 * 
		 * Functions for this Component.
		 */
		
		// Bind our Google Maps API callback to the window, which lets us call initMap.
		window.initGoogleMapEmbed = function() {
			initMap( props.attributes );
		};

		// Create the <script> element to pull in the Google Maps JS API library,
		// and add it to the DOM, if it doesn't already exist, and we have a key.
		
		if ( gMapEmbedAPIKey && gMapEmbedLocation ) {
			loadLibrary( props.attributes );
		}

		/**
		 * Return 
		 * 
		 * Here is where we return our JSX. Note that we are returning an array.
		 * We are passing in:
		 * 
		 * - InspectorControls
		 * - Edit View
		 * 
		 * Note how we pass props to our custom components.
		 */
		return [
			<Inspector { ...{ setAttributes, ...props } }/>,
			<div
				id="starter-google-map"
				className={ classnames( 
					className,
					'starter-google-map',
					gMapEmbedAPIKey && gMapEmbedLocation ? 'has-api-key' : 'no-api-key',
				) }
			>
				{ gMapEmbedAPIKey && gMapEmbedLocation ? (
					<Fragment>
						{ gMapEmbedSkipFetch ? initMap( props.attributes, false ) : initMap( props.attributes ) }
					</Fragment>
				) : (
					<p>
						{ __( 'Please enter your API Key and Location in the sidebar to render the map.', 'plugin-name' ) }
					</p>
				) }
			</div>
		];
	},

	/**
	 * Save
	 * 
	 * It is possible to render the save view in PHP. We are not in this example though.
	 * 
	 * We pass in the props we need for output. Which should not be as many as in the 
	 * Edit View.  
	 */
	save: props => {

		const {
			attributes: {
				gMapEmbedAPIKey,
				gMapEmbedLocation,
				gMapEmbedInfoWindowTitle,
				gMapEmbedInfoWindowContent,
				gMapEmbedType,
				gMapEmbedZoom,
				gMapEmbedDisableUI,
				gMapEmbedSkipFetch,
			},
			className, 
		} = props;

	
		/**
		 * Return 
		 * 
		 * For the most part this should be plain HTML with a few
		 * { variables } scattered around.
		 *
		 * Microformats
		 * 
		 * Note that we are using the following microformats:
		 * 
		 * - TBD
		 */
		return (
			<div
				id="starter-google-map"
				className={ classnames( 
					className,
					'starter-google-map',
					gMapEmbedAPIKey && gMapEmbedLocation ? 'has-api-key' : 'no-api-key',
				) }
				data-apikey={ gMapEmbedAPIKey }
				data-location={ gMapEmbedLocation }
				data-title={ gMapEmbedInfoWindowTitle }
				data-text={ gMapEmbedInfoWindowContent }
				data-type={ gMapEmbedType }
				data-zoom={ gMapEmbedZoom }
				data-disableui={ gMapEmbedDisableUI }
			>
			</div>
		);
	},
} );
