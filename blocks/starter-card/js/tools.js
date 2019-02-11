/**
 * Block Dependencies.
 */

/**
 * Internal Block Libraries
 */
const {
    IconButton,
	Toolbar,
} = wp.components;
const {
    AlignmentToolbar,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} = wp.editor;
const { Component }     = wp.element;
const { __ }            = wp.i18n;

/**
 * Register Component
 */
export default class Tools extends Component {

render() {

	const {
		attributes: {
            imageID,
			textAlignment,
		},
        setAttributes,
        onChangeImageID,
    } = this.props;
    
    const onChangeTextAlignment = textAlignment => { setAttributes( { textAlignment } ) };

	return (
        <BlockControls>
            <AlignmentToolbar
                value={ textAlignment }
                onChange={ onChangeTextAlignment }
            />
            <MediaUploadCheck>
                <Toolbar>
                    <MediaUpload
                        onSelect={ onChangeImageID }
                        allowedTypes={ [ 'image' ] }
                        value={ imageID }
                        render={ ( { open } ) => (
                            <IconButton
                                className="components-toolbar__control"
                                label={ __( 'Edit Image', 'plugin-name' ) }
                                icon="edit"
                                onClick={ open }
                            />
                        ) }
                    />
                </Toolbar>
            </MediaUploadCheck>
        </BlockControls> 		
        )
	}
}

