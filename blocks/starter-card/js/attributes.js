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
    headerBackgroundColor: {
        type: 'string',
    },
    headerForegroundColor: {
        type: 'string',
    },
    imageAlt: {
        type: 'string',
    },
    imageID: {
        type: 'string',
    },
    imageType: {
        type: 'string',
    },
    imageTransparency: {
        type: 'number',
        default: 50,
    },
    imageURL: {
        type: 'string',
    },
    linkLabel: {
        type: 'string',
    },
    linkURL: {
        type: 'string',
    },
    summary: {
        type: 'array',
        source: 'children',
	    selector: '.starter-card__summary',
    },
    title: {
        type: 'string',
    },
    textAlignment: {
        type: 'string',
    }
};

export default attributes;