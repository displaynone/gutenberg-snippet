// Define the logic for loading and swapping modules.
const loadModules = () => {
	const context = require.context( './blocks', true, /frontend\.js$/ );

	// eslint-disable-next-line no-console
	context.keys().forEach( key => {
		const module = context( key );

		// Default category 'toolset'
		module.settings.category = module.settings.category;

		// Register block
		console.log(module.name);
		registerBlockType( module.name, module.settings );
	} );
};

const context = loadModules();

