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

const initMap = function( attributes ) {
  const {
    gMapEmbedAPIKey,
    gMapEmbedLat,
		gMapEmbedLong,
    gMapEmbedLocation,
    gMapEmbedInfoWindowTitle,
    gMapEmbedInfoWindowContent,
    gMapEmbedStyles,
    gMapEmbedType,
    gMapEmbedZoom,
    gMapEmbedDisableUI,
  } = attributes;

  // Abort if we have no location or API key.
  if ( ! gMapEmbedLocation || ! gMapEmbedAPIKey ) {
    return;
  }

  // Define the DOM element we're creating the Map with.
  const mapEl = document.getElementById( 'starter-google-map' );

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
      disableDefaultUI: gMapEmbedDisableUI,
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

    // Create the Marker.
    const marker = new google.maps.Marker({
      position: loc,
      map: map,
      title: gMapEmbedInfoWindowTitle
    });

    // Prepare our Info Window content.
    const title = gMapEmbedInfoWindowTitle ? gMapEmbedInfoWindowTitle : 'About this Location';
    const text  = gMapEmbedInfoWindowContent ? '<div class="description full-width">' + gMapEmbedInfoWindowContent + '</div>' : '';
    const link = '<a target="_blank" href="https://maps.google.com/maps?ll=' + loc.lat + ',' + loc.lng + '&amp;z=' + gMapEmbedZoom + '<span>View on Google Maps</span></a>' + '">';
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
      gMapEmbedLocation.replace(/ *, */g, ',<br>') +
      '</div>' +
      '<div class="view-link">' +
      link +
      '</div>' +
      '</div></div></div></div>';


    if ( gMapEmbedInfoWindowTitle || gMapEmbedInfoWindowTitle ) {
      // Create the Info Window.
      const infowindow = new google.maps.InfoWindow({
        content: contentString
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
