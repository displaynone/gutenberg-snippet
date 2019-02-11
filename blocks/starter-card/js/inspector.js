/**
 * Inspector
 * 
 * The Inspector Controls for the Block.
 */

/**
 * Internal Block Libraries
 */
const {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
} = wp.components;
const { 
	ContrastChecker,
	InspectorControls,
	MediaUpload,
	PanelColorSettings,
} = wp.editor;
const { Component }         = wp.element;
const { __ }                = wp.i18n;

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

	const onChangeHeaderBackgroundColor = headerBackgroundColor => { setAttributes( { headerBackgroundColor } ) };
	const onChangeHeaderForegroundColor = headerForegroundColor => { setAttributes( { headerForegroundColor } ) };
	const onChangeImageTransparency     = imageTransparency => { setAttributes( { imageTransparency } ) };

	return (
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Header Color Settings', 'plugin-name' ) }
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
						<ContrastChecker
						{ ...{
							isLargeText: true,
							textColor: headerForegroundColor,
							backgroundColor: headerBackgroundColor
						} }
						/>
						<RangeControl
							label={ __( 'Image Transparency', 'plugin-name' ) }
							help={ __( 'Applies when text is over image.', 'plugin-name' ) }
							value={ imageTransparency }
							onChange={ onChangeImageTransparency }
							min={ 0 }
							max={ 100 }
							step={ 10 }
						/>
				</PanelColorSettings>
				<PanelBody 
					title={ __( 'Header Image', 'plugin-name' ) } 
					className={ 'starter-card__image-select' }
					initialOpen={ false }
				>
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