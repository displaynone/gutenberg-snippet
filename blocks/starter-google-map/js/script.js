/**
 * Block Front-end Scripts.
 */

// Import dependencies.
import initMap from './map-init';

window.initGoogleMapEmbed = function() {
	// Get the block container element.
	const mapEmbedEls = document.querySelectorAll( 
		'.starter-google-map'
	);
	
	Array.prototype.map.call( mapEmbedEls, mapEmbedEl => {
		// Harvest the attribute data that we need to pass to initMap.
		const attributes = [];
		attributes['gMapEmbedAddressCompanyName']    = mapEmbedEl.querySelector( 'input[name=gMapEmbedAddressCompanyName]' ).value;
		attributes['gMapEmbedAddressCountry']        = mapEmbedEl.querySelector( 'input[name=gMapEmbedAddressCountry]' ).value;
		attributes['gMapEmbedAddressLine1']          = mapEmbedEl.querySelector( 'input[name=gMapEmbedAddressLine1]' ).value;
		attributes['gMapEmbedAddressLine2']          = mapEmbedEl.querySelector( 'input[name=gMapEmbedAddressLine2]' ).value;
		attributes['gMapEmbedAddressLocality']       = mapEmbedEl.querySelector( 'input[name=gMapEmbedAddressLocality]' ).value;
		attributes['gMapEmbedAddressPostOfficeBox']  = mapEmbedEl.querySelector( 'input[name=gMapEmbedAddressPostOfficeBox]' ).value;
		attributes['gMapEmbedAddressRegion']         = mapEmbedEl.querySelector( 'input[name=gMapEmbedAddressRegion]' ).value;
		attributes['gMapEmbedAddressPostCode']       = mapEmbedEl.querySelector( 'input[name=gMapEmbedAddressPostCode]' ).value;
		attributes['gMapEmbedInfoWindowImageAlt']    = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowImageAlt]' ).value;
		attributes['gMapEmbedInfoWindowImageID']     = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowImageID]' ).value;
		attributes['gMapEmbedInfoWindowImageURL']    = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowImageURL]' ).value;
		attributes['gMapEmbedInfoWindowLinkText']    = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowLinkText]' ).value;
		attributes['gMapEmbedInfoWindowLinkURL']     = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowLinkURL]' ).value;
		attributes['gMapEmbedInfoWindowShowAddress'] = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowShowAddress]' ).value;
		attributes['gMapEmbedMarkerID']              = mapEmbedEl.querySelector( 'input[name=gMapEmbedMarkerID]' ).value;
		attributes['gMapEmbedAPIKey']                = mapEmbedEl.querySelector( 'input[name=gMapEmbedAPIKey]' ).value;
		attributes['gMapEmbedDisableUI']             = mapEmbedEl.querySelector( 'input[name=gMapEmbedDisableUI]' ).value;
		attributes['gMapEmbedID']                    = mapEmbedEl.id;
		attributes['gMapEmbedInfoWindowContent']     = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowContent]' ).value;
		attributes['gMapEmbedInfoWindowTitle']       = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowTitle]' ).value;
		attributes['gMapEmbedLat']                   = mapEmbedEl.querySelector( 'input[name=gMapEmbedLat]' ).value;
		attributes['gMapEmbedLocation']              = mapEmbedEl.querySelector( 'input[name=gMapEmbedLocation]' ).value;
		attributes['gMapEmbedLong']                  = mapEmbedEl.querySelector( 'input[name=gMapEmbedLong]' ).value;
		attributes['gMapEmbedMarker']                = mapEmbedEl.querySelector( 'input[name=gMapEmbedMarker]' ).value;
		attributes['gMapEmbedStyles']                = mapEmbedEl.querySelector( 'input[name=gMapEmbedStyles]' ).value;
		attributes['gMapEmbedType']                  = mapEmbedEl.querySelector( 'input[name=gMapEmbedType]' ).value;
		attributes['gMapEmbedZoom']                  = mapEmbedEl.querySelector( 'input[name=gMapEmbedZoom]' ).value;
		
		// Bind our Google Maps API callback to the window, which lets us call initMap.
		initMap( attributes );
	});
};
