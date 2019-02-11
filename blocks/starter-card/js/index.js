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
import '../scss/admin.scss';
import '../scss/blockEditor.scss';
import '../scss/block.scss';

/**
 * Block Dependencies.
 */

// Imported from WordPress
import classnames from 'classnames';

// From Block
import attributes from "./attributes";
import Tools from './tools';
import Inspector from './inspector';

// From Common
import dimRatioToClass from '../../../assets/src/js/common/dimRatio';

/**
 * Internal Block Libraries
 */
const { registerBlockType } = wp.blocks;
const { 
	Icon,
	Spinner,
}                           = wp.components;
const { 
	MediaPlaceholder,
	RichText,
	URLInput,
}                           = wp.editor;
const { Fragment }          = wp.element;
const { __ }                = wp.i18n;

/**
 * Register secure block
 */
export default registerBlockType( 'plugin-name/starter-card', {
	title:       __( 'Card Starter', 'plugin-name' ),
	description: __( 'A starter block that provides useful boilerplating for card style blocks.', 'plugin-name' ),
	category:   'starter-blocks',
	icon: {
		background: '#2cc795',    // Icon custom background colour
		foreground: '#fff',       // Icon custom forground colour
		src: 'welcome-write-blog' // WordPress Dashicon reference
	},
	keywords:   [
		__( 'Starter' ),
		__( 'Card' ),
		__( 'Card Starter' ),
	],
	supports: {
		align: true,
	},
	styles: [
		{ name: 'image-top', label: __( 'Image Top', 'plugin-name' ), isDefault: true  },
		{ name: 'image-left', label: __( 'Image Left', 'plugin-name' ) },
		{ name: 'image-right', label: __( 'Image Right', 'plugin-name' ) },
	],
	attributes,
	edit: props => {

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
			setAttributes, 
			isSelected,
			posts,
		} = props;

		/**
		 * Dim Ratio.
		 * 
		 * Calculates the image opacity, and adds it into the 'classes' variable.
		 */
		const classes = classnames(
			dimRatioToClass( imageTransparency ),
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

		/** 
		 * Return Loading Screen.
		 * 
		 * If posts are empty, there is an error, so load a loading screen until the
		 * promise is complete.
		 */
		if ( posts && ! posts.length ) {
			return (
				<p className={ className } >
					<Spinner />
					{ __( 'Loading Data', 'plugin-name' ) }
				</p>
			);
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
					   */}
					
						<div 
							className={ classnames( classes, 'starter-card__header-background' ) }
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
						style={ { color: headerForegroundColor } }
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
							<div class="starter-card__link-picker">
								<Icon
									icon="admin-links"
									label="Link URL"
								/>
								<URLInput
									value={ linkURL }
									onChange={ ( linkURL, post ) => setAttributes( { linkURL, linkLabel: (post && post.title) || '' } ) }
								/>
							</div>
						}
					</div>
					}
				</div>
			</article>
		];
	},
	save: props => {

		const {
			attributes: {
				imageTransparency,
				summary,
			},
			className, 
		} = props;

		const classes = classnames(
			className,
			dimRatioToClass( imageTransparency ),
			{
				'has-background-dim' : imageTransparency !== 0,
			}
		);

		return (
			<article className={ classnames( classes, 'starter-card' ) }  role="article">
			<div class="starter-card__summary">
				{ summary }
			</div>
			</article>
		);
	},
} );
