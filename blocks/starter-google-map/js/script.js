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

attributes['gMapEmbedAPIKey']            = mapEmbedEl.getAttribute( 'data-apikey' );
attributes['gMapEmbedLocation']          = mapEmbedEl.getAttribute( 'data-location' );
attributes['gMapEmbedInfoWindowTitle']   = mapEmbedEl.getAttribute( 'data-title' );
attributes['gMapEmbedInfoWindowContent'] = mapEmbedEl.getAttribute( 'data-text' );
attributes['gMapEmbedZoom']              = mapEmbedEl.getAttribute( 'data-zoom' );
attributes['gMapEmbedType']              = mapEmbedEl.getAttribute( 'data-type' );
attributes['gMapEmbedDisableUI']         = mapEmbedEl.getAttribute( 'data-disable-ui' );
attributes['gMapEmbedLat']               = mapEmbedEl.getAttribute( 'data-lat' );
attributes['gMapEmbedLong']              = mapEmbedEl.getAttribute( 'data-long' );

// Bind our Google Maps API callback to the window, which lets us call initMap.
window.initGoogleMapEmbed = function() {
  initMap( attributes );
};
