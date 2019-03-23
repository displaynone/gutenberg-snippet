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
			language,
		} = attributes;

		return (
			<pre>
				<code
					className={ language }
				>
					{ content }
				</code>
			</pre>
		);
	}
}
