/**
 * Attributes.
 * 
 * The block, and any components it uses will use these
 * attributes to store data.
 * 
 * We break it into its own file, as otherwise the index file
 * can become bloated, and we can easily see which attributes
 * are available in each component if we extract the props at the 
 * start of the component.
 */
const attributes = {
    gMapEmbedAddressCompanyName: {
        type: 'string'
    },
    gMapEmbedAddressCountry: {
        type: 'string'
    },
	gMapEmbedAddressLine1: {
        type: 'string'
	},
	gMapEmbedAddressLine2: {
        type: 'string'
	},
	gMapEmbedAddressLocality: {
        type: 'string'
	},
	gMapEmbedAddressPostOfficeBox: {
        type: 'string'
	},
	gMapEmbedAddressRegion: {
        type: 'string'
	},
	gMapEmbedAddressPostCode: {
        type: 'string'
	},
    gMapEmbedAPIKey: {
        type: 'string'
	},
	gMapEmbedDisableUI: {
        type: 'bool'
	},
	gMapEmbedID: {
        type: 'string'
	},
	gMapEmbedInfoWindowContent: {
        type: 'string'
	},
	gMapEmbedInfoWindowImageAlt: {
        type: 'string'
    },
	gMapEmbedInfoWindowImageID: {
        type: 'number'
	},
	gMapEmbedInfoWindowImageURL: {
        type: 'string'
	},
	gMapEmbedInfoWindowLinkText: {
        type: 'string'
	},
	gMapEmbedInfoWindowLinkURL: {
        type: 'string'
	},
	gMapEmbedInfoWindowShowAddress: {
        type: 'bool'
    },
	gMapEmbedInfoWindowTitle: {
        type: 'string'
    },
    gMapEmbedLat: {
        type: 'float'
	},
	gMapEmbedLocation: {
        type: 'string'
    },
    gMapEmbedLong: {
        type: 'float'
	},
	gMapEmbedMarker: {
        type: 'string'
	},
	gMapEmbedMarkerID: {
        type: 'bool'
    },
	gMapEmbedStyles: {
        type: 'string'
    },
    gMapEmbedType: {
        type: 'string'
    },
    gMapEmbedZoom: {
        type: 'string'
    },
    height: {
        type: 'number',
        default: 100,
    },
};

export default attributes;