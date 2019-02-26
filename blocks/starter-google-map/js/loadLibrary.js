/**
 * loadLibrary
 *
 * Loads the externally hosted Google Maps JavaScript API library and
 * triggers the callback used to initialise the Map.
 */
const loadLibrary = function( attributes ) {
  if ( ! document.getElementById('starter-google-map-library') && attributes['gMapEmbedAPIKey'] ) {
    const script = document.createElement( 'script' );
    script.id  = 'starter-google-map-library';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + attributes['gMapEmbedAPIKey'] + '&callback=initGoogleMapEmbed';
    script.async = true;
    script.defer = true;
    document.body.appendChild( script );
  }
};

export default loadLibrary;
