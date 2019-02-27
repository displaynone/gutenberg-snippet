/**
 * Block Front-end Scripts.
 */

// Import dependencies.
import initMap from './initMap';

window.initGoogleMapEmbed = function() {
	// Get the block container element.
	const mapEmbedEls = document.querySelectorAll( 
		'.starter-google-map'
	);
	
	Array.prototype.map.call( mapEmbedEls, mapEmbedEl => {
		// Harvest the attribute data that we need to pass to initMap.
		const attributes = [];
		attributes['gMapEmbedAPIKey']            = mapEmbedEl.querySelector( 'input[name=gMapEmbedAPIKey]' ).value;
		attributes['gMapEmbedDisableUI']         = mapEmbedEl.querySelector( 'input[name=gMapEmbedDisableUI]' ).value;
		attributes['gMapEmbedID']                = mapEmbedEl.querySelector( 'input[name=gMapEmbedID]' ).value;
		attributes['gMapEmbedInfoWindowContent'] = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowContent]' ).value;
		attributes['gMapEmbedInfoWindowTitle']   = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowTitle]' ).value;
		attributes['gMapEmbedLat']               = mapEmbedEl.querySelector( 'input[name=gMapEmbedLat]' ).value;
		attributes['gMapEmbedLocation']          = mapEmbedEl.querySelector( 'input[name=gMapEmbedLocation]' ).value;
		attributes['gMapEmbedLong']              = mapEmbedEl.querySelector( 'input[name=gMapEmbedLong]' ).value;
		attributes['gMapEmbedMarker']            = mapEmbedEl.querySelector( 'input[name=gMapEmbedMarker]' ).value;
		attributes['gMapEmbedStyles']            = mapEmbedEl.querySelector( 'input[name=gMapEmbedStyles]' ).value;
		attributes['gMapEmbedType']              = mapEmbedEl.querySelector( 'input[name=gMapEmbedType]' ).value;
		attributes['gMapEmbedZoom']              = mapEmbedEl.querySelector( 'input[name=gMapEmbedZoom]' ).value;
		
		// Bind our Google Maps API callback to the window, which lets us call initMap.
		initMap( attributes );
	});
};
