/**
 * JSON Checker
 * 
 * A version of the Constrast Checker but for JSON.
 * https://github.com/WordPress/gutenberg/blob/master/packages/editor/src/components/contrast-checker/index.js
 */

/**
 * Import Assets.
 * 
 * With webpack, we import the SCSS into the JS so that it can be parsed.
 * Dont worry, these will be compiled into their respective CSS files.
 */
import '../scss/blockEditor.scss'; // Block editor styles

/**
 * WordPress dependencies
 */
const { Notice } = wp.components;
const { __ }        = wp.i18n; // Localization

function JSONChecker( {
	json,
} ) {
	try {
		JSON.parse( json );
	} catch( error ) {
		const msg = __( 'The content you have added is not valid JSON. Please ensure that you use double quotes (") for attributes and strings.', 'plugin-name' );
		return (
			<div className="editor-json-checker">
				<Notice status="warning" isDismissible={ false }>
					{ msg }
				</Notice>
			</div>
		);
	}

	return null;
}

export default JSONChecker;