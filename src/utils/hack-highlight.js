export default function() {
	if ( !! window.hljs.hacked ) {
		return;
	}
	const prevHighligth = window.hljs.highlightBlock;
	window.hljs.highlightBlock = block => {
		const newline = '<span class="sw_new_line"></span>';
		// Replace all without regex
		block.innerHTML = block.innerHTML.split( newline ).join( '' );
		prevHighligth( block );
		if ( block.classList.contains( 'sw_show_line_numbers' ) ) {
			block.innerHTML = newline + block.innerHTML.replace( /\n/g, `\n${ newline }` );
		}
	};
	window.hljs.hacked = true;
}
