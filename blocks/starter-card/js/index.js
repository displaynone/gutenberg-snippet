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
import attributes from './attributes'; // Attribute Registration
import Inspector from './inspector';   // InspectorControls (Sidebar)
import Tools from './tools';           // BlockControls (Toolbar)

// From Common
import dimmerRatioToClass from '../../../assets/src/js/common/dimmerRatioToClass';

// Imported from WordPress
import classnames from 'classnames'; // Enables us to concat classnames

// Internal Block Libraries
const { registerBlockType } = wp.blocks;
const { 
	Dashicon,
	IconButton,
}                           = wp.components;
const { 
	MediaPlaceholder,
	RichText,
	URLInput,
}                           = wp.editor;
const { Fragment }          = wp.element;
const { __ }                = wp.i18n; // Localization

/**
 * Register Block
 */
export default registerBlockType( 'plugin-name/starter-card', {

	// Set the title.
	title: __( 'Starter Card', 'plugin-name' ),

	// Set the description.
	description: __( 'A starter block that provides useful boilerplating for card style blocks.', 'plugin-name' ),
	
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
		src: 'welcome-write-blog' // WordPress Dashicon reference (we can pass an svg for custom icon)
	},
	keywords:[
		__( 'Starter' ),
		__( 'Card' ),
		__( 'Card Starter' ),
	],

	// Enable the align left / right / center controls in the toolbar.
	supports: {
		align: true,
	},

	/**
	 * Styles
	 * 
	 * Create custom style variations for the block. These are passed as automatically 
	 * generated classes, which you can use to style the block. You can then access these
	 * via the block 'Change Block Type' control.
	 */
	styles: [
		{ name: 'image-top', label: __( 'Image Top', 'plugin-name' ), isDefault: true  },
		{ name: 'image-left', label: __( 'Image Left', 'plugin-name' ) },
		{ name: 'image-right', label: __( 'Image Right', 'plugin-name' ) },
	],

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
				headerBackgroundColor,
				headerForegroundColor,
				imageTransparency,
				imageAlt,
				imageID,
				imageType,
				imageURL,
				linkLabel,
				linkURL,
				summary,
				title,
				textAlignment,
			},
			className, 
			setAttributes, 
			isSelected,
		} = props;

		/**
		 * Dim Ratio.
		 * 
		 * Calculates the image opacity, and adds it into the 'headerImageClass' variable.
		 */
		const headerImageClass = classnames(
			dimmerRatioToClass( imageTransparency ),
			{ 'has-background-dim' : imageTransparency !== 0 }
		);

		/**
		 * Global Functions.
		 * 
		 * These are passed into compoenends, so we difine them here, so the same function is
		 * used throughout.
		 */
		const onChangeImageID = image => {
			setAttributes( {
				imageID: image.id,
				imageURL: image.url,
				imageAlt: image.alt,
				imageType: image.media_type ? image.media_type : 'image',
			} );
		};
		const onRemoveImageID = () => {
			setAttributes({
				imageID: null,
				imageURL: null,
				imageAlt: null,
				imageType: null,
			});
		}

		/**
		 * Functions.
		 * 
		 * Functions for this Component.
		 */
		const onChangeLinkLabel = linkLabel => { setAttributes( { linkLabel } ) };
		const onChangeLinkURL   = linkURL => { setAttributes( { linkURL } ) };
		const onChangeSummary   = summary => { setAttributes( { summary } ) };
		const onChangeTitle     = title => { setAttributes( { title } ) };

		/**
		 * Header Styles.
		 * 
		 * Set it here, so we don't cause an error with an empty image if one is not set.
		 */
		let headerStyles = {
			backgroundColor: headerBackgroundColor,
			color: headerForegroundColor,
		};

		if ( imageURL && 'video' !== imageType ) {
			headerStyles.backgroundImage = `url( ${ imageURL } )`;
		}

		/**
		 * Return 
		 * 
		 * Here is where we return our JSX. Note that we are returning an array.
		 * We are passing in:
		 * 
		 * - InspectorControls
		 * - BlockControls
		 * - Edit View
		 * 
		 * Note how we pass props to our custom components.
		 */
		return [
			<Inspector { ...{ setAttributes, ...props, onChangeImageID, onRemoveImageID } }/>,
			<Tools { ...{ setAttributes, ...props, onChangeImageID, onRemoveImageID } }/>,
			<article 
				className={ classnames( className, 'starter-card', 'starter-card--align-' + textAlignment, 'h-entry', 'hentry' ) } 
				textAlign={ textAlignment }
				role="article"
			>
				<header 
					class="starter-card__header"
					style={ {
						backgroundColor: headerBackgroundColor,
						color: headerForegroundColor,
					} }
				>
				{/**
				  * OR and AND
				  * 
				  * JSX only allows us to use turnary operators. Put simply:
				  * 
				  * OR: { condition ? ( <div></div> ) : ( <div></div> ) }
				  * 
				  * Sometimes you don't want the else part of the or (:) in which
				  * case you can write:
				  * 
				  * { condition && <div></div> }
				  * 
				  * Which will only display the JSX if the condition is met!
				  */}
				{ ! imageURL ? (
					<Fragment>
					{/**
					   * Fragment
					   * 
					   * JSX needs JavaScript to have an outer HTML tag as a wrapper. 
					   * We could use </div>, but <Fragment> is a good way to do this
					   * without outputing an element.
					   * 
					   * This one is needed to allow these comments!
					   */}
					{/**
					   * MediaPlaceholder
					   * 
					   * If we are placing content over the header, we cannot use this,
					   * as the z-index gets pushed back (see the Header Title section).
					   * 
					   * But if we have noting blocking it, this is our preferred way to
					   * set an image in a block.
					   */}
					<MediaPlaceholder
						icon={ 'format-image' }
						className={ className }
						labels={ {
							title: 'Upload Image',
							instructions: __( 'Upload an image for the header', 'plugin-name' ),
						} }
						onSelect={ onChangeImageID }
						accept="image/*"
					/>
					</Fragment>
				) : (
					<div 
						className={ classnames( headerImageClass, 'starter-card__header-background' ) }
						style={ headerStyles }
					>
					</div>
				) }
				{/**
					* Header Title
					*
					* If we want to have the title in the header, we can do so with
					* this code. Note however that the media picker will not work, so 
					* one of the alternatives can be used.
					* 
					* <div class="starter-card__header-inner">
					* 	<RichText
					*		tagName="h2"
					*		className={ 'starter-card__title p-name entry-title' }
					*		placeholder={ __( 'Title', 'plugin-name' ) }
					*		keepPlaceholderOnFocus
					*		onChange={ onChangeTitle }
					*		style={ { color: headerForegroundColor } }
					*		value={ title }
					* 	/>
					* </div>
					*/}
				</header>
				<div class="starter-card__main">
					{/**
					   * RichText
					   * 
					   * If you are using multiline, as per summary, make sure
					   * that your attribute is set to an array, and you also
					   * have a corosponding area in the save view.
					   * 
					   * Rather than being saved into an attribute, the content is
					   * saved directly to the HTML of the block.
					   */}
					<RichText
						tagName="h2"
						className={ 'starter-card__title p-name entry-title' }
						placeholder={ __( 'Title', 'plugin-name' ) }
						keepPlaceholderOnFocus
						onChange={ onChangeTitle }
						value={ title }
					/>
					<RichText
						tagName="div"
						multiline="p"
						className={ 'starter-card__summary p-summary entry-summary' }
						placeholder={ __( 'Summary', 'plugin-name' ) }
						keepPlaceholderOnFocus
						onChange={ onChangeSummary }
						value={ summary }
					/>
					{ ( isSelected || ( linkLabel && linkURL ) ) &&
					<div class="starter-card__cta">
						{/**
					      * Button
					      * 
						  * A link formatted as a button. Note that we are passing
						  * formattingControls={ [] } into our RichText control.
						  * 
						  * We don't want people to apply HTML formatting to the button.
					      */}
						<RichText
							tagName="a"
							className={ 'button button--primary u-url' }
							placeholder={ __( 'Button Text', 'plugin-name' ) }
							keepPlaceholderOnFocus
							style={ { 
								color: headerForegroundColor,
								backgroundColor: headerBackgroundColor,
							} }
							onChange={ onChangeLinkLabel }
							value={ linkLabel }
							formattingControls={ [] }
						/>
						{/**
					     * Link Picker 
					     * 
						 * We find it best to use the same elements that are native in 
						 * the WordPress core controls. Here is how the Link Picker is
						 * Setup in the button control.
					     */}
						{ isSelected &&
							<form
								className="block-library-button__inline-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									value={ linkURL }
									onChange={ onChangeLinkURL }
								/>
								<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
							</form>
						}
					</div>
					}
				</div>
			</article>
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
				headerBackgroundColor,
				headerForegroundColor,
				imageTransparency,
				imageType,
				imageURL,
				linkLabel,
				linkURL,
				summary,
				title,
				textAlignment,
			},
			className, 
		} = props;

		/**
		 * Variables
		 * 
		 * We will need to recreate some of the more dynamic variables, such 
		 * as inline styles, so these are rendered correctly on the front end.
		 * 
		 * There should be no functions or setting of attributes here though. 
		 * (We will leave front end React for another day).
		 */

		/**
		 * Dim Ratio.
		 * 
		 * Calculates the image opacity, and adds it into the 'headerImageClass' variable.
		 */
		const headerImageClass = classnames(
			className,
			dimmerRatioToClass( imageTransparency ),
			{
				'has-background-dim' : imageTransparency !== 0,
			}
		);

		/**
		 * Header Styles.
		 * 
		 * Set it here, so we don't cause an error with an empty image if one is not set.
		 */
		let headerStyles = {
			backgroundColor: headerBackgroundColor,
			color: headerForegroundColor,
		};
		if ( imageURL && 'video' !== imageType ) {
			headerStyles.backgroundImage = `url( ${ imageURL } )`;
		}

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
		 * - h-entry: http://microformats.org/wiki/h-entry
		 * - hentry: http://microformats.org/wiki/hentry
		 * 
		 * As this is an article, in theory we could use https://schema.org/Article
		 * but that is more appropriate for a full page article, not a component.
		 */
		return (
			<article 
				className={ classnames( className, 'starter-card', 'starter-card--align-' + textAlignment, 'h-entry', 'hentry' ) } 
				textAlign={ textAlignment }
				role="article"
			>
				<header 
					class="starter-card__header"
					style={ {
						backgroundColor: headerBackgroundColor,
						color: headerForegroundColor,
					} }
				>
				{ imageURL &&
					<div 
						className={ classnames( headerImageClass, 'starter-card__header-background' ) }
						style={ headerStyles }
					>
					</div>
				}
				{/**
					* Header Title
					*
					* If we want to have the title in the header, we can do so with
					* this code. Note however that the media picker will not work, so 
					* one of the alternatives can be used.
					* 
					* <div class="starter-card__header-inner">
					*	<h2 
					*		class="starter-card__title p-name entry-title"
					*		style={ {
					*			color: headerForegroundColor,
					*		} }
					*	>
					*	{ title }
					*	</h2>
					* </div>
					*/}
				</header>
				<div class="starter-card__main">
					<h2 class="starter-card__title p-name entry-title">{ title }</h2>
					<div class="starter-card__summary p-summary entry-summary">
						{ summary }
					</div>
					{ ( linkLabel && linkURL ) &&
					<div class="starter-card__cta">
						<a class="button button--primary u-url" href={ linkURL }>{ linkLabel }</a>
					</div>
					}
				</div>
			</article>
		);
	},
} );
