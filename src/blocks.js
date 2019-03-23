import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

const cache = {};

const loadModules = () => {
	if ( module.hot ) {
		const context = require.context( './', true, /^.*index\.js$/ );

		const selectedBlockId = select( 'core/editor' ).getSelectedBlockClientId();
		dispatch( 'core/editor' ).clearSelectedBlock();

		context.keys().forEach( key => {
			const module = context( key );

			if ( module === cache[ key ] ) {
				return;
			}

			if ( cache[ key ] ) {
				const oldModule = cache[ key ];
				unregisterBlockType( oldModule.name );
			}

			registerBlockType( module.name, module.settings );
			cache[ key ] = module;
		} );

		// Restore the initial block selection.
		if ( selectedBlockId ) {
			dispatch( 'core/editor' ).selectBlock( selectedBlockId );
		}

		return context;
	}

	const context = require.context( './', true, /.*index\.js$/ );

	context.keys().forEach( key => {
		const module = context( key );
		registerBlockType( module.name, module.settings );
	} );
};

const context = loadModules();

if ( module.hot ) {
	module.hot.accept( context.id, loadModules );
}
