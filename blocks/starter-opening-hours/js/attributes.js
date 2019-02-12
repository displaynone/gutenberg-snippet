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

// Internal Block Libraries
const { __ } = wp.i18n; // Localization

const attributes = {
    additionalInformation: {
        type: 'array',
        source: 'children',
	    selector: '.starter-opening-hours__additional-information-text',
    },
    additionalInformationTitle: {
        type: 'string',
    },
    columnClosedLabel: {
        type: 'string',
        default: __( 'Closed', 'plugin-name' ),
    },
    columnDayLabel: {
        type: 'string',
        default: __( 'Day', 'plugin-name' ),
    },
    columnOpenLabel: {
        type: 'string',
        default: __( 'Open', 'plugin-name' ),
    },
    day: {
        type: 'string',
        default: 'monday',
    },
    title: {
        type: 'string',
        default: __( 'Opening Hours', 'plugin-name' ),
    },
};

export default attributes;