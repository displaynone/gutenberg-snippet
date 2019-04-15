/**
 * Forked from https://github.com/akiran/react-highlight
 *
 * @since 1.3.0
 */
import hackHighlight from '../../../utils/hack-highlight';
import hljs from 'highlight.js';

import { Component, createRef } from '@wordpress/element';

class Highlight extends Component {
	constructor( props ) {
		super( props );
		this.elRef = createRef();
	}
	componentDidMount() {
		this.highlightCode();
	}

	componentDidUpdate() {
		this.highlightCode();
	}

	highlightCode() {
		hackHighlight();
		const nodes = this.elRef.current.querySelectorAll( 'pre code' );
		for ( let i = 0; i < nodes.length; i++ ) {
			hljs.highlightBlock( nodes[ i ] );
		}
	}

	render() {
		const { children, className, element: Element, innerHTML } = this.props;
		const props = { className };

		if ( innerHTML ) {
			props.dangerouslySetInnerHTML = { __html: children };
			if ( Element ) {
				return <Element { ...props } />;
			}
			return <div { ...props } />;
		}

		if ( Element ) {
			return <Element { ...props }>{ children }</Element>;
		}
		return <pre ref={ this.elRef }><code className={ className }>{ children }</code></pre>;
	}
}

Highlight.defaultProps = {
	innerHTML: false,
	className: null,
	element: null,
};

export default Highlight;
