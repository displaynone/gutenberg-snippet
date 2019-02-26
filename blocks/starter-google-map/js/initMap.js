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

const initMap = function( attributes, doFetch = true ) {

  // Abort if we have no location or API key.
  if ( ! attributes['gMapEmbedLocation'] || ! attributes['gMapEmbedAPIKey'] ) {
    return;
  }

  // Ensure spaces in the location are replaced with the plus symbol.
  const location = attributes['gMapEmbedLocation'].replace(' ', '+');

  // Define the DOM element we're creating the Map with.
  const mapEl = document.getElementById('starter-google-map');

  if (!mapEl) {
    return;
  }

  // Initialise the Google Map. (fires below)
  const init = function(lat, lng) {
    // Create our location aspect a.k.a "center".
    const loc = { lat: parseFloat(lat), lng: parseFloat(lng) };

    // Build our options object, handling default values.
    const options = {
      center: loc,
      zoom: attributes['gMapEmbedZoom']
        ? parseInt(attributes['gMapEmbedZoom'])
        : 14,
      mapTypeId: attributes['gMapEmbedType']
        ? attributes['gMapEmbedType']
        : 'roadmap',
      disableDefaultUI:
        attributes['gMapEmbedDisableUI'] === 'true' ? true : false,
      scrollwheel: false // Prevents zoom when scrolling.
    };

    // Create the Map.
    const map = new google.maps.Map(mapEl, options);

    // Add data attributes containing the current Lat, Long to the element.
    mapEl.setAttribute('data-lat', lat);
    mapEl.setAttribute('data-lng', lng);

    // Create the Marker.
    const marker = new google.maps.Marker({
      position: loc,
      map: map,
      title: attributes['gMapEmbedInfoWindowTitle']
    });

    // Prepare our Info Window content.
    const title = attributes['gMapEmbedInfoWindowTitle']
      ? attributes['gMapEmbedInfoWindowTitle']
      : 'About this Location';
    const text = attributes['gMapEmbedInfoWindowContent']
      ? '<div class="description full-width">' +
        attributes['gMapEmbedInfoWindowContent'] +
        '</div>'
      : '';
    const link =
      '<a target="_blank" href="https://maps.google.com/maps?ll=' +
      loc.lat +
      ',' +
      loc.lng +
      '&amp;z=' +
      attributes['gMapEmbedZoom'] +
      '<span>View on Google Maps</span></a>' +
      '">';
    const contentString =
      '<div class="gm-style">' +
      '<div class="gm-style-iw">' +
      '<div class="poi-info-window gm-style">' +
      '<div class="title full-width">' +
      title +
      '</div>' +
      text +
      '<div class="address">' +
      '<div class="address-line full-width">' +
      attributes['gMapEmbedLocation'].replace(/ *, */g, ',<br>') +
      '</div>' +
      '<div class="view-link">' +
      link +
      '</div>' +
      '</div></div></div></div>';

    // Create the Info Window.
    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    // Trigger the Info Window on Marker click.
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  };

  // Supply co-ordinates to out init function.
  let lat = '';
  let lng = '';
  if (doFetch) {
    // Fetch the Lat and Long from the Geocoding API based on the supplied address.
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        location +
        '&key=' +
        attributes['gMapEmbedAPIKey']
    )
      .then(function(response) {
        // Convert the response to JSON.
        return response.json();
      })
      .then(function(json) {
        // Convert to JSON and extract the co-ordinates.
        const result = json.results;

        lat = result[0].geometry.location.lat;
        lng = result[0].geometry.location.lng;

        // Initialise the Map.
        init(lat, lng);
      });
  } else {
    // If we're not updating the address, we haven't fetched fresh co-ordinates,
    // therefore we need to use the ones we've stored on the map element.
    lat = mapEl.getAttribute('data-lat', lat);
    lng = mapEl.getAttribute('data-lng', lng);

    // Initialise the Map.
    init(lat, lng);
  }
};

export default initMap;
