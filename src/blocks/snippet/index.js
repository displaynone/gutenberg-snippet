/**
 * Snippets Gutenberg block
 *
 * It displays a code editor.
 */

//  Import CSS.
import './scss/style.scss';
import './scss/editor.scss';
import icon from './icon';
import edit from './edit';
import save from './save';
import attributes from './attributes';

import { __ } from '@wordpress/i18n'; // Import __() from wp.i18n

export const name = 'sentidoweb/snippet';

export const settings = {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Snippets editor', 'sw-snippet' ), // Block title.
	icon: icon,
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'code', 'sw-snippet' ),
		__( 'format', 'sw-snippet' ),
		__( 'snippet', 'sw-snippet' ),
	],

	attributes,
	edit,
	save,
};
