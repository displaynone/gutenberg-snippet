import { __ } from '@wordpress/i18n';

export default {
	content: {
		type: 'string',
		default: '',
	},
	copyLabelCopyButton: {
		type: 'string',
		default: __( 'Copy', 'sw-snippet' ),
	},
	copiedLabelCopyButton: {
		type: 'string',
		default: __( 'Copied', 'sw-snippet' ),
	},
	language: {
		type: 'string',
		default: '',
	},
	saveParsed: {
		type: 'boolean',
		default: false,
	},
	showCopyButton: {
		type: 'boolean',
		default: false,
	},
};
