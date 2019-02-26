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
const { apiFetch }          = wp;
const {
  	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	CheckboxControl,
}                           = wp.components;
const { InspectorControls } = wp.editor;
const { Component }         = wp.element;
const { __ }                = wp.i18n;

/**
 * Register Component
 */
export default class Inspector extends Component {

render() {

	const {
		attributes: {
			gMapEmbedAPIKey,
			gMapEmbedLat,
			gMapEmbedLong,
			gMapEmbedLocation,
			gMapEmbedInfoWindowTitle,
			gMapEmbedInfoWindowContent,
			gMapEmbedType,
			gMapEmbedZoom,
			gMapEmbedDisableUI,
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

	const onChangeGMapEmbedLocation = gMapEmbedLocation => {
		let location = gMapEmbedLocation.replace( ' ', '+' );
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
							gMapEmbedLocation,
							gMapEmbedLat: lat,
							gMapEmbedLong: lng,
						} 
					); 
				}
			}
		});
	};

	const onChangeGMapEmbedInfoWindowTitle   = gMapEmbedInfoWindowTitle => { setAttributes( { gMapEmbedInfoWindowTitle} ) };
	const onChangeGMapEmbedInfoWindowContent = gMapEmbedInfoWindowContent => { setAttributes( { gMapEmbedInfoWindowContent} ) };
	const onChangeGMapEmbedZoom              = gMapEmbedZoom => { setAttributes( { gMapEmbedZoom} ) };
	const onChangeGMapEmbedType              = gMapEmbedType => { setAttributes( { gMapEmbedType} ) };
	const onChangeGMapEmbedDisableUI         = gMapEmbedDisableUI => { setAttributes( { gMapEmbedDisableUI} ) };

	return (
			<InspectorControls>
				<PanelBody
					title={ __( 'Map Settings', 'plugin-name' ) }
					className="starter-google-map__map-settings"
					initialOpen={ true }
				>

					<TextControl
						type="text"
						label={ __('Google Maps API key', 'plugin-name' ) }
						help={ __(
							'This key must be enabled for the Google Maps JavaScript and Geocoding APIs.',
							'plugin-name'
						) }
						defaultValue={ gMapEmbedAPIKeyOption }
						onChange={ onChangeGMapEmbedAPIKey }
					/>

					<TextControl
						type="text"
						label={ __( 'Postal Address', 'plugin-name' ) }
						help={ __(
							'Enter the full postal address of the location you wish to display. This will also appear in the Info Window which appears when a user clicks on the map marker.',
							'plugin-name'
						) }
						defaultValue={ gMapEmbedLocation }
						onChange={ onChangeGMapEmbedLocation }
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
	
				</PanelBody>
			</InspectorControls>
		)
	}
}