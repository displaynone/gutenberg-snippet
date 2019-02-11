/**
 * Tools
 * 
 * The Block Controls (Toolbar) for the Block.
 * 
 * We break it into its own file, so the edit function just shows
 * our block edit view, and any toolbar functions are defined here.
 */

/**
 * Block Dependencies.
 */

// Internal Block Libraries
const {
    IconButton,
	Toolbar,
}                      = wp.components;
const {
    AlignmentToolbar,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
}                      = wp.editor;
const { Component }    = wp.element;
const { __ }           = wp.i18n;

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
    
    /**
	 * Functions
	 *
	 * Shared functions (such as onChangeImageID) are registered at the 
     * level above and passed down.
	 * 
	 * Functions that are only used in this conponent are defined below.
	 */
    const onChangeTextAlignment = textAlignment => { setAttributes( { textAlignment } ) };

	return (
        <BlockControls>
            {/**
              * Alignment Toolbar
              *
              * Allows us to change the text alighment of our block by setting
              * an attribute that we can add to our classes.
              */}
            <AlignmentToolbar
                value={ textAlignment }
                onChange={ onChangeTextAlignment }
            />
            {/**
              * Media Upload
              *
              * Allows us to change the image in the header. Uses standard 
              * WordPress core practice, and allows us to change if the image is set.
              */}
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

