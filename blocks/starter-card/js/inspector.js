/**
 * Inspector
 * 
 * The Inspector Controls for the Block.
 * 
 * We break it into its own file, so the edit function just shows
 * our block edit view, and any sidebar functions are defined here.
 */

/**
 * Block Dependencies.
 */

// Internal Block Libraries
const {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
}                        = wp.components;
const { 
	ContrastChecker,
	InspectorControls,
	MediaUpload,
	PanelColorSettings,
}                        = wp.editor;
const { Component }      = wp.element;
const { __ }             = wp.i18n;

/**
 * Register Component
 */
export default class Inspector extends Component {

render() {

	const {
		attributes: {
			headerBackgroundColor,
			headerForegroundColor,
			imageTransparency,
			imageID,
			imageURL,
		},
		setAttributes,
		onChangeImageID, 
		onRemoveImageID,
	} = this.props;

	/**
	 * Functions
	 *
	 * Shared functions (such as onChangeImageID and onRemoveImageID)
	 * are registered at the level above and passed down.
	 * 
	 * Functions that are only used in this conponent are defined below.
	 */
	const onChangeHeaderBackgroundColor = headerBackgroundColor => { setAttributes( { headerBackgroundColor } ) };
	const onChangeHeaderForegroundColor = headerForegroundColor => { setAttributes( { headerForegroundColor } ) };
	const onChangeImageTransparency     = imageTransparency => { setAttributes( { imageTransparency } ) };

	return (
			<InspectorControls>
				{/**
                  * Panel Color Settings
                  *
                  * Allows us to change the block forground and background colors
				  * for certain elements within the block.
                  */}
				<PanelColorSettings
					title={ __( 'Block Color Settings', 'plugin-name' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: headerBackgroundColor,
							onChange: onChangeHeaderBackgroundColor,
							label: __( 'Background Colour', 'plugin-name' )
						},
						{
							value: headerForegroundColor,
							onChange: onChangeHeaderForegroundColor,
							label: __( 'Text Colour', 'plugin-name' )
						}
					] }>
						{/**
                          * Contrast Checker
                          *
                          * Alerts us if the contrast between the colours is
						  * not enough, causing accessibility issues.
                          */}
						<ContrastChecker
						{ ...{
							isLargeText: false,
							textColor: headerForegroundColor,
							backgroundColor: headerBackgroundColor
						} }
						/>
						{/**
                          * Range Control
                          *
                          * Allows us to change the transparency of the header image.
						  * Usful control when the image has a text overlay.
                          */}
						<RangeControl
							label={ __( 'Image Transparency', 'plugin-name' ) }
							value={ imageTransparency }
							onChange={ onChangeImageTransparency }
							min={ 0 }
							max={ 100 }
							step={ 10 }
						/>
				</PanelColorSettings>
				{/**
				  * Header Image
				  *
				  * Allows us to change the header image.
				  */}
				<PanelBody 
					title={ __( 'Header Image', 'plugin-name' ) } 
					className={ 'starter-card__image-select' }
					initialOpen={ false }
				>
					{/**
				      * Based Control
				      *
				      * Wrapper to allow us to apply core formatting to custom
					  * components (or those that do not support base attributes).
				      */}
					<BaseControl
					label={ __( 'Choose a Header Image', 'plugin-name' ) }
					>
						<MediaUpload
							onSelect={ onChangeImageID }
							allowedTypes={ [ 'image' ] }
							type="image"
							value={ imageID }
							render={ ( { open } ) => (
									<Button
									label={ __( 'Choose Image', 'plugin-name' ) }
									isDefault
									isLarge
									onClick={ open }
									>
										{ __( 'Choose Image', 'plugin-name' ) }
									</Button>
								) }
							>
						</MediaUpload>

						{ imageURL && (
							<Button
								label={ __( 'Remove Image', 'plugin-name' ) }
								isLink
								isDestructive
								onClick={ onRemoveImageID }
							>
								{ __( 'Remove Image', 'plugin-name' ) }
							</Button>
						) }

					</BaseControl>
				</PanelBody>
			</InspectorControls>
		)
	}
}