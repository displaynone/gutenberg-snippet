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
import attributes from "./attributes"; // Attribute Registration

// Imported from WordPress
import classnames from 'classnames'; // Enables us to concat classnames

// Internal Block Libraries
const { registerBlockType } = wp.blocks;
const {
	InnerBlocks,
	RichText,
}                           = wp.editor;
const { Fragment }          = wp.element;
const { __ }                = wp.i18n; // Localization

/**
 * Register Block
 */
export default registerBlockType( 'plugin-name/starter-opening-hours', {

	// Set the title.
	title: __( 'Starter Opening Hours', 'plugin-name' ),

	// Set the description.
	description: __( 'A starter block that provides useful boilerplating for an opening hours style block.', 'plugin-name' ),
	
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
		__( 'Opening Hours' ),
		__( 'Opening Hours Starter' ),
	],

	// Enable the align left / right / center controls in the toolbar.
	supports: {
		align: true,
	},

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
				additionalInformationTitle,
				columnClosedLabel,
				columnDayLabel,
				columnOpenLabel,
				title,
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
		const onChangeAdditionalInformationTitle = additionalInformationTitle => { setAttributes( { additionalInformationTitle } ) };
		const onChangeColumnClosedLabel          = columnClosedLabel => { setAttributes( { columnClosedLabel } ) };
		const onChangeColumnDayLabel             = columnDayLabel => { setAttributes( { columnDayLabel } ) };
		const onChangeColumnOpenLabel            = columnOpenLabel => { setAttributes( { columnOpenLabel } ) };
		const onChangeTitle                      = title => { setAttributes( { title } ) };

		/**
		 * Return 
		 * 
		 * Here is where we return our JSX. Note that because we are not passing in Inspector
		 * Controls or a Toolbar, we don't need to return an array.
		 */
		return (
			<section 
				className={ classnames( className, 'starter-opening-hours' ) } 
			>
				{ ( isSelected || title ) ? (
					<RichText
						tagName="h2"
						className={ 'starter-opening-hours__title' }
						placeholder={ __( 'Title', 'plugin-name' ) }
						keepPlaceholderOnFocus
						onChange={ onChangeTitle }
						value={ title }
					/>
				) : (
					<h2 class="starter-opening-hours__title visuallyhidden">{ __( 'Opening Hours', 'plugin-name' ) }</h2>
				) }
				<table class="starter-opening-hours__table">
					<thead>
						<tr>
							<th class="starter-opening-hours__column starter-opening-hours__column--day">
								<RichText
									tagName="div"
									className={ 'starter-opening-hours__column-day-label' }
									placeholder={ __( 'Day', 'plugin-name' ) }
									keepPlaceholderOnFocus
									onChange={ onChangeColumnDayLabel }
									value={ columnDayLabel }
								/>
							</th>
							<th class="starter-opening-hours__column starter-opening-hours__column--open">
								<RichText
									tagName="div"
									className={ 'starter-opening-hours__column-open-label' }
									placeholder={ __( 'Open', 'plugin-name' ) }
									keepPlaceholderOnFocus
									onChange={ onChangeColumnOpenLabel }
									value={ columnOpenLabel }
								/>
							</th>
							<th class="starter-opening-hours__column starter-opening-hours__column--closed">
								<RichText
									tagName="div"
									className={ 'starter-opening-hours__column-closed-label' }
									placeholder={ __( 'Closed', 'plugin-name' ) }
									keepPlaceholderOnFocus
									onChange={ onChangeColumnClosedLabel }
									value={ columnClosedLabel }
								/>
							</th>
						</tr>
					</thead>
					<tbody>
						{/**
						* Innerblocks Row
						*
						* When we render we will just output the inner blocks, but
						* for it to look correct, we need to sit it in a row on the edit 
						* screen.
						*/}
						<tr>
							<td colspan="3">
							{/**
								<InnerBlocks
									template={ [
										[ 'plugin-name/starter-opening-hours-row' ],
									] }
									templateLock={false}
									allowedBlocks={ [
										[ 'plugin-name/starter-opening-hours-row' ],
									] }
								/>
							*/}
							</td>
						</tr>
					</tbody>
				</table>
				{ ( isSelected || additionalInformationTitle || additionalInformation ) && 
				<div class="starter-opening-hours__additional-information">
					{ ( isSelected || additionalInformationTitle ) &&
						<RichText
							tagName="h3"
							className={ 'starter-opening-hours__additional-information-title' }
							placeholder={ __( 'Additional Information Title', 'plugin-name' ) }
							keepPlaceholderOnFocus
							onChange={ onChangeAdditionalInformationTitle }
							value={ additionalInformationTitle }
						/>
					}
					{ ( isSelected || ( additionalInformation && additionalInformation.length > 0 ) ) &&
					<RichText
						tagName="div"
						multiline="p"
						className={ 'starter-opening-hours__additional-information-text' }
						placeholder={ __( 'Additional Information', 'plugin-name' ) }
						keepPlaceholderOnFocus
						onChange={ onChangeAdditionalInformation }
						value={ additionalInformation }
					/>
					}
				</div>
				}
			</section>
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
				additionalInformationTitle,
				columnClosedLabel,
				columnDayLabel,
				columnOpenLabel,
				title,
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
		 * - TBC
		 */
		return (
			<section 
				className={ classnames( className, 'starter-opening-hours' ) } 
			>
				<h2 class="starter-opening-hours__title">
					{ title }
				</h2>

				<table class="starter-opening-hours__table">
					<thead>
						<tr>
							<th>
								{ columnDayLabel }
							</th>
							<th>
								{ columnOpenLabel }
							</th>
							<th>
								{ columnClosedLabel }
							</th>
						</tr>
					</thead>
					<tbody>
						<InnerBlocks.Content/>
					</tbody>
				</table>
				
				<div class="starter-opening-hours__additional-information">
					<h3 class="starter-opening-hours__additional-title">
						{ additionalInformationTitle }
					</h3>
					<div class="starter-opening-hours__additional-text">
						{ additionalInformation }
					</div>
				</div>
			</section>
		);
	},
} );
