/**
 * Edit controller
 *
 * @since 1.0.0
 */
import { Component, createRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	TextareaControl,
	Toolbar,
} from '@wordpress/components';
import { InspectorControls, BlockControls } from '@wordpress/editor';

const languages = [
	{ label: __( 'Select a language', 'sw-snippet' ), value: '' },
	{ label: 'Apache', value: 'apache' },
	{ label: 'Bash', value: 'bash' },
	{ label: 'C#', value: 'csharp' },
	{ label: 'C++', value: 'cpp' },
	{ label: 'CSS', value: 'css' },
	{ label: 'Erlang', value: 'erlang' },
	{ label: 'Go', value: 'golang' },
	{ label: 'HTML', value: 'html' },
	{ label: 'XML', value: 'xml' },
	{ label: 'Handlebars', value: 'handlebars' },
	{ label: 'JSON', value: 'json' },
	{ label: 'Java', value: 'java' },
	{ label: 'JavaScript', value: 'javascript' },
	{ label: 'Markdown', value: 'markdown' },
	{ label: 'Objective C', value: 'objectivec' },
	{ label: 'PHP', value: 'php' },
	{ label: 'Python', value: 'python' },
	{ label: 'R', value: 'r' },
	{ label: 'Ruby', value: 'ruby' },
	{ label: 'Rust', value: 'rust' },
	{ label: 'SCSS', value: 'scss' },
	{ label: 'SQL', value: 'sql' },
	{ label: 'Shell', value: 'shell' },
	{ label: 'Twig', value: 'twig' },
	{ label: 'TypeScript', value: 'typescript' },
];

/**
 * Edit block component
 *
 * @since 1.0.0
 */
export default class BlockEdit extends Component {
	/**
	 * Constructor
	 *
	 * @param {object} props React props
	 */
	constructor( props ) {
		super( props );
		this.state = {
			preview: false,
		};
		this.codeRef = createRef();
	}

	componentDidUpdate() {
		if ( ( this.state.preview || ! this.isSelected ) && this.codeRef && this.codeRef.current ) {
			window.hljs.highlightBlock( this.codeRef.current );
		}
	}

	/**
	 * Renderer
	 *
	 * @return {jsx}
	 */
	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
		} = this.props;
		const {
			content,
			language,
		} = attributes;

		const controls = this.state.preview ?
			[
				{
					icon: 'edit',
					title: __( 'Edit', 'sw-snippet' ),
					onClick: () => this.setState( { preview: false } ),
				},
			] :
			[
				{
					icon: 'visibility',
					title: __( 'Preview', 'sw-snippet' ),
					onClick: () => this.setState( { preview: true } ),
				},
			];

		return (
			<div className={ className }>
				<InspectorControls>
					<PanelBody
						title={ __( 'Snippet Settings', 'sw-snippet' ) }
					>
						<SelectControl
							label={ __( 'Language', 'sw-snippet' ) }
							value={ language }
							options={ languages }
							onChange={ value => setAttributes( { language: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<Toolbar
						controls={ controls }
					/>
				</BlockControls>

				{ isSelected && ! this.state.preview && <TextareaControl
					value={ content }
					onChange={ value => setAttributes( { content: value } ) }
				/> }
				{ ( ! isSelected || this.state.preview ) &&
					<pre className={ language }>
						<code ref={ this.codeRef }>
							{ content }
						</code>
					</pre>
				}
			</div>
		);
	}
}
