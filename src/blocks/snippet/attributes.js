import { __ } from '@wordpress/i18n';

export default {
	content: {
		type: 'string',
		default: '',
	},
	language: {
		type: 'string',
		default: '',
	},
	showCopyButton: {
		type: 'boolean',
		default: false,
	},
	copyLabelCopyButton: {
		type: 'string',
		default: __( 'Copy', 'sw-snippet' ),
	},
	copiedLabelCopyButton: {
		type: 'string',
		default: __( 'Copied', 'sw-snippet' ),
	},
};
