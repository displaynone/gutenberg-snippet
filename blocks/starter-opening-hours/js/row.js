/**
 * Block.
 * 
 * This is where we define our block.
 */

/**
 * Block Dependencies.
 */

// From Block
import attributes from "./attributes"; // Attribute Registration

// Imported from WordPress
import classnames from 'classnames'; // Enables us to concat classnames

// Internal Block Libraries
const { registerBlockType } = wp.blocks;
const {
	InnerBlocks,
	RichText,
}                           = wp.editor;
const { __ }                = wp.i18n; // Localization

/**
 * Register Block
 */
export default registerBlockType( 'plugin-name/starter-opening-hours-row', {

	// Set the title.
	title: __( 'Starter Opening Hours Row', 'plugin-name' ),

	// Set the description.
	description: __( 'A starter block that provides useful boilerplating for an opening hours row block.', 'plugin-name' ),
	
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
		src: 'clock'              // WordPress Dashicon reference (we can pass an svg for custom icon)
	},
	keywords:[
		__( 'Starter' ),
		__( 'Opening Hours Row' ),
		__( 'Opening Hours Row Starter' ),
	],

	// Enable the align left / right / center controls in the toolbar.
	supports: {
		align: false,
	},

	// Only allow this as a child of the following blocks.
	parent: [ 'plugin-name/starter-opening-hours' ],

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
				additionalInformation,
			},
			className, 
			setAttributes, 
			isSelected,
		} = props;

		/**
		 * Functions.
		 * 
		 * Functions for this Component.
		 */
		const onChangeAdditionalInformation      = additionalInformation => { setAttributes( { additionalInformation } ) };

		/**
		 * Return 
		 * 
		 * Here is where we return our JSX. Note that because we are not passing in Inspector
		 * Controls or a Toolbar, we don't need to return an array.
		 */
		return (
			<div
				className={ classnames( className, 'starter-opening-hours-row' ) } 
			>
				<div class="starter-opening-hours__column starter-opening-hours__column--day">
					TEST
				</div>
				<div class="starter-opening-hours__column starter-opening-hours__column--open">
					TEST
				</div>
				<div class="starter-opening-hours__column starter-opening-hours__column--closed">
					TEST
				</div>
			</div>
		);
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
				additionalInformation,
			},
			className, 
		} = props;

		/**
		 * Return 
		 * 
		 * For the most part this should be plain HTML with a few
		 * { variables } scattered around.
		 */
		return (
			<tr
				className={ classnames( className, 'starter-opening-hours-row' ) } 
			>
				<td>
					TEST
				</td>
				<td>
					TEST
				</td>
				<td>
					TEST
				</td>
			</tr>
		);
	},
} );
