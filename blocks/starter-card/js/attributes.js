const attributes = {
    authorID: {
        type: 'string',
    },
    authorImageURL: {
        type: 'string',
    },
    authorName: {
        type: 'string',
    },
    authorURL: {
        type: 'string',
    },
    categoryIDs: {
        type: 'array',
        default: [],
    },
    categoryLayout: {
        type: 'string',
    },
    categoryObjects: {
        type: 'array',
        default: [],
    },
    dynamiclyPopulate: {
        type: 'bool',
        default: true,
    },
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
    isLatestPost: {
        type: 'bool',
    },
    isTitleInHeader: {
        type: 'bool',
    },
    linkLabel: {
        type: 'string',
    },
    linkURL: {
        type: 'string',
    },
    metaLayout: {
        type: 'string',
    },
    postDateTime: {
        type: 'string',
    },
    postID: {
        type: 'string',
    },
    showGravatar: {
        type: 'bool',
        default: true,
    },
    skipPosts: {
        type: 'string',
        default: '0',
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