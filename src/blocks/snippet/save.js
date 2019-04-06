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
	 * Renders block in the frontend
	 *
	 * @return {jsx}
	 */
	render() {
		const {
			attributes,
		} = this.props;
		const {
			content,
			copyLabelCopyButton,
			copiedLabelCopyButton,
			language,
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
				<code
					className={ language }
				>
					{ content }
				</code>
			</pre>
		);
	}
}
