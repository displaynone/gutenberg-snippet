import hljs from 'highlight.js';
import hackHighlight from '../../utils/hack-highlight';

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( 'pre code' ).forEach( block => {
		if ( !! hljs ) {
			hackHighlight();
			hljs.highlightBlock( block );
		}
	} );

	/**
	 * Copy some text to the clipboard
	 *
	 * @param {string} str Text to copy
	 */
	const copyToClipboard = str => {
		const el = document.createElement( 'textarea' );
		el.value = str;
		el.style.position = 'absolute';
		el.style.left = '-100000px';
		document.body.appendChild( el );
		el.select();
		document.execCommand( 'copy' );
		document.body.removeChild( el );
	};

	document.querySelectorAll( '.wp-block-sentidoweb-snippet button' ).forEach( button => {
		button.addEventListener( 'click', () => {
			copyToClipboard( button.nextSibling.textContent );
			button.innerHTML = button.dataset.labelCopied;
		} );
		button.addEventListener( 'mouseout', () => {
			button.innerHTML = button.dataset.labelCopy;
		} );
	} );
} );
