/**
 * Block Front-end Scripts.
 */

// Import dependencies.
import initMap from './initMap';

// Get the block container element.
const mapEmbedEl = document.getElementsByClassName(
  'starter-google-map'
)[0];

// Harvest the attribute data that we need to pass to initMap.
const attributes = [];

attributes['gMapEmbedAPIKey']            = mapEmbedEl.querySelector( 'input[name=gMapEmbedAPIKey]' ).value;
attributes['gMapEmbedLocation']          = mapEmbedEl.querySelector( 'input[name=gMapEmbedLocation]' ).value;
attributes['gMapEmbedInfoWindowTitle']   = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowTitle]' ).value;
attributes['gMapEmbedInfoWindowContent'] = mapEmbedEl.querySelector( 'input[name=gMapEmbedInfoWindowContent]' ).value;
attributes['gMapEmbedZoom']              = mapEmbedEl.querySelector( 'input[name=gMapEmbedZoom]' ).value;
attributes['gMapEmbedType']              = mapEmbedEl.querySelector( 'input[name=gMapEmbedType]' ).value;
attributes['gMapEmbedDisableUI']         = mapEmbedEl.querySelector( 'input[name=gMapEmbedDisableUI]' ).value;
attributes['gMapEmbedLat']               = mapEmbedEl.querySelector( 'input[name=gMapEmbedLat]' ).value;
attributes['gMapEmbedLong']              = mapEmbedEl.querySelector( 'input[name=gMapEmbedLong]' ).value;
attributes['gMapEmbedStyles']            = mapEmbedEl.querySelector( 'input[name=gMapEmbedStyles]' ).value;
attributes['gMapEmbedMarker']            = mapEmbedEl.querySelector( 'input[name=gMapEmbedMarker]' ).value;
// Bind our Google Maps API callback to the window, which lets us call initMap.
window.initGoogleMapEmbed = function() {
  initMap( attributes );
};
