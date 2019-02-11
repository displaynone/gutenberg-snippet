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
import '../scss/admin.scss';       // Global admin styles
import '../scss/blockEditor.scss'; // Block editor styles
import '../scss/block.scss';       // Block styles

/**
 * Block Dependencies.
 */

// From Block
import attributes from "./attributes"; // Attribute Registration
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
 * Register secure block
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

	// Create custom style variations for the block.
	styles: [
		{ name: 'image-top', label: __( 'Image Top', 'plugin-name' ), isDefault: true  },
		{ name: 'image-left', label: __( 'Image Left', 'plugin-name' ) },
		{ name: 'image-right', label: __( 'Image Right', 'plugin-name' ) },
	],

	// Import the attributes
	attributes,

	// Edit view
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

		return [
			<Inspector { ...{ setAttributes, ...props, onChangeImageID, onRemoveImageID } }/>,
			<Tools { ...{ setAttributes, ...props, onChangeImageID, onRemoveImageID } }/>,
			<article 
				className={ classnames( className, 'starter-card', 'starter-card--align-' + textAlignment ) } 
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
				{ ! imageURL ? (
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
				) : (
					<Fragment>
					{/**
					   * JSX needs JavaScript to have an outer HTML tag as a wrapper. 
					   * We could use </div>, but <Fragment> is a good way to do this
					   * without outputing an element.
					   * 
					   * Also other than as an example, this one isn't really needed.
					   */}
					
						<div 
							className={ classnames( headerImageClass, 'starter-card__header-background' ) }
							style={ headerStyles }
						>
						</div>
					</Fragment>
				) }
				</header>
				<div class="starter-card__main">
					<RichText
						tagName="h2"
						className={ 'starter-card__title' }
						placeholder={ __( 'Title', 'starter-card' ) }
						keepPlaceholderOnFocus
						onChange={ onChangeTitle }
						value={ title }
					/>
					<RichText
						tagName="div"
						multiline="p"
						className={ 'starter-card__summary' }
						placeholder={ __( 'Summary', 'plugin-name' ) }
						keepPlaceholderOnFocus
						onChange={ onChangeSummary }
						value={ summary }
					/>
					{ ( isSelected || ( linkLabel && linkURL ) ) &&
					<div class="starter-card__cta">
						<RichText
							tagName="a"
							className={ 'button button--primary' }
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
						{ isSelected &&
							<form
								className="block-library-button__inline-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									value={ linkURL }
									onChange={ ( linkURL ) => setAttributes( { linkURL } ) }
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

	// Save view
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

		const headerImageClass = classnames(
			className,
			dimmerRatioToClass( imageTransparency ),
			{
				'has-background-dim' : imageTransparency !== 0,
			}
		);

		let headerStyles = {
			backgroundColor: headerBackgroundColor,
			color: headerForegroundColor,
		};
		if ( imageURL && 'video' !== imageType ) {
			headerStyles.backgroundImage = `url( ${ imageURL } )`;
		}

		return (
			<article 
				className={ classnames( className, 'starter-card', 'starter-card--align-' + textAlignment ) } 
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
				</header>
				<div class="starter-card__main">
				<h2 class="starter-card__title">{ title }</h2>
					<div class="starter-card__summary">
						{ summary }
					</div>
					
					{ ( linkLabel && linkURL ) &&
					<div class="starter-card__cta">
						<a class="button button--primary" href={ linkURL }>{ linkLabel }</a>
					</div>
					}
				</div>
			</article>
		);
	},
} );
