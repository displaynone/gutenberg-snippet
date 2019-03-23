document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( 'pre code' ).forEach( block => {
		if ( !! window.hljs ) {
			window.hljs.highlightBlock( block );
		}
	} );
} );
