/**
 * Save controller
 *
 * @since 1.0.0
 */
import { Component } from '@wordpress/element';

/**
 * Save controller
 */
export default class BlockSave extends Component {
	/**
	 * Returns the content that is going to be saved
	 * Depending on `saveParsed` it returns the content or the parsed content
	 *
	 * @return {JSX}
	 */
	getContent() {
		const {
			attributes,
		} = this.props;
		const {
			content,
			language,
			saveParsed,
		} = attributes;
		if ( ! saveParsed || ! window.hljs ) {
			return (
				<code
					className={ language }
				>
					{ content }
				</code>
			);
		}

		const parsedObject = window.hljs.highlight( language, content );
		return (
			<code
				className={ `${ language } hljs` }
				dangerouslySetInnerHTML={ {
					__html: parsedObject.value,
				} }
			/>
		);
	}

	/**
	 * Renders block in the frontend
	 *
	 * @return {jsx}
	 */
	render() {
		const {
			attributes,
		} = this.props;
		const {
			copyLabelCopyButton,
			copiedLabelCopyButton,
			showCopyButton,
		} = attributes;

		return (
			<pre>
				{ showCopyButton &&
					<button
						className="sw-snippet-button"
						data-label-copy={ copyLabelCopyButton }
						data-label-copied={ copiedLabelCopyButton }
					>
						{ copyLabelCopyButton }
					</button>
				}
				{ this.getContent() }
			</pre>
		);
	}
}
