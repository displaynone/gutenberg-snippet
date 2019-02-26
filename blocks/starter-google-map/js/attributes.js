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
    gMapEmbedAPIKey: {
        type: 'string'
    },
    gMapEmbedLocation: {
        type: 'string'
    },
    gMapEmbedInfoWindowTitle: {
        type: 'string'
    },
    gMapEmbedInfoWindowContent: {
        type: 'string'
    },
    gMapEmbedType: {
        type: 'string'
    },
    gMapEmbedZoom: {
        type: 'string'
    },
    gMapEmbedDisableUI: {
        type: 'string'
    },
    gMapEmbedSkipFetch: {
        type: 'bool'
    },
    height: {
        type: 'number',
        default: 100,
    },
};

export default attributes;