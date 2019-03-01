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

// Shared Comonents
import JSONChecker from '../../components/json-checker/js/index';

// Internal Block Libraries
const { apiFetch }          = wp;
const {
	BaseControl,
	Button,
  	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	CheckboxControl,
}                           = wp.components;
const { 
	InspectorControls, 
	MediaUpload,
	URLInput,
}                           = wp.editor;
const { Component }         = wp.element;
const { __ }                = wp.i18n;

/**
 * Register Component
 */
export default class Inspector extends Component {

render() {

	const {
		attributes: {
			gMapEmbedAddressCompanyName,
			gMapEmbedAddressCountry,
			gMapEmbedAddressLine1,
			gMapEmbedAddressLine2,
			gMapEmbedAddressLocality,
			gMapEmbedAddressPostOfficeBox,
			gMapEmbedAddressRegion,
			gMapEmbedAddressPostCode,
			gMapEmbedAPIKey,
			gMapEmbedDisableUI,
			gMapEmbedInfoWindowContent,
			gMapEmbedInfoWindowImageAlt,
			gMapEmbedInfoWindowImageID,
			gMapEmbedInfoWindowImageURL,
			gMapEmbedInfoWindowLinkText,
			gMapEmbedInfoWindowLinkURL,
			gMapEmbedInfoWindowShowAddress,
			gMapEmbedInfoWindowTitle,
			gMapEmbedMarker,
			gMapEmbedMarkerID,
			gMapEmbedLocation,
			gMapEmbedStyles,
			gMapEmbedType,
			gMapEmbedZoom,
		},
		gMapEmbedAPIKeyOption,
		setAttributes,
		updateOption,
	} = this.props;

	/**
	 * Functions
	 *
	 * Shared functions (such as onChangeImageID and onRemoveImageID)
	 * are registered at the level above and passed down.
	 * 
	 * Functions that are only used in this conponent are defined below.
	 */
	const onChangeGMapEmbedAPIKey = gMapEmbedAPIKey => {
		const option  = 'gMapEmbedAPIKey';
		const promise = apiFetch( 
			{ 
				path: 'company-name/plugin-name/v1/update/option/' + option + '/',
				method: 'POST',
				data: { value: gMapEmbedAPIKey },
			} 
		);
		promise.then( ( value ) => { 
			updateOption( value );
			setAttributes( { gMapEmbedAPIKey: value } );
		} );
	};
	const onChangeGMapEmbedLocation = ( value, key ) => {
		let address = { 
			gMapEmbedAddressLine1: gMapEmbedAddressLine1, 
			gMapEmbedAddressLine2: gMapEmbedAddressLine2, 
			gMapEmbedAddressLocality: gMapEmbedAddressLocality, 
			gMapEmbedAddressRegion: gMapEmbedAddressRegion, 
			gMapEmbedAddressPostCode: gMapEmbedAddressPostCode, 
			gMapEmbedAddressCountry: gMapEmbedAddressCountry,
		};
		if ( key in address ) {
			address[ key ] = value;
		}
		address = Object.values( address ).filter( Boolean ).join( ' ' );
		let location = address.split(' ').join('+');
		if ( address && gMapEmbedAPIKey ) {
			fetch(
				'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + gMapEmbedAPIKey
			)
			.then( function( response ) {
				// Convert the response to JSON.
				return response.json();
			} )
			.then( function( json ) {
				// Convert to JSON and extract the co-ordinates.
				const result = json.results;

				if ( 'undefined' !== typeof result[0] ) {
					let lat = result[0].geometry.location.lat;
					let lng = result[0].geometry.location.lng;
					if ( lat && lng ) {
						setAttributes(
							{
								[key]: value,
								gMapEmbedLocation: address,
								gMapEmbedLat: lat,
								gMapEmbedLong: lng,
							} 
						); 
					}
				} else {
					setAttributes( { key: value } ); 
				}
			});
		}
	};
	const onChangeGMapEmbedStyles             = gMapEmbedStyles => { setAttributes( { gMapEmbedStyles } ) };
	const onChangeGMapEmbedInfoWindowTitle    = gMapEmbedInfoWindowTitle => { setAttributes( { gMapEmbedInfoWindowTitle } ) };
	const onChangeGMapEmbedInfoWindowContent  = gMapEmbedInfoWindowContent => { setAttributes( { gMapEmbedInfoWindowContent} ) };
	const onChangeGMapEmbedZoom               = gMapEmbedZoom => { setAttributes( { gMapEmbedZoom} ) };
	const onChangeGMapEmbedType               = gMapEmbedType => { setAttributes( { gMapEmbedType} ) };
	const onChangeGMapEmbedDisableUI          = gMapEmbedDisableUI => { setAttributes( { gMapEmbedDisableUI} ) };
	const onChangeGMapEmbedMarker             = image => { 
		setAttributes( 
			{
				gMapEmbedMarkerID: image.id,
				gMapEmbedMarker: image.url,
			} 
		);
	};
	const onRemoveGMapEmbedMarker             = () => { 
		setAttributes( 
			{
				gMapEmbedMarkerID: null,
				gMapEmbedMarker: null,
			} 
		);
	};
	const onChangeGMapEmbedInfoWindowImageURL = image => { 
		let imageUrl = image.url;
		if ( image.sizes.thumbnail.url ) {
			imageUrl = image.sizes.thumbnail.url;
		}
		setAttributes( 
			{ 
				gMapEmbedInfoWindowImageAlt: image.alt,
				gMapEmbedInfoWindowImageID: image.id,
				gMapEmbedInfoWindowImageURL: imageUrl,
			} 
		);
	};
	const onRemoveGMapEmbedInfoWindowImageURL = () => { 
		setAttributes( 
			{ 
				gMapEmbedInfoWindowImageAlt: null,
				gMapEmbedInfoWindowImageID: null,
				gMapEmbedInfoWindowImageURL: null,
			} 
		);
	};
	const onChangeGMapEmbedInfoWindowLinkText    = gMapEmbedInfoWindowLinkText => { setAttributes( { gMapEmbedInfoWindowLinkText } ) };
	const onChangeGMapEmbedInfoWindowLinkURL     = gMapEmbedInfoWindowLinkURL => { setAttributes( { gMapEmbedInfoWindowLinkURL } ) };
	const onChangeGMapEmbedInfoWindowShowAddress = gMapEmbedInfoWindowShowAddress => { setAttributes( { gMapEmbedInfoWindowShowAddress } ) };

	return (
			<InspectorControls>
				<PanelBody
					title={ __( 'Map Settings', 'plugin-name' ) }
					className="starter-google-map__map-settings"
					initialOpen={ ! ( gMapEmbedAPIKey && gMapEmbedLocation ) }
				>

					<TextControl
						type="text"
						label={ __('Google Maps API key', 'plugin-name' ) }
						help={ __(
							'This key must be enabled for the Google Maps JavaScript and Geocoding APIs.',
							'plugin-name'
						) }
						defaultValue={ 'string' === typeof gMapEmbedAPIKeyOption ? gMapEmbedAPIKeyOption : '' }
						onChange={ onChangeGMapEmbedAPIKey }
					/>

					<TextControl
						type="text"
						label={ __( 'Address Company Name', 'plugin-name' ) }
						defaultValue={ gMapEmbedAddressCompanyName }
						onChange={ value => onChangeGMapEmbedLocation( value, 'gMapEmbedAddressCompanyName' ) }
					/>

					<TextControl
						type="text"
						label={ __( 'Address Post Office Box', 'plugin-name' ) }
						defaultValue={ gMapEmbedAddressPostOfficeBox }
						onChange={ value => onChangeGMapEmbedLocation( value, 'gMapEmbedAddressPostOfficeBox' ) }
					/>

					<TextControl
						type="text"
						label={ __( 'Address First Line', 'plugin-name' ) }
						defaultValue={ gMapEmbedAddressLine1 }
						onChange={ value => onChangeGMapEmbedLocation( value, 'gMapEmbedAddressLine1' ) }
					/>

					<TextControl
						type="text"
						label={ __( 'Address Second Line', 'plugin-name' ) }
						defaultValue={ gMapEmbedAddressLine2 }
						onChange={ value => onChangeGMapEmbedLocation( value, 'gMapEmbedAddressLine2' ) }
					/>

					<TextControl
						type="text"
						label={ __( 'Address City / Town', 'plugin-name' ) }
						defaultValue={ gMapEmbedAddressLocality }
						onChange={ value => onChangeGMapEmbedLocation( value, 'gMapEmbedAddressLocality' ) }
					/>

					<TextControl
						type="text"
						label={ __( 'Address Region', 'plugin-name' ) }
						defaultValue={ gMapEmbedAddressRegion }
						onChange={ value => onChangeGMapEmbedLocation( value, 'gMapEmbedAddressRegion' ) }
					/>

					<TextControl
						type="text"
						label={ __( 'Address Post Code', 'plugin-name' ) }
						defaultValue={ gMapEmbedAddressPostCode }
						onChange={ value => onChangeGMapEmbedLocation( value, 'gMapEmbedAddressPostCode' ) }
					/>

					<TextControl
						type="text"
						label={ __( 'Address Country', 'plugin-name' ) }
						defaultValue={ gMapEmbedAddressCountry }
						onChange={ value => onChangeGMapEmbedLocation( value, 'gMapEmbedAddressCountry' ) }
					/>

				</PanelBody>
				<PanelBody
					title={ __( 'Info Window', 'plugin-name' ) }
					className="starter-google-map__info-window"
					initialOpen={ false }
				>
	
					<TextControl
						type="text"
						label={ __( 'Info Window Title', 'plugin-name' ) }
						help={ __(
							'This title will appear at the top of the Info Window that appears when a user clicks on the map marker.',
							'plugin-name'
						) }
						defaultValue={ gMapEmbedInfoWindowTitle }
						onChange={ onChangeGMapEmbedInfoWindowTitle }
					/>

					<TextareaControl
						type="text"
						label={ __( 'Info Window Content', 'starter-google-map' ) }
						help={ __(
							'This text will appear in the Info Window that appears when a user clicks on the map marker.',
							'plugin-name'
						) }
						defaultValue={ gMapEmbedInfoWindowContent }
						onChange={ onChangeGMapEmbedInfoWindowContent }
					/>

					<TextControl
						type="text"
						label={ __( 'Info Window Link Text', 'starter-google-map' ) }
						help={ __(
							'The text of the Info Window Link.',
							'plugin-name'
						) }
						defaultValue={ gMapEmbedInfoWindowLinkText }
						onChange={ onChangeGMapEmbedInfoWindowLinkText }
					/>

					<BaseControl
						label={ __( 'Info Window Link URL', 'starter-google-map' ) }
						help={ __(
							'The URL of the Info Window Link.',
							'plugin-name'
						) }
					>
						<URLInput
							
							value={ gMapEmbedInfoWindowLinkURL }
							onChange={ onChangeGMapEmbedInfoWindowLinkURL }
						/>
					</BaseControl>
		
					<BaseControl
						label={ __( 'Info Window Image', 'plugin-name' ) }
					>
						<MediaUpload
							onSelect={ onChangeGMapEmbedInfoWindowImageURL }
							allowedTypes={ [ 'image' ] }
							type="image"
							value={ gMapEmbedInfoWindowImageID }
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

						{ gMapEmbedInfoWindowImageID && (
							<Button
								label={ __( 'Remove Image', 'plugin-name' ) }
								isLink
								isDestructive
								onClick={ onRemoveGMapEmbedInfoWindowImageURL }
							>
								{ __( 'Remove Image', 'plugin-name' ) }
							</Button>
						) }
					</BaseControl>

					<CheckboxControl
						type="checkbox"
						label={ __( 'Show Address in Info Window', 'plugin-name' ) }
						help={ __(
							'If checked, the address will show in the info window.',
							'plugin-name'
						) }
						checked={ gMapEmbedInfoWindowShowAddress }
						onChange={ onChangeGMapEmbedInfoWindowShowAddress }
					/>

					
				
				</PanelBody>
				<PanelBody
					title={ __( 'Display Options', 'plugin-name' ) }
					className="starter-google-map__display-options"
					initialOpen={ false }
				>

					<TextControl
						type="number"
						min="0"
						max="20"
						label={ __( 'Zoom Level', 'plugin-name' ) }
						help={ __(
							'Set the zoom level for the map; can be between 0 (extreme zoom-out) and 20 (extreme zoom-in). Defaults to 14.',
							'plugin-name'
						) }
						defaultValue={
							gMapEmbedZoom
								? gMapEmbedZoom
								: 14
						}
						onChange={ onChangeGMapEmbedZoom }
					/>
	
					<SelectControl
						label={ __( 'Map Type', 'plugin-name' ) }
						help={ __(
							'Switch between the four different map representations, each with different visuals and data.',
							'plugin-name'
						) }
						defaultValue={
							gMapEmbedType
								? gMapEmbedType
								: 'roadmap'
						}
						options={ [
							{ label: __( 'Roadmap (default)', 'plugin-name' ), value: 'roadmap' },
							{ label: __('Satellite', 'plugin-name'), value: 'satellite' },
							{ label: __('Hybrid', 'plugin-name'), value: 'hybrid' },
							{ label: __('Terrain', 'plugin-name'), value: 'terrain' },
						] }
						onChange={ onChangeGMapEmbedType }
					/>

					<CheckboxControl
						type="checkbox"
						label={ __( 'Hide Controls', 'plugin-name' ) }
						help={ __(
							'Hides the default map controls to present the map without distraction.',
							'plugin-name'
						) }
						checked={ gMapEmbedDisableUI }
						onChange={ onChangeGMapEmbedDisableUI }
					/>

					<TextareaControl
						label={ __( 'Custom Styles', 'plugin-name' ) }
						help={ __(
							'Must be valid JSON within an array.',
							'plugin-name'
						) }
						onChange={ onChangeGMapEmbedStyles }
						value={ gMapEmbedStyles }
					/>
					{ gMapEmbedStyles &&
						<BaseControl>
							<JSONChecker { ...{ json: gMapEmbedStyles } } />
						</BaseControl>
					}
					
					<BaseControl
						label={ __( 'Choose a Custom Marker Image', 'plugin-name' ) }
					>
						<MediaUpload
							onSelect={ onChangeGMapEmbedMarker }
							allowedTypes={ [ 'image' ] }
							type="image"
							value={ gMapEmbedMarkerID }
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

						{ gMapEmbedMarkerID && (
							<Button
								label={ __( 'Remove Image', 'plugin-name' ) }
								isLink
								isDestructive
								onClick={ onRemoveGMapEmbedMarker }
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