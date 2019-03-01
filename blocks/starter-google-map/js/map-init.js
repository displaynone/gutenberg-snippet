/**
 * initMap
 *
 * Fetches the lat and long of the supplied location, before initialising
 * the required Google Maps object.
 *
 * API Key for development purposes: AIzaSyB7_KuQcbep3FZD5FvWQ6B2D8NGYIJb7A0
 *
 * @see https://developers.google.com/maps/documentation/javascript/tutorial
 */

function initMap( attributes ) {

	const {
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
		gMapEmbedID,
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
		gMapEmbedLat,
		gMapEmbedLocation,
		gMapEmbedLong,
		gMapEmbedStyles,
		gMapEmbedType,
		gMapEmbedZoom,
	} = attributes;

	// Abort if we have no location or API key.
	if ( ! gMapEmbedLocation || ! gMapEmbedAPIKey ) {
		return;
	}

	// Define the DOM element we're creating the Map with.
	const mapEl = document.getElementById( gMapEmbedID );

	if ( ! mapEl ) {
		return;
	}

	// Initialise the Google Map. (fires below)
	const init = function( lat, lng ) {
		
		// Create our location aspect a.k.a "center".
		const loc = { lat: parseFloat( lat ), lng: parseFloat( lng ) };

		let styles = '';
		let styledMapType = '';
		try {
			styles = JSON.parse( gMapEmbedStyles );
			styledMapType = new google.maps.StyledMapType( styles, {
				name: 'Styled'
			} );
		} catch( error ) {
			styles = '';
		}

		// Build our options object, handling default values.
		const options = {
			center: loc,
			zoom: gMapEmbedZoom ? parseInt( gMapEmbedZoom ) : 14,
			mapTypeId: gMapEmbedType ? gMapEmbedType : 'roadmap',
			disableDefaultUI: true === gMapEmbedDisableUI || 'true' === gMapEmbedDisableUI,
			scrollwheel: false // Prevents zoom when scrolling.
		};

		if ( styles ) {
			options.mapTypeControlOptions = {
			mapTypeIds: [ 'Styled' ]
			};
			options.mapTypeId = 'Styled';
		}

		// Create the Map.
		const map = new google.maps.Map( mapEl, options );

		if ( styles ) {
			map.mapTypes.set( 'Styled', styledMapType );
		}

		const markerOptions = {
			position: loc,
			map: map,
			title: gMapEmbedInfoWindowTitle
		};

		if ( gMapEmbedMarker ) {
			markerOptions.icon = gMapEmbedMarker;
		}

		// Create the Marker.
		const marker = new google.maps.Marker( markerOptions );

		// Prepare our Info Window content.
		var content = '<div class="info-window ' + ( gMapEmbedInfoWindowImageURL ? 'has-image' : '' ) + ' h-card hcard">';

		if ( gMapEmbedInfoWindowImageURL ) {
			content += '<img class="info-window__image u-photo photo" src="' + gMapEmbedInfoWindowImageURL + '" alt="' + gMapEmbedInfoWindowImageAlt + '"/>';
		}
		
		content += '<div class="info-window__content">';
		
		if ( gMapEmbedInfoWindowTitle ) {
			content += '<h3 class="info-window__title">' + gMapEmbedInfoWindowTitle + '</h3>';
		}
		
		if ( gMapEmbedInfoWindowContent ) {
			content += '<p>' + gMapEmbedInfoWindowContent + '</p>';
		}

		if ( true === gMapEmbedInfoWindowShowAddress || 'true' === gMapEmbedInfoWindowShowAddress ) {
			content += '<address class="info-window__address h-adr adr">';
			if ( gMapEmbedAddressCompanyName ) {
				content += '<span class="p-org org">' + gMapEmbedAddressCompanyName + '</span>';
			}
			if ( gMapEmbedAddressPostOfficeBox ) {
				content += '<span class="p-post-office-box post-office-box">' + gMapEmbedAddressPostOfficeBox + '</span>';
			}
			if ( gMapEmbedAddressLine1 ) {
				content += '<span class="p-street-address street-address">' + gMapEmbedAddressLine1 + '</span>';
			}
			if ( gMapEmbedAddressLine2 ) {
				content += '<span class="p-extended-address extended-address">' + gMapEmbedAddressLine2 + '</span>';
			}
			if ( gMapEmbedAddressLocality ) {
				content += '<span class="p-locality locality">' + gMapEmbedAddressLocality + '</span>';
			}
			if ( gMapEmbedAddressRegion ) {
				content += '<span class="p-region region">' + gMapEmbedAddressRegion + '</span>';
			}
			if ( gMapEmbedAddressPostCode ) {
				content += '<span class="p-postal-code postal-code">' + gMapEmbedAddressPostCode + '</span>';
			}
			if ( gMapEmbedAddressCountry ) {
				content += '<span class="p-country-name country-name">' + gMapEmbedAddressCountry + '</span>';
			}
			content += '<span class="p-geo geo">';
			content += '<data class="p-latitude latitude" value={ gMapEmbedLat } />';
			content += '<data class="p-longitude longitude" value={ gMapEmbedLong } />';
			content += '</span>';

			content += '</address>';
		}
		
		if ( gMapEmbedInfoWindowLinkText && gMapEmbedInfoWindowLinkURL ) {
			content += '<p><a class="u-url url" href="' + gMapEmbedInfoWindowLinkURL + '">';
			content += gMapEmbedInfoWindowLinkText;
			content += '</a></p>';
		}
		
		content += '</div>';
		content += '</div>';


		if ( gMapEmbedInfoWindowTitle || gMapEmbedInfoWindowContent || true === gMapEmbedInfoWindowShowAddress || 'true' === gMapEmbedInfoWindowShowAddress  ) {
            
			// Create the Info Window.
			const infowindow = new google.maps.InfoWindow({
				content: content,
			});

			// Trigger the Info Window on Marker click.
			marker.addListener( 'click', function() {
				infowindow.open( map, marker );
			});
		}
	};

	// Initialise the Map.
	if ( gMapEmbedLat && gMapEmbedLong ) {
		init( gMapEmbedLat, gMapEmbedLong );
	}
};

export default initMap;
